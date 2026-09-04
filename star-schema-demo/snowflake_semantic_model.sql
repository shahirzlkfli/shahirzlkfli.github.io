-- ====================================================================
-- ENTERPRISE STAR SCHEMA & SEMANTIC VIEW FOR SNOWFLAKE CORTEX AI
-- Designed by: Muhammad Shahir Bin Zulkifli (Statistics | Data & AI)
-- ====================================================================

-- 1. Create Dimensions
CREATE OR REPLACE TABLE DIM_PLANT_SITE (
    plant_id VARCHAR(30) PRIMARY KEY,
    plant_name VARCHAR(100) NOT NULL,
    state VARCHAR(50),
    region VARCHAR(50),
    capacity_mtpa FLOAT
);

CREATE OR REPLACE TABLE DIM_CURING_AGE (
    age_days INT PRIMARY KEY,
    curing_stage VARCHAR(60) NOT NULL,
    is_standard_28d_benchmark BOOLEAN,
    spec_target_ratio FLOAT
);

CREATE OR REPLACE TABLE DIM_MIX_DESIGN (
    mix_id VARCHAR(30) PRIMARY KEY,
    mix_type VARCHAR(80) NOT NULL,
    cement_grade VARCHAR(80) NOT NULL,
    water_binder_ratio FLOAT,
    total_binder_kg_m3 FLOAT,
    eco_replacement_pct FLOAT,
    has_superplasticizer BOOLEAN,
    cement_kg FLOAT,
    slag_kg FLOAT,
    fly_ash_kg FLOAT,
    water_kg FLOAT,
    sp_kg FLOAT,
    coarse_agg_kg FLOAT,
    fine_agg_kg FLOAT
);

-- 2. Create Fact Table
CREATE OR REPLACE TABLE FACT_CONCRETE_TESTS (
    test_id VARCHAR(30) PRIMARY KEY,
    batch_id VARCHAR(30) NOT NULL,
    mix_id VARCHAR(30) REFERENCES DIM_MIX_DESIGN(mix_id),
    plant_id VARCHAR(30) REFERENCES DIM_PLANT_SITE(plant_id),
    age_days INT REFERENCES DIM_CURING_AGE(age_days),
    compressive_strength_mpa FLOAT NOT NULL,
    target_strength_mpa FLOAT NOT NULL,
    quality_status VARCHAR(20) NOT NULL,
    variance_to_target_mpa FLOAT,
    test_date DATE
);

-- ====================================================================
-- 3. THE SEMANTIC VIEW (CORTEX AI / BI SEMANTIC LAYER)
-- This unifies the Star Schema into a clean, searchable business layer.
-- Non-technical users & AI Agents query this view in plain English!
-- ====================================================================

CREATE OR REPLACE VIEW V_SEMANTIC_CONCRETE_QUALITY_ANALYTICS 
COMMENT = 'Enterprise Semantic Layer for Concrete Compressive Strength, Quality Control, and ESG Eco-cement metrics.'
AS
SELECT
    -- Business Dimensions (How users slice & filter)
    f.test_id,
    f.batch_id,
    f.test_date,
    p.plant_name,
    p.state AS plant_state,
    p.region AS plant_region,
    m.mix_type,
    m.cement_grade,
    m.has_superplasticizer,
    a.curing_stage,
    a.age_days AS curing_age_days,
    a.is_standard_28d_benchmark,
    f.quality_status,

    -- Numerical Measures & Engineering Properties
    m.water_binder_ratio,
    m.total_binder_kg_m3,
    m.eco_replacement_pct AS green_cement_slag_flyash_pct,
    m.cement_kg,
    m.slag_kg,
    m.fly_ash_kg,
    m.water_kg,
    f.compressive_strength_mpa,
    f.target_strength_mpa,
    f.variance_to_target_mpa,

    -- Pre-computed Boolean Flags for Instant Aggregation
    CASE WHEN f.quality_status = 'Pass' THEN 1 ELSE 0 END AS is_passed_flag,
    CASE WHEN m.eco_replacement_pct >= 25.0 THEN 1 ELSE 0 END AS is_eco_blend_flag

FROM FACT_CONCRETE_TESTS f
JOIN DIM_MIX_DESIGN m ON f.mix_id = m.mix_id
JOIN DIM_CURING_AGE a ON f.age_days = a.age_days
JOIN DIM_PLANT_SITE p ON f.plant_id = p.plant_id;

-- ====================================================================
-- 4. EXAMPLE BUSINESS QUERIES ANSWERED BY THIS SEMANTIC MODEL
-- ====================================================================

-- Query A: What is the 28-day standard compliance rate per plant?
SELECT 
    plant_name,
    COUNT(*) AS total_28d_tests,
    ROUND(AVG(compressive_strength_mpa), 2) AS avg_28d_strength_mpa,
    ROUND(SUM(is_passed_flag) / COUNT(*) * 100, 1) AS compliance_pass_rate_pct
FROM V_SEMANTIC_CONCRETE_QUALITY_ANALYTICS
WHERE is_standard_28d_benchmark = TRUE
GROUP BY plant_name;

-- Query B: ESG Analysis - Do Eco-blended mixes (Fly Ash/Slag) meet strength targets?
SELECT 
    mix_type,
    ROUND(AVG(green_cement_slag_flyash_pct), 1) AS avg_eco_material_pct,
    ROUND(AVG(compressive_strength_mpa), 2) AS avg_strength_mpa,
    ROUND(SUM(is_passed_flag) / COUNT(*) * 100, 1) AS pass_rate_pct
FROM V_SEMANTIC_CONCRETE_QUALITY_ANALYTICS
WHERE curing_age_days = 28
GROUP BY mix_type
ORDER BY avg_strength_mpa DESC;
