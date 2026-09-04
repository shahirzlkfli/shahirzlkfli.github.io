"""
STREAMLIT CONCRETE QUALITY & SEMANTIC ANALYTICS DASHBOARD
Demonstrating Snowflake Star Schema & Semantic Views
Author: Muhammad Shahir Bin Zulkifli (Statistics | Data & AI)
Run with: streamlit run streamlit_concrete_dashboard.py
"""

import streamlit as st
import pandas as pd
import numpy as np
import os

st.set_page_config(
    page_title="Concrete Quality & Semantic Analytics",
    page_icon="🏗️",
    layout="wide"
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 1. Load Star Schema Tables
@st.cache_data
def load_star_schema():
    dim_plants = pd.read_csv(os.path.join(BASE_DIR, "dim_plant_site.csv"))
    dim_ages = pd.read_csv(os.path.join(BASE_DIR, "dim_curing_age.csv"))
    dim_mix = pd.read_csv(os.path.join(BASE_DIR, "dim_mix_design.csv"))
    fact_tests = pd.read_csv(os.path.join(BASE_DIR, "fact_concrete_tests.csv"))
    
    # Emulate the Snowflake Semantic View join
    semantic_view = fact_tests.merge(dim_mix, on="mix_id") \
                             .merge(dim_ages, on="age_days") \
                             .merge(dim_plants, on="plant_id")
    
    return dim_plants, dim_ages, dim_mix, fact_tests, semantic_view

dim_plants, dim_ages, dim_mix, fact_tests, df = load_star_schema()

# Header
st.title("🏗️ Concrete Compressive Strength — Semantic Data Model & Analytics")
st.markdown("""
*Demonstrating an enterprise **Star Schema & Snowflake Semantic Layer** for industrial concrete quality control and ESG green cement tracking.*
""")

# Sidebar: Enterprise Filters
st.sidebar.header("🔍 Semantic Dimension Filters")

selected_plants = st.sidebar.multiselect(
    "Plant Location:",
    options=df["plant_name"].unique(),
    default=df["plant_name"].unique()
)

selected_ages = st.sidebar.multiselect(
    "Curing Age (Days):",
    options=sorted(df["age_days"].unique()),
    default=[3, 7, 28, 90]
)

selected_grades = st.sidebar.multiselect(
    "Mix Type / Cement Grade:",
    options=df["mix_type"].unique(),
    default=df["mix_type"].unique()
)

# Filtered data
filtered_df = df[
    (df["plant_name"].isin(selected_plants)) &
    (df["age_days"].isin(selected_ages)) &
    (df["mix_type"].isin(selected_grades))
]

# Zone 1: Executive KPI Metrics (Top)
col1, col2, col3, col4 = st.columns(4)

avg_28d = df[df["age_days"] == 28]["compressive_strength_mpa"].mean()
pass_rate = (filtered_df["quality_status"] == "Pass").mean() * 100
avg_eco = filtered_df["eco_replacement_pct"].mean()

with col1:
    st.metric("Benchmark 28-Day Strength", f"{avg_28d:.1f} MPa", delta="+3.4 MPa vs Target")
with col2:
    st.metric("Quality Pass Rate", f"{pass_rate:.1f}%", delta="Normal range")
with col3:
    st.metric("Avg Eco-Cement Replacement", f"{avg_eco:.1f}%", delta="Slag + Fly Ash ESG")
with col4:
    st.metric("Total Tests Analyzed", f"{len(filtered_df):,} records")

st.markdown("---")

# Zone 2: Analytical Visualizations
chart_col1, chart_col2 = st.columns(2)

with chart_col1:
    st.subheader("📉 Water-Binder Ratio vs. Compressive Strength")
    st.caption("Validates statistical regression law: lower water-to-cement ratio yields higher strength.")
    scatter_df = filtered_df.rename(columns={
        "water_binder_ratio": "Water-Binder Ratio",
        "compressive_strength_mpa": "Compressive Strength MPA",
        "plant_name": "Plant Site"
    })
    st.scatter_chart(data=scatter_df, x="Water-Binder Ratio", y="Compressive Strength MPA", color="Plant Site")

with chart_col2:
    st.subheader("📊 Strength Development Across Curing Ages")
    st.caption("Monitors maturity progression from 3-day early strength to 28-day design target.")
    age_perf = filtered_df.groupby("curing_stage")["compressive_strength_mpa"].mean().reset_index()
    age_perf = age_perf.rename(columns={
        "curing_stage": "Curing Stage",
        "compressive_strength_mpa": "Compressive Strength MPA"
    })
    st.bar_chart(data=age_perf, x="Curing Stage", y="Compressive Strength MPA")

# Zone 3: Snowflake Cowork AI Simulator
st.subheader("🤖 Snowflake Cowork / Cortex Natural Language Query Simulator")
st.markdown("Test how a non-technical plant manager queries the **Semantic View** using natural language:")

query_choice = st.selectbox(
    "Choose a sample operational question:",
    [
        "Select a question...",
        "1. Show all batches that achieved over 50 MPa at 28 days",
        "2. Compare average compressive strength across all three plants",
        "3. Find Eco-Blended mixes that passed the 35 MPa target",
        "4. Show early strength (Day 3) results for Kanthan Cement Plant"
    ]
)

col_rename_map = {
    "batch_id": "Batch ID",
    "plant_name": "Plant Site",
    "mix_type": "Mix Type",
    "compressive_strength_mpa": "Compressive Strength MPA",
    "quality_status": "Quality Status",
    "eco_replacement_pct": "Eco-Replacement (%)",
    "curing_stage": "Curing Stage",
    "total_tests": "Total Tests",
    "avg_strength_mpa": "Avg Compressive Strength MPA",
    "pass_rate_pct": "Pass Rate (%)"
}

if query_choice.startswith("1"):
    res = df[(df["age_days"] == 28) & (df["compressive_strength_mpa"] >= 50.0)][
        ["batch_id", "plant_name", "mix_type", "compressive_strength_mpa", "quality_status"]
    ].rename(columns=col_rename_map)
    st.dataframe(res.head(10), use_container_width=True)
elif query_choice.startswith("2"):
    res = df.groupby("plant_name").agg(
        total_tests=("test_id", "count"),
        avg_strength_mpa=("compressive_strength_mpa", "mean"),
        pass_rate_pct=("quality_status", lambda x: (x == "Pass").mean() * 100)
    ).round(2).reset_index().rename(columns=col_rename_map)
    st.dataframe(res, use_container_width=True)
elif query_choice.startswith("3"):
    res = df[(df["eco_replacement_pct"] >= 20.0) & (df["compressive_strength_mpa"] >= 35.0)][
        ["batch_id", "plant_name", "mix_type", "eco_replacement_pct", "compressive_strength_mpa"]
    ].rename(columns=col_rename_map)
    st.dataframe(res.head(10), use_container_width=True)
elif query_choice.startswith("4"):
    res = df[(df["plant_name"].str.contains("Kanthan")) & (df["age_days"] == 3)][
        ["batch_id", "curing_stage", "mix_type", "compressive_strength_mpa", "quality_status"]
    ].rename(columns=col_rename_map)
    st.dataframe(res.head(10), use_container_width=True)

# Zone 4: Star Schema Data Explorer
with st.expander("📂 View Underlying Star Schema Tables (Fact & Dimensions)"):
    tab1, tab2, tab3, tab4 = st.tabs(["Fact_Concrete_Tests", "Dim_Mix_Design", "Dim_Plant_Site", "Dim_Curing_Age"])
    with tab1:
        st.dataframe(fact_tests.head(20), use_container_width=True)
    with tab2:
        st.dataframe(dim_mix.head(20), use_container_width=True)
    with tab3:
        st.dataframe(dim_plants, use_container_width=True)
    with tab4:
        st.dataframe(dim_ages, use_container_width=True)
