"""
CONSTRUCT STAR SCHEMA & SNOWFLAKE SEMANTIC VIEW
Transforms raw concrete test data into an enterprise Star Schema:
- Dim_Plant_Site
- Dim_Mix_Design
- Dim_Curing_Age
- Fact_Concrete_Tests
- Generates Snowflake DDL & Semantic View (SQL)
"""

import csv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_FILE = os.path.join(BASE_DIR, "raw_concrete_data.csv")

def main():
    rows = []
    with open(RAW_FILE, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)

    print(f"Loaded {len(rows)} raw test records.")

    # 1. Build Dim_Plant_Site
    dim_plants = [
        {"plant_id": "PLANT-RAWANG", "plant_name": "Rawang Integrated Cement Plant", "state": "Selangor", "region": "Central", "capacity_mtpa": "3.2"},
        {"plant_id": "PLANT-KANTHAN", "plant_name": "Kanthan Cement Plant", "state": "Perak", "region": "Northern", "capacity_mtpa": "2.8"},
        {"plant_id": "PLANT-LANGKAWI", "plant_name": "Langkawi Island Marine Plant", "state": "Kedah", "region": "Northern Island", "capacity_mtpa": "1.5"}
    ]

    # 2. Build Dim_Curing_Age
    unique_ages = sorted(list(set(int(float(r['Age'])) for r in rows)))
    dim_ages = []
    for a in unique_ages:
        if a <= 3:
            stage = "Early Strength (1-3 Days)"
        elif a <= 7:
            stage = "Stripping Strength (7 Days)"
        elif a <= 14:
            stage = "Developing Strength (14 Days)"
        elif a == 28:
            stage = "Standard Compliance Benchmark (28 Days)"
        else:
            stage = "Mature Long-Term (56-365 Days)"
        
        dim_ages.append({
            "age_days": a,
            "curing_stage": stage,
            "is_standard_28d_benchmark": "TRUE" if a == 28 else "FALSE",
            "spec_target_ratio": "1.00" if a == 28 else ("0.40" if a <= 3 else ("0.65" if a <= 7 else "1.15"))
        })

    # 3. Build Dim_Mix_Design & Fact_Concrete_Tests
    # Group unique mix recipes (Cement, Slag, Fly_Ash, Water, Superplasticizer, Coarse, Fine)
    mix_registry = {}
    fact_tests = []
    
    plant_keys = ["PLANT-RAWANG", "PLANT-KANTHAN", "PLANT-LANGKAWI"]

    for i, r in enumerate(rows):
        cement = float(r['Cement'])
        slag = float(r['Blast_Furnace_Slag'])
        fly_ash = float(r['Fly_Ash'])
        water = float(r['Water'])
        sp = float(r['Superplasticizer'])
        coarse = float(r['Coarse_Aggregate'])
        fine = float(r['Fine_Aggregate'])
        age = int(float(r['Age']))
        strength = float(r['Strength'])

        total_binder = cement + slag + fly_ash
        wb_ratio = round(water / total_binder, 3) if total_binder > 0 else 0.0

        # Unique mix recipe key
        recipe_key = (cement, slag, fly_ash, water, sp, coarse, fine)
        if recipe_key not in mix_registry:
            mix_num = len(mix_registry) + 1
            mix_id = f"MIX-{mix_num:03d}"
            
            # Classification
            if slag > 0 and fly_ash > 0:
                mix_type = "Ternary Eco-Blended (Slag + Fly Ash)"
                grade = "Low Carbon CEM IV"
            elif slag > 0:
                mix_type = "Slag Portland Composite"
                grade = "Industrial High Durability (CEM III)"
            elif fly_ash > 0:
                mix_type = "Fly Ash Modified"
                grade = "Hydration Heat Control (CEM II/B)"
            else:
                mix_type = "Pure Ordinary Portland"
                grade = "High Early Strength (CEM I / OPC)"

            eco_replacement_pct = round(((slag + fly_ash) / total_binder) * 100, 1) if total_binder > 0 else 0.0

            mix_registry[recipe_key] = {
                "mix_id": mix_id,
                "mix_type": mix_type,
                "cement_grade": grade,
                "water_binder_ratio": wb_ratio,
                "total_binder_kg_m3": round(total_binder, 1),
                "eco_replacement_pct": eco_replacement_pct,
                "has_superplasticizer": "TRUE" if sp > 0 else "FALSE",
                "cement_kg": cement,
                "slag_kg": slag,
                "fly_ash_kg": fly_ash,
                "water_kg": water,
                "sp_kg": sp,
                "coarse_agg_kg": coarse,
                "fine_agg_kg": fine
            }

        mix_info = mix_registry[recipe_key]
        mix_id = mix_info['mix_id']

        # Plant allocation
        plant_id = plant_keys[i % len(plant_keys)]
        test_id = f"TEST-{10001 + i}"
        batch_id = f"BATCH-2026-{(i % 25) + 101}"

        # Target Strength benchmark (e.g. 35 MPa for 28-day, scaled for age)
        if age == 28:
            target_strength = 35.0
        elif age <= 3:
            target_strength = 14.0
        elif age <= 7:
            target_strength = 23.0
        elif age <= 14:
            target_strength = 28.0
        else:
            target_strength = 40.0

        quality_status = "Pass" if strength >= target_strength else "Fail"

        fact_tests.append({
            "test_id": test_id,
            "batch_id": batch_id,
            "mix_id": mix_id,
            "plant_id": plant_id,
            "age_days": age,
            "compressive_strength_mpa": strength,
            "target_strength_mpa": target_strength,
            "quality_status": quality_status,
            "variance_to_target_mpa": round(strength - target_strength, 2),
            "test_date": f"2026-0{(i % 6) + 1:02d}-{(i % 26) + 1:02d}"
        })

    # 4. Save CSV files
    # Dim_Plant_Site.csv
    with open(os.path.join(BASE_DIR, "dim_plant_site.csv"), mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(dim_plants[0].keys()))
        writer.writeheader()
        writer.writerows(dim_plants)

    # Dim_Curing_Age.csv
    with open(os.path.join(BASE_DIR, "dim_curing_age.csv"), mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(dim_ages[0].keys()))
        writer.writeheader()
        writer.writerows(dim_ages)

    # Dim_Mix_Design.csv
    dim_mix_list = list(mix_registry.values())
    with open(os.path.join(BASE_DIR, "dim_mix_design.csv"), mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(dim_mix_list[0].keys()))
        writer.writeheader()
        writer.writerows(dim_mix_list)

    # Fact_Concrete_Tests.csv
    with open(os.path.join(BASE_DIR, "fact_concrete_tests.csv"), mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(fact_tests[0].keys()))
        writer.writeheader()
        writer.writerows(fact_tests)

    print("Star Schema CSVs created:")
    print(f" - dim_plant_site.csv ({len(dim_plants)} rows)")
    print(f" - dim_curing_age.csv ({len(dim_ages)} rows)")
    print(f" - dim_mix_design.csv ({len(dim_mix_list)} unique recipes)")
    print(f" - fact_concrete_tests.csv ({len(fact_tests)} test observations)")

    # 5. Generate Snowflake SQL (DDL + Semantic View + Semantic Metadata)
    sql_content = f"""-- ====================================================================
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
"""

    with open(os.path.join(BASE_DIR, "snowflake_semantic_model.sql"), mode='w', encoding='utf-8') as f:
        f.write(sql_content)

    print("Generated snowflake_semantic_model.sql successfully.")

if __name__ == '__main__':
    main()
