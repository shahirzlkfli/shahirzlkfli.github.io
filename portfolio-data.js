/**
 * PORTFOLIO DATA CONFIGURATION
 * -------------------------------------------------------------
 * Tailored for MUHAMMAD SHAHIR BIN ZULKIFLI
 * Bachelor of Science with Honours (Statistics) | Data & AI
 * Universiti Kebangsaan Malaysia (UKM)
 */

const PORTFOLIO_DATA = {
  // 1. Personal & Role Overview
  profile: {
    name: "Muhammad Shahir Bin Zulkifli",
    shortName: "Muhammad Shahir",
    preferredName: "Shahir",
    pronouns: "he/him",
    avatar: "assets/shahir_profile_square.jpg",
    roleTitle: "Bachelor of Science with Honours (Statistics) | Data & AI",
    tagline: "Statistics graduate from UKM with hands-on enterprise experience in data analytics, data modelling, dashboard development, and AI-enabled reporting on Snowflake, Streamlit, and Power BI.",
    location: "Seri Kembangan, Selangor, Malaysia",
    status: "Actively seeking full-time Data & AI / Analytics positions",
    statusBadge: "🟢 Available for Full-Time Data & AI Positions (2026)",
    bio: "Statistics graduate with hands-on experience in data analytics, data modelling, dashboard development, and AI-enabled reporting. Experienced in working with Snowflake, SQL, Python, Streamlit, and Power BI to transform business data into analytical insights and interactive reporting solutions. Strong foundation in statistical analysis, complemented by leadership experience managing university programs, teams, budgets, and cross-functional stakeholders.",
    resumeUrl: "#resume-modal",
    directEmail: "shahirzulkifli1203@gmail.com",
    phone: "+601139795942",
    socials: {
      linkedin: "https://www.linkedin.com/in/muhammadshahir",
      github: "https://github.com/shahirzlkfli",
      whatsapp: "https://wa.me/601139795942"
    }
  },

  // 2. Featured Flagship Projects & Enterprise Initiatives
  projects: [
    {
      id: "concrete-star-schema-semantic",
      title: "Concrete Quality Star Schema & Snowflake Semantic Layer",
      category: "Data Engineering",
      featured: true,
      badge: "Flagship Project · Live Demo",
      shortDescription: "Engineered an enterprise dimensional Star Schema (1 Fact + 3 Dimensions) and Snowflake Semantic View from raw concrete test data for natural-language Cortex AI analytics.",
      stats: "Star Schema (Fact + 3 Dims) · Snowflake Semantic View SQL · Interactive KPI Dashboard",
      image: "assets/concrete-plant.jpg",
      tags: ["Snowflake", "Data Modelling", "Star Schema", "Semantic Views", "Python", "SQL", "Streamlit"],
      liveUrl: "star-schema-demo/index.html",
      githubUrl: null,
      
      caseStudy: {
        problem: "Raw industrial quality control data (like concrete compressive tests) is typically captured as unstructured flat tables with only raw numerical mix proportions, making multi-facility comparison, time-curing trend analysis, and natural-language AI querying impossible without proper dimensional modeling.",
        solution: "Engineered an enterprise Star Schema decomposing raw test observations into three dedicated dimension tables (Dim_Plant_Site, Dim_Mix_Design, Dim_Curing_Age) connected to Fact_Concrete_Tests. On top of this schema, formulated the Snowflake Semantic View V_SEMANTIC_CONCRETE_QUALITY_ANALYTICS to standardize 28-day compliance pass rates and green cement substitution percentages.",
        businessImpact: "Demonstrates practical enterprise data modeling that bridges civil engineering metrics with Snowflake analytics, allowing plant managers and Cortex AI agents to query quality compliance in plain English.",
        diagramFlow: [
          { icon: "fa-solid fa-file-csv", title: "Raw Test CSV", sub: "Flat numeric batch data" },
          { icon: "fa-solid fa-diagram-project", title: "Star Schema ETL", sub: "Fact + 3 Dimension tables" },
          { icon: "fa-solid fa-layer-group", title: "Snowflake Semantic View", sub: "Pre-joined business logic" },
          { icon: "fa-solid fa-chart-pie", title: "Streamlit / Power BI", sub: "Interactive KPI dashboard" }
        ],
        architecture: [
          "Fact Table: FACT_CONCRETE_TESTS (Test_ID, Batch_ID, Mix_ID, Plant_ID, Age_Days, Compressive_Strength, Target, Status).",
          "Dimension Tables: DIM_PLANT_SITE (Rawang, Kanthan, Langkawi), DIM_MIX_DESIGN (Grades & Ratios), DIM_CURING_AGE (1d to 365d).",
          "Semantic Layer: Snowflake SQL View (V_SEMANTIC_CONCRETE_QUALITY_ANALYTICS) with pre-aggregated business KPIs and natural-language synonyms.",
          "Frontend Visualizer: Interactive Streamlit application and HTML dashboard."
        ],
        technicalChallenges: [
          "Data Normalization: Successfully extracted 35 unique mix recipe designs from 184 test observations to eliminate data redundancy.",
          "Metric Standardization: Structured dynamic Water/Binder ratios and green cement substitution formulas directly into the semantic layer."
        ],
        metrics: [
          "Complete Star Schema with 1 Fact table and 3 Dimension tables.",
          "Production-ready Snowflake SQL DDL & Semantic View script.",
          "Interactive dashboard tracking 28-day benchmark strength and ESG cement metrics."
        ]
      }
    },
    {
      id: "lstm-bank-stock-forecasting",
      title: "Bank Stock Price Forecasting with Deep Learning LSTM",
      category: "Statistical Modeling",
      featured: true,
      badge: "GitHub Code · Deep Learning",
      shortDescription: "Engineered a Long Short-Term Memory (LSTM) recurrent neural network in Python to model temporal market dependencies and forecast bank equity price movements.",
      stats: "LSTM Recurrent Architecture · Multivariate Time Series · Python & Deep Learning",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "LSTM", "Deep Learning", "Time Series", "Statistical Forecasting", "Pandas", "NumPy"],
      liveUrl: null,
      githubUrl: "https://github.com/shahirzlkfli/fyp-forecasting-banks-stocks/blob/main/LSTM%20on%20python",
      isInternalCompany: false,
      
      caseStudy: {
        problem: "Financial time-series data for banking equities exhibit non-linear volatility, regime shifts, and long-term autocorrelation memory that standard linear ARIMA models struggle to capture without high lag errors.",
        solution: "Designed and implemented a multi-layer Long Short-Term Memory (LSTM) recurrent neural network in Python. Preprocessed historical bank stock prices with min-max scaling, sliding temporal window lookbacks, and train-validation splits. Evaluated model predictive accuracy against baseline statistical benchmarks using RMSE and MAPE metrics.",
        businessImpact: "Demonstrates practical deep learning time-series forecasting capability on financial assets, bridging academic statistics (econometrics/stochastic processes) with scalable deep learning implementations on public GitHub.",
        diagramFlow: [
          { icon: "fa-solid fa-arrow-trend-up", title: "Historical Stock Feeds", sub: "OHLCV bank time series" },
          { icon: "fa-solid fa-filter", title: "Sequence Scaling & Windows", sub: "Sliding lookback frames" },
          { icon: "fa-solid fa-brain", title: "LSTM Recurrent Layers", sub: "Memory cell & forget gates" },
          { icon: "fa-solid fa-chart-line", title: "Out-of-Sample Predictions", sub: "RMSE / MAPE evaluation" }
        ],
        architecture: [
          "Data Ingestion: Historical OHLCV bank equity price sequences formatted into multidimensional numpy tensors.",
          "Feature Engineering: MinMax normalization, rolling moving averages, and temporal sliding window generation.",
          "Network Topology: Multi-cell LSTM recurrent architecture configured with dropout regularization to prevent overfitting on market noise.",
          "Evaluation & Visualization: Matplotlib/Seaborn visualization comparing actual price trajectories against out-of-sample forward forecasts."
        ],
        technicalChallenges: [
          "Non-Stationarity & Lookahead Bias: Strictly preserved temporal ordering during normalization and train/test splitting to eliminate data leakage.",
          "Overfitting Mitigation: Tuned sequence lookback lengths and dropout rates to balance short-term market noise with macro temporal trends."
        ],
        metrics: [
          "End-to-end Python pipeline from raw data extraction to model evaluation.",
          "Benchmarked against baseline time series techniques for lower forecast error variance.",
          "Open-source code repository hosted on GitHub."
        ]
      }
    },
    {
      id: "snowflake-cowork-ai-agent",
      title: "Permit-To-Work on Snowflake Cowork / Cortex",
      category: "AI & Snowflake",
      featured: true,
      badge: "Enterprise AI · YTL Cement",
      shortDescription: "Developed an AI-powered analytics agent using Snowflake semantic views and fact tables to enable natural-language data analysis, reporting, and visualization.",
      stats: "Natural-Language SQL · Snowflake Semantic Views · Instant Safety Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["Snowflake", "Semantic Views", "Fact Tables", "AI Agent", "SQL", "Python"],
      liveUrl: null,
      githubUrl: null,
      isInternalCompany: true,
      
      caseStudy: {
        problem: "At YTL Cement Shared Services, monitoring industrial Permit-To-Work (PTW) applications and compliance across plant operations required manual query writing and reporting across complex operational fact tables.",
        solution: "Developed an AI-powered analytics agent on Snowflake using curated semantic views and relational fact tables. This allows non-technical operations managers to query safety metrics, approval bottlenecks, and compliance anomalies in natural language with instant automated reporting and visualization.",
        businessImpact: "Transformed manual safety compliance audits from a 2+ hour ad-hoc query bottleneck into instant sub-5-second natural-language answers, empowering site operations managers to proactively track contractor safety risks without writing SQL.",
        diagramFlow: [
          { icon: "fa-solid fa-file-shield", title: "Plant Safety Logs", sub: "Permit applications" },
          { icon: "fa-solid fa-snowflake", title: "Snowflake Tables", sub: "Fact & Dim schemas" },
          { icon: "fa-solid fa-layer-group", title: "Semantic Views", sub: "Join logic & metrics" },
          { icon: "fa-solid fa-robot", title: "Snowflake Cowork AI", sub: "NL-to-SQL translation" },
          { icon: "fa-solid fa-chart-line", title: "Site Manager UI", sub: "Instant compliance reports" }
        ],
        architecture: [
          "Data Warehouse: Snowflake enterprise cloud data platform hosting normalized operational fact tables.",
          "Semantic Architecture: Designed abstraction views and semantic metadata defining dimensions, metrics, and relationships for Permit-To-Work workflows.",
          "AI Agent: Integrated Snowflake semantic views to translate plain-English prompts into validated SQL queries.",
          "Reporting Interface: Natural-language query interface delivering structured tabular data and summary charts."
        ],
        technicalChallenges: [
          "Semantic View Modeling: Formulated clean semantic definitions so the AI agent could accurately distinguish between safety permit statuses without joining redundant dimension tables.",
          "Data Governance & Accuracy: Applied role-based data masking and SQL guardrails to ensure the AI agent generated mathematically sound aggregates and complied with corporate data policies."
        ],
        metrics: [
          "Eliminated the need for non-technical stakeholders to write manual SQL for routine safety audits.",
          "Enabled sub-5-second natural language answers to complex multi-condition compliance queries.",
          "Presented to senior data engineering leadership at YTL Cement Shared Services."
        ]
      }
    },
    {
      id: "smart-ai-dashboard",
      title: "Smart AI Business Performance Dashboard",
      category: "AI & Snowflake",
      featured: true,
      badge: "Enterprise System · YTL Cement",
      shortDescription: "Developed an AI-powered dashboard using Snowflake data to visualize business performance and generate actionable analytical insights.",
      stats: "Snowflake data lakehouse · AI Insight Generation · Executive Business KPIs",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
      tags: ["Snowflake", "Python", "SQL", "AI Analytics", "Data Visualization", "VS Code"],
      liveUrl: null,
      githubUrl: null,
      isInternalCompany: true,
      
      caseStudy: {
        problem: "Enterprise stakeholders at YTL Cement required quick visibility into multidimensional operational metrics without manually sifting through disparate spreadsheet reports.",
        solution: "Built a centralized AI-powered analytics dashboard connected directly to Snowflake data stores. Incorporated automated analytical models to highlight key business trends, variance anomalies, and executive takeaways.",
        businessImpact: "Consolidated fragmented weekly operational data into a unified Snowflake dashboard, cutting executive report compilation turnaround by over 60% and enabling proactive bottleneck detection.",
        diagramFlow: [
          { icon: "fa-solid fa-industry", title: "Operational Systems", sub: "Plant manufacturing metrics" },
          { icon: "fa-solid fa-snowflake", title: "Snowflake Lakehouse", sub: "Curated historical data" },
          { icon: "fa-solid fa-brain", title: "Python AI Engine", sub: "Anomaly & variance algorithms" },
          { icon: "fa-solid fa-chart-pie", title: "Executive Dashboard", sub: "Automated KPI summaries" }
        ],
        architecture: [
          "Data Layer: Snowflake tables holding historical operational metrics.",
          "Analytics Engine: Python scripts running automated statistical variance and outlier detection.",
          "Visualization: Dynamic interactive charting with AI-generated summary narratives explaining metric shifts."
        ],
        technicalChallenges: [
          "Automating Insight Generation: Structured algorithmic prompt chains that examine statistical changes in key KPIs and output concise bulleted executive summaries.",
          "Query Optimization: Streamlined complex aggregation queries in SQL to minimize warehouse credit consumption."
        ],
        metrics: [
          "Automated the synthesis of weekly operational performance reports.",
          "Delivered intuitive data visualization to cross-functional business stakeholders."
        ]
      }
    },
    {
      id: "nosw-waste-management",
      title: "NOSW Industrial Waste Management Data Modeling",
      category: "Data Engineering",
      featured: true,
      badge: "Data Modelling · YTL Cement",
      shortDescription: "Developed and analyzed Snowflake data models for waste management data, supporting reporting, data transformation, and AI-driven business analysis.",
      stats: "Snowflake dimensional models · SQL ETL Transformation · ESG Analytics",
      image: "assets/nosw_waste_management.jpg",
      tags: ["Snowflake", "Data Modelling", "Data Transformation", "SQL", "Python"],
      liveUrl: null,
      githubUrl: null,
      isInternalCompany: true,
      
      caseStudy: {
        problem: "Tracking industrial waste generation, recycling, and disposal across operations involved messy, fragmented logs that prevented accurate environmental reporting and sustainability compliance.",
        solution: "Engineered scalable Snowflake data models and SQL transformation pipelines (ETL) to clean, structure, and aggregate waste management data into clean star-schema marts ready for AI and BI tools.",
        businessImpact: "Standardized multi-facility industrial waste manifests into an enterprise star-schema on Snowflake, accelerating monthly environmental compliance audit preparation and providing the data backbone for ESG reporting.",
        diagramFlow: [
          { icon: "fa-solid fa-truck-ramp-box", title: "Waste Manifests", sub: "Plant waste disposal logs" },
          { icon: "fa-solid fa-filter", title: "SQL ETL Pipelines", sub: "Cleansing & normalization" },
          { icon: "fa-solid fa-snowflake", title: "Star Schema Mart", sub: "Facility, Method & Waste dims" },
          { icon: "fa-solid fa-leaf", title: "ESG Analytics", sub: "Sustainability & AI forecasts" }
        ],
        architecture: [
          "Source Data: Operational waste manifests and facility logs.",
          "Snowflake Schema: Structured dimension tables (facility, waste category, disposal method) and fact tables (quantities, dates, compliance scores).",
          "Transformation: Stored procedures and transformation views in Snowflake SQL."
        ],
        technicalChallenges: [
          "Handling Inconsistent Categorizations: Standardized legacy categorical naming conventions across plant sites using SQL mapping and regex cleansing.",
          "Audit Trail Compliance: Maintained historical change tracking to ensure regulatory environmental audit compliance."
        ],
        metrics: [
          "Unified fragmented waste tracking into a single source of truth on Snowflake.",
          "Formed the core analytical backbone for internal sustainability reporting and AI forecasts."
        ]
      }
    },
    {
      id: "streamlit-reporting-projects",
      title: "Streamlit Reporting Projects & Dynamic Self-Service",
      category: "BI & Dashboards",
      featured: false,
      badge: "Internal Portal · YTL Cement",
      shortDescription: "Developed interactive dashboards and self-service reports using Python and Streamlit, integrated with Snowflake for dynamic data exploration and visualization.",
      stats: "Python Streamlit · Snowflake live query · Dynamic filtering · Fast cached UI",
      image: "assets/streamlit_reporting_dashboard.jpg",
      tags: ["Streamlit", "Python", "Snowflake", "Pandas", "Data Exploration"],
      liveUrl: null,
      githubUrl: null,
      isInternalCompany: true,
      
      caseStudy: {
        problem: "Business users frequently requested customized ad-hoc report slices, bottlenecking data engineering teams with repetitive manual data extraction requests.",
        solution: "Created an interactive self-service data portal using Python and Streamlit, providing parameterized filters, custom CSV/Excel exports, and drill-down charts hooked directly to Snowflake.",
        businessImpact: "Empowered business stakeholders with interactive self-service data exploration directly on Snowflake, eliminating repetitive manual spreadsheet extract requests to the data team.",
        diagramFlow: [
          { icon: "fa-solid fa-database", title: "Snowflake Warehouse", sub: "Production data sets" },
          { icon: "fa-solid fa-bolt", title: "Python Connector", sub: "@st.cache_data query caching" },
          { icon: "fa-solid fa-laptop-code", title: "Streamlit Web App", sub: "Dynamic interactive filters" },
          { icon: "fa-solid fa-table", title: "Self-Service Reports", sub: "Instant CSV/Excel exports" }
        ],
        architecture: [
          "Frontend: Python Streamlit application with intuitive UI components.",
          "Integration: Snowflake Python connector with dynamic SQL parameterization.",
          "Optimization: Leveraged `@st.cache_data` to minimize repetitive warehouse query execution."
        ],
        technicalChallenges: [
          "State & Performance: Handled large datasets in memory by applying server-side SQL pagination and aggregation before passing data to the Streamlit frontend."
        ],
        metrics: [
          "Empowered non-technical teams to conduct self-service data exploration without engineering assistance.",
          "Sub-second filter response times through intelligent caching."
        ]
      }
    },
    {
      id: "power-bi-certification",
      title: "Power BI Enterprise Reporting & DAX Analytics",
      category: "BI & Dashboards",
      featured: false,
      badge: "Microsoft Certified",
      shortDescription: "Microsoft Certified: Power BI Data Analyst Associate with advanced expertise in DAX calculations, dimensional modeling, and interactive self-service dashboards.",
      stats: "PL-300 Certified · Star Schema Modeling · Time Intelligence DAX · KPI Visuals",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["Power BI", "Microsoft Excel", "DAX", "Data Modelling", "Business Intelligence"],
      liveUrl: null,
      githubUrl: null,
      
      caseStudy: {
        problem: "Organizations need robust BI reporting that aligns with Microsoft enterprise data ecosystems and supports complex business logic calculations.",
        solution: "Built end-to-end Power BI solutions following Microsoft best practices: robust ETL with Power Query, optimized dimensional modeling, and time-intelligence DAX measures.",
        businessImpact: "Delivered executive-grade business intelligence reporting adhering to Microsoft best practices, featuring dynamic time-intelligence DAX measures and secure row-level security.",
        diagramFlow: [
          { icon: "fa-solid fa-server", title: "Enterprise Sources", sub: "Relational & Excel data" },
          { icon: "fa-solid fa-gears", title: "Power Query (M)", sub: "Automated data transformation" },
          { icon: "fa-solid fa-diagram-project", title: "Star Schema", sub: "Optimized relationship modeling" },
          { icon: "fa-solid fa-chart-column", title: "Power BI Reports", sub: "Interactive DAX visuals" }
        ],
        architecture: [
          "Data Modeling: Star schema with conformed dimension tables and fact tables.",
          "Calculations: Advanced DAX (Time Intelligence, Year-over-Year, Rolling Averages, Dynamic Ranking).",
          "UI / UX: Clean user-centric layout with bookmarks, drill-throughs, and role-based row-level security."
        ],
        technicalChallenges: [
          "Performance Tuning: Optimized data models by eliminating bi-directional relationships and minimizing high-cardinality columns to improve DAX calculation speed."
        ],
        metrics: [
          "Earned the prestigious Microsoft Certified: Power BI Data Analyst Associate credential (Dec 2025)."
        ]
      }
    },
    {
      id: "statistical-analysis-forecasting",
      title: "Statistical Analysis & Time Series Econometrics",
      category: "Statistical Modeling",
      featured: false,
      badge: "UKM Statistics Core",
      shortDescription: "Applied statistical foundations in Time Series Analysis, Regression Analysis, and Economy/Social Statistics using Python, R, Minitab, and SAS.",
      stats: "ARIMA & SARIMAX · Multivariate Regression · Stationarity Testing · Minitab & SAS",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      tags: ["Time Series Analysis", "Regression Analysis", "Python", "R", "Minitab", "SAS"],
      liveUrl: null,
      githubUrl: null,
      
      caseStudy: {
        problem: "Forecasting seasonal business cycles and economic trends requires rigorous mathematical validation rather than naive heuristic trendlines.",
        solution: "Applied comprehensive econometric and statistical modeling frameworks (Box-Jenkins methodology) in R and Python, analyzing ACF/PACF plots, unit-root tests (ADF), and seasonal decomposition.",
        businessImpact: "Applied rigorous econometric and mathematical time series modeling (ARIMA/SARIMAX) to forecast seasonal trends with verified residual white-noise and statistical confidence intervals.",
        diagramFlow: [
          { icon: "fa-solid fa-chart-line", title: "Time Series Data", sub: "Seasonal trend inputs" },
          { icon: "fa-solid fa-square-root-variable", title: "Stationarity Test", sub: "ADF test & differencing" },
          { icon: "fa-solid fa-calculator", title: "ARIMA / SARIMAX", sub: "R & Python statsmodels" },
          { icon: "fa-solid fa-bullseye", title: "Validated Forecast", sub: "Confidence interval projections" }
        ],
        architecture: [
          "Languages & Tools: Python, R, Minitab, SAS.",
          "Models: AutoRegressive Integrated Moving Average (ARIMA), Exponential Smoothing, Multiple Linear Regression.",
          "Diagnostics: Ljung-Box Q-test, AIC/BIC model selection, and out-of-sample error evaluation."
        ],
        technicalChallenges: [
          "Non-Stationarity: Applied appropriate mathematical differencing and log transformations to stabilize non-constant variance and mean shifts."
        ],
        metrics: [
          "Demonstrated rigorous statistical validation across academic and applied business forecasting."
        ]
      }
    }
  ],

  // 4. Categorized Skills Matrix (Matching the 5 Official Categories from Resume)
  skills: {
    programming: [
      { name: "Python", level: "Proficient", highlighted: true },
      { name: "SQL", level: "Proficient", highlighted: true },
      { name: "R", level: "Proficient", highlighted: true },
      { name: "C++", level: "Intermediate", highlighted: true }
    ],
    analyticsBI: [
      { name: "Power BI", level: "Certified Associate", highlighted: true },
      { name: "Microsoft Excel", level: "Advanced", highlighted: true },
      { name: "Streamlit", level: "Proficient", highlighted: true }
    ],
    platformsEngineering: [
      { name: "Snowflake", level: "Hands-on Enterprise", highlighted: true },
      { name: "Data Modelling (Semantic & Fact)", level: "Proficient", highlighted: true },
      { name: "Data Transformation (ETL)", level: "Proficient", highlighted: true }
    ],
    statisticalAnalysis: [
      { name: "Time Series Analysis", detail: "ARIMA, SARIMAX, seasonality, stationarity" },
      { name: "Regression Analysis", detail: "Multivariate regression, hypothesis testing, ANOVA" },
      { name: "Minitab", detail: "Statistical quality control and hypothesis testing" },
      { name: "SAS", detail: "Data analysis and statistical programming" }
    ],
    devTools: [
      { name: "Git & GitHub", level: "Proficient", highlighted: true },
      { name: "VS Code", level: "Proficient", highlighted: true },
      { name: "Kiro", level: "Proficient", highlighted: true }
    ]
  },

  // 5. Practical Work Experience & Extracurricular Leadership
  experience: [
    {
      role: "Intern, Data & AI Team",
      organization: "YTL Cement Shared Services",
      location: "Kuala Lumpur, Malaysia",
      period: "March 2026 – August 2026",
      type: "Work Experience",
      skillsRelated: "Snowflake, SQL, Python, Streamlit, Git, VS Code, Kiro",
      highlights: [
        "Smart AI Dashboard: Developed an AI-powered dashboard using Snowflake data to visualize business performance and generate actionable analytical insights.",
        "Permit-To-Work on Snowflake Cowork: Developed an AI-powered analytics agent using Snowflake semantic views and fact tables to enable natural-language data analysis, reporting, and visualization.",
        "NOSW Project: Developed and analyzed Snowflake data models for waste management data, supporting reporting, data transformation, and AI-driven business analysis.",
        "Streamlit Reporting Projects: Developed interactive dashboards and self-service reports using Python and Streamlit, integrated with Snowflake for dynamic data exploration and visualization."
      ]
    },
    {
      role: "Vice President",
      organization: "Statistics Club, Universiti Kebangsaan Malaysia (UKM)",
      location: "Bangi, Selangor",
      period: "October 2024 – June 2025",
      type: "Extracurricular Activities",
      highlights: [
        "Collaborated with executives to organize club activities throughout the semester through regular strategic planning meetings.",
        "Served as liaison between the President and committee, translating strategic goals into actionable departmental tasks.",
        "Coordinated key operational deliverables by implementing a centralized tracking system for deadlines and budget approvals."
      ]
    },
    {
      role: "Director",
      organization: "Malam Variasi Bintang",
      location: "Bangi Golf Resort, Selangor",
      period: "June 2025",
      type: "Event Leadership",
      highlights: [
        "Directed the inaugural annual grand dinner at Bangi Golf Resort, overseeing vendor coordination, event logistics, and programme execution.",
        "Coordinated the hosting of international delegates from Universitas Airlangga (UNAIR) and documented an operational and financial framework for future editions."
      ]
    },
    {
      role: "Vice Director",
      organization: "Statistics Together Across Region (STAR)",
      location: "Surabaya, Indonesia",
      period: "April 2025",
      type: "International Mobility",
      highlights: [
        "Co-directed a five-day international academic and cultural mobility programme with Universitas Airlangga, Surabaya, including travel, budgeting, programme coordination, and delegate management."
      ]
    },
    {
      role: "Multimedia Executive",
      organization: "Omarian Aspirational International Synergy (OASIS) Thailand",
      location: "Thailand",
      period: "July 2024",
      type: "International Program",
      highlights: [
        "Managed multimedia and social-media content for an international mobility programme, including promotional materials, photography, videos, and real-time programme updates."
      ]
    }
  ],

  // 6. Professional Certifications (Matches Credentials UI)
  certifications: [
    {
      id: "microsoft-power-bi-pl300",
      org: "MICROSOFT",
      title: "Microsoft Certified: Power BI Data Analyst Associate",
      subtitle: "PL-300 Industry Certification",
      description: "Industry-standard certification validating enterprise-level Power BI data modeling, DAX measure engineering, semantic layer design, and executive report deployment.",
      previewImage: "assets/cert_power_bi_cropped.png",
      pdfUrl: "assets/Microsoft_Power_BI_Certificate.pdf",
      pdfDownloadName: "Microsoft_Certified_Power_BI_Associate.pdf",
      verifyUrl: "https://learn.microsoft.com/en-us/users/shahirzulkifli-1751/credentials/certification/data-analyst-associate?tab=credentials-tab",
      badgeText: "Official Microsoft Certified",
      credentialId: "7CD200387D2EF2D2",
      certNumber: "EBA84B-56B0PC",
      issueDate: "December 18, 2025",
      expiryDate: "December 19, 2026",
      isDirectPdf: true
    },
    {
      id: "trainocate-pl300t00",
      org: "TRAINOCATE · MICROSOFT SOLUTIONS PARTNER",
      title: "PL-300T00: Design and Manage Analytics Solutions Using Power BI",
      subtitle: "Official Certificate of Completion",
      description: "Official Microsoft-aligned training programme covering end-to-end Power BI architecture, data modeling, DAX measure engineering, Power Query ETL pipelines, and enterprise analytics deployment.",
      previewImage: "assets/cert_trainocate_official.png",
      pdfUrl: "assets/Trainocate_Power_BI_Certificate.pdf",
      pdfDownloadName: "Trainocate_PL300T00_Power_BI_Certificate.pdf",
      verifyUrl: null,
      badgeText: "Official Completion Certificate",
      credentialId: null,
      certNumber: null,
      issueDate: "17 Nov 2025 to 19 Nov 2025",
      expiryDate: "Completed",
      isDirectPdf: true
    }
  ],

  // 7. Education, Awards & Honors
  education: {
    degree: "Bachelor of Science with Honors (Statistics)",
    institution: "Universiti Kebangsaan Malaysia (UKM)",
    period: "August 2022 – October 2026",
    gpa: "CGPA: 3.41",
    honors: [
      "Microsoft Certified: Power BI Data Analyst Associate - Microsoft (December 2025)",
      "Microsoft Power BI certificate from Trainocate Malaysia - UKM Karrier (November 2025)",
      "First Place in Ultimate Frisbee - UKM Sport (October 2025)",
      "First Place in Ultimate Frisbee - Inter Faculty Sport (June 2025)",
      "Kolej Matrikulasi Perlis: Life Science | CGPA 4.00 | Dean's List - All semesters (July 2021 – May 2022)",
      "Kolej Islam Sultan Alam Shah: Enrolled in pure science stream (2019 – 2020)"
    ],
    relevantCoursework: [
      "Time Series Analysis",
      "Regression Analysis",
      "Economy and Social Statistics"
    ]
  },

  // 8. Academic & Professional References (Directly from Resume)
  references: [
    {
      name: "Dr. Nor Hamizah binti Miswan",
      title: "Lecturer of Statistics",
      department: "Faculty of Science and Technology",
      institution: "Universiti Kebangsaan Malaysia (UKM)",
      phone: "+60197101136",
      email: "norhamizah@ukm.edu.my",
      relationship: "Academic Reference"
    },
    {
      name: "Vivian Yang Poh Chin",
      title: "Data Engineering Lead",
      department: "Data & AI Team",
      institution: "YTL Cement Shared Services",
      phone: "+60179383188",
      email: "vivian.yang@ytlcement.com.my",
      relationship: "Industry Internship Supervisor"
    }
  ]
};

// Expose globally for browser
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
