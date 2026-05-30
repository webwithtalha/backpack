# Backpack Job Cost Capture System Architecture

This document explains the architecture of the Backpack Job Cost Capture System, a web-based application designed to track and manage job costs for field operations. The system follows a standard three-tier architecture with distinct user, frontend, backend, and database layers.

---

## System Components
### Users
The system supports four distinct user roles, each with different access methods and responsibilities:

| User Role | Access Method | Primary Function |
| ----- | ----- | ----- |
| **Field Operative** | Mobile / PWA | Captures time, materials, and costs on-site |
| **QS Office Staff** | Desktop Web | Reviews and processes cost submissions |
| **Manager / Supervisor** | Dashboard | Monitors job progress and cost summaries |
| **Admin User** | System Config | Manages system settings and user permissions |
---

### Frontend Layer
- **Technology Stack:** Next.js / React / TypeScript
- **Purpose:** Provides the user interface for all user roles
- **Features:**
    - Progressive Web App (PWA) support for mobile field operatives
    - Responsive design for desktop and mobile access
    - Single application serving all user types with role-based views

---

### Backend Services
The backend is built on **Node.js** using **NestJS** or **Next.js** API routes and provides the following core services:

#### Security & Access Control
- **Authentication** — User login and session management
- **RBAC (Role-Based Access Control)** — Permission management based on user roles
#### Business Logic
- **Cost Calculation** — Computes job costs based on time, materials, and resources
- **QS Workflow** — Manages the review and approval process for quantity surveying
#### Supporting Services
- **Audit Logging** — Tracks all system actions for compliance and traceability
- **Notifications** — Alerts users to pending tasks, approvals, or updates
- **File Storage** — Handles photo uploads and document attachments
- **Reporting / Export** — Generates reports in CSV, PDF, or feeds data to BI tools
---

### Database Layer
The system uses **PostgreSQL** as its primary data store with the following table groups:

#### Core Data Tables
- **Users & Roles** — User accounts and permission assignments
- **Jobs & Assets** — Job definitions and associated assets
- **Time Records** — Labour hours logged against jobs
- **Vehicles** — Vehicle usage and associated costs
- **Plant / Tools** — Equipment and tool tracking
- **Materials** — Material consumption records
#### Derived & Administrative Tables
- **Cost Summaries** — Aggregated cost data per job
- **QS Reviews** — Review status and approval records
- **Audit Logs** — Complete history of system changes
---

## Data Flow
```
Users → Frontend Application → Backend API → PostgreSQL Database
```
1. **Users** interact with the **Frontend Application** via web or mobile
2. **Frontend** sends requests to the **Backend API** over HTTPS
3. **Backend API** processes business logic and persists data to **PostgreSQL**
4. Reports and notifications flow back through the same path
---

## Future Expansion
The architecture includes a placeholder for **Future Backpack Modules**, indicating the system is designed for extensibility. The backend API connects to this component, suggesting new features can be integrated without major architectural changes.

---

## Key Architectural Decisions
- **Unified Frontend:** Single application serves all user types, reducing maintenance overhead
- **Service-Oriented Backend:** Modular services (auth, workflow, notifications) allow independent scaling
- **PostgreSQL:** Relational database chosen for structured cost data and audit requirements
- **PWA Support:** Enables offline capability for field operatives in low-connectivity environments


