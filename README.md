from pathlib import Path

readme = r"""# Berserk Frontend — Financial Reporting, AI Analysis & Forecast Dashboard

Berserk Frontend is a production-ready Next.js dashboard for the financial reporting platform.  
It connects to the Berserk backend and allows users to upload Excel/CSV files, run AI-powered financial analysis, generate PDF reports, view dashboards, manage report templates, and create financial forecasts based on historical spreadsheet data.

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Build](#build)
- [Backend Connection](#backend-connection)
- [Authentication](#authentication)
- [Financial Module Routes](#financial-module-routes)
- [Sidebar Navigation](#sidebar-navigation)
- [API Client](#api-client)
- [Dashboard](#dashboard)
- [Excel Upload](#excel-upload)
- [Uploaded Files](#uploaded-files)
- [AI Analyses](#ai-analyses)
- [Forecasts](#forecasts)
- [Report Templates](#report-templates)
- [PDF Reports](#pdf-reports)
- [Shared Components](#shared-components)
- [Design System](#design-system)
- [Status and Severity Colors](#status-and-severity-colors)
- [UX Rules](#ux-rules)
- [Error Handling](#error-handling)
- [Testing Flow](#testing-flow)
- [Production Checklist](#production-checklist)
- [Deployment Notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)

---

## Overview

This frontend is part of the Berserk financial reporting platform.

The platform helps users:

1. Upload Excel or CSV files.
2. Parse financial data from unknown spreadsheet structures.
3. Run AI financial analysis through the backend.
4. Detect warnings, recommendations, anomalies, risks, and errors.
5. Generate professional PDF reports.
6. Forecast future financial values from historical data.
7. View dashboard charts and summaries.
8. Manage reusable financial report templates.

The frontend must never show raw JSON to end users.  
All backend data must be rendered as clean cards, tables, charts, badges, and human-readable text.

---

## Core Features

- Locale-based Next.js app routing
- Protected dashboard pages
- NextAuth session integration
- Axios API client with Bearer token support
- Financial dashboard
- Excel/CSV upload UI
- Upload history
- AI analysis detail page
- AI analysis recommendations, warnings, errors, risks, and anomalies
- Forecast / prediction module
- Forecast charts and forecast points table
- PDF report generation and download
- Report template management
- Attribute palette
- Responsive sidebar and header
- Production-ready enterprise UI
- Loading, empty, error, and success states
- Clean color system based on `#112855`

---

## Tech Stack

- Next.js
- TypeScript
- React
- pnpm
- Turbo
- NextAuth
- next-intl
- Axios
- React Hot Toast
- Lucide React
- Framer Motion
- XLSX
- Recharts or existing project chart components
- Tailwind CSS or existing project styling system

---

## Repository Structure

```txt
Berserk-front/
├── apps/
│   └── product/
│       ├── src/
│       │   ├── app/
│       │   │   ├── [locale]/
│       │   │   │   └── financial/
│       │   │   │       ├── dashboard/
│       │   │   │       │   └── page.tsx
│       │   │   │       ├── upload/
│       │   │   │       │   └── page.tsx
│       │   │   │       ├── files/
│       │   │   │       │   ├── page.tsx
│       │   │   │       │   └── [id]/
│       │   │   │       │       └── page.tsx
│       │   │   │       ├── analyses/
│       │   │   │       │   ├── page.tsx
│       │   │   │       │   └── [id]/
│       │   │   │       │       └── page.tsx
│       │   │   │       ├── forecasts/
│       │   │   │       │   ├── page.tsx
│       │   │   │       │   └── [id]/
│       │   │   │       │       └── page.tsx
│       │   │   │       ├── templates/
│       │   │   │       │   ├── page.tsx
│       │   │   │       │   └── [id]/
│       │   │   │       │       └── page.tsx
│       │   │   │       └── reports/
│       │   │   │           ├── page.tsx
│       │   │   │           └── [id]/
│       │   │   │               └── page.tsx
│       │   │   └── shared/
│       │   │       └── financial/
│       │   │           ├── FinancialPageHeader.tsx
│       │   │           ├── FinancialStatCard.tsx
│       │   │           ├── UploadDropzone.tsx
│       │   │           ├── AnalysisStatusBadge.tsx
│       │   │           ├── ForecastStatusBadge.tsx
│       │   │           ├── EmptyState.tsx
│       │   │           ├── ErrorState.tsx
│       │   │           ├── LoadingState.tsx
│       │   │           └── forecast/
│       │   ├── layouts/
│       │   │   └── helium/
│       │   └── server/
│       │       └── api.ts
│       └── package.json
├── packages/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json