# 01 - Requirements Document  
## Backpack Job Cost Capture Prototype

---

## 1. Purpose of the App

The purpose of this app is to help McCann better understand the cost of a completed job.

In the scenario, an **Operative** completes hands-on work on site, such as repairing a streetlight. After or during the job, the Operative records key job information including time on site, vehicles used, plant/tools used, materials used, and notes.

This information is then used by **QS** office staff to calculate, review, and approve the cost of the completed job.

The app supports better cost visibility, reduces manual communication, and improves the accuracy of job costing.

---

## 2. Business Problem

McCann wants to understand the true cost of a job once it is complete.

Without a structured digital system, QS staff may need to manually ask Operatives for information such as:

- How long they were on site
- Which vehicle was used
- Which tools or plant were used
- Which materials were consumed
- Whether multiple Operatives were involved
- Whether job evidence exists
- Whether the job was completed as expected

This can lead to missing information, delays, inconsistent cost calculations, and additional administrative effort.

The proposed app captures job cost data at source, directly from the Operative, and presents it in a structured format for QS review.

---

## 3. Scope of This Prototype

This prototype focuses on one key screen:

**Operative Job Completion and Cost Capture Screen**

The prototype allows an Operative to:

- View job summary information
- Enter time on site
- Enter number of Operatives
- Select vehicle used
- Select plant/tools used
- Enter materials used
- Add notes
- View an estimated job cost
- Save a draft
- Submit the job details to QS for review

The prototype uses mock data and estimated cost rates. It does not include a real backend, database, login system, or real QS dashboard.

---

## 4. User Roles

### 4.1 Operative

An Operative is a worker on site who completes hands-on work within Suffolk, such as repairing a streetlight.

The Operative needs a simple, mobile-friendly interface to record job details quickly and accurately.

### 4.2 QS

QS is office staff who complete the financial parts of each job.

The QS needs accurate job information from the Operative to calculate, review, approve, or query the final job cost.

### 4.3 Manager / Supervisor

A Manager or Supervisor may need to monitor job completion, operational progress, and cost visibility.

### 4.4 Admin

An Admin manages users, roles, cost rates, vehicles, plant/tools, and materials in the full production system.

---

## 5. Functional Requirements

### 5.1 Operative Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | The system shall display key job details to the Operative. | Must Have |
| FR-002 | The system shall display job reference, asset ID, asset type, location, fault type, priority, and job status. | Must Have |
| FR-003 | The Operative shall be able to enter arrival time on site. | Must Have |
| FR-004 | The Operative shall be able to enter departure time from site. | Must Have |
| FR-005 | The system shall automatically calculate total time on site. | Must Have |
| FR-006 | The Operative shall be able to enter the number of Operatives who worked on the job. | Must Have |
| FR-007 | The system shall calculate labour cost using time on site, number of Operatives, and hourly labour rate. | Must Have |
| FR-008 | The Operative shall be able to select the vehicle used for the job. | Must Have |
| FR-009 | The Operative shall be able to enter vehicle hours on site. | Must Have |
| FR-010 | The system shall calculate vehicle cost using vehicle hours and vehicle hourly rate. | Must Have |
| FR-011 | The Operative shall be able to select plant/tools used on the job. | Must Have |
| FR-012 | The Operative shall be able to enter usage hours for each selected plant/tool. | Must Have |
| FR-013 | The system shall calculate plant/tool cost using usage hours and hourly rates. | Must Have |
| FR-014 | The Operative shall be able to enter materials used on the job. | Must Have |
| FR-015 | The Operative shall be able to enter quantity for each material used. | Must Have |
| FR-016 | The system shall calculate material cost using quantity and unit cost. | Must Have |
| FR-017 | The system shall display labour cost, vehicle cost, plant/tools cost, material cost, and total estimated cost. | Must Have |
| FR-018 | The total estimated cost shall update automatically when form values change. | Must Have |
| FR-019 | The Operative shall be able to add job completion notes. | Must Have |
| FR-020 | The Operative shall be able to save the form as a draft. | Should Have |
| FR-021 | The Operative shall be able to submit job cost details to QS for review. | Must Have |
| FR-022 | The system shall show a confirmation message after successful submission. | Must Have |
| FR-023 | The system shall include a placeholder for evidence/photo upload. | Should Have |
| FR-024 | The production system should allow the Operative to upload completion evidence photos. | Should Have |
| FR-025 | The production system should support offline draft saving for poor network conditions. | Could Have |

---

### 5.2 QS Requirements

These requirements describe the full production system and are not all implemented in this prototype.

| ID | Requirement | Priority |
|---|---|---|
| FR-026 | The QS shall be able to view submitted job cost records. | Must Have |
| FR-027 | The QS shall be able to review Operative-submitted time on site. | Must Have |
| FR-028 | The QS shall be able to review labour, vehicle, plant/tools, and material costs. | Must Have |
| FR-029 | The QS shall be able to amend cost values where authorised. | Should Have |
| FR-030 | The QS shall be able to approve a job cost. | Must Have |
| FR-031 | The QS shall be able to reject or query a job cost submission. | Should Have |
| FR-032 | The QS shall be able to add financial review notes. | Should Have |
| FR-033 | The QS shall be able to view supporting job notes and evidence. | Should Have |
| FR-034 | The QS shall be able to export job cost summaries. | Could Have |
| FR-035 | The QS shall be able to filter submitted costs by job reference, date, Operative, location, or status. | Could Have |

---

### 5.3 Manager / Supervisor Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-036 | Managers shall be able to view submitted and completed jobs. | Should Have |
| FR-037 | Managers shall be able to monitor job status. | Should Have |
| FR-038 | Managers shall be able to view cost trends by job type, area, or Operative. | Could Have |
| FR-039 | Managers shall be able to identify jobs with unusually high costs. | Could Have |
| FR-040 | Managers shall be able to view dashboard summaries for operational and financial visibility. | Could Have |

---

### 5.4 Admin Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-041 | Admin users shall be able to manage user accounts. | Must Have |
| FR-042 | Admin users shall be able to assign roles such as Operative, QS, Manager, and Admin. | Must Have |
| FR-043 | Admin users shall be able to manage labour rates. | Should Have |
| FR-044 | Admin users shall be able to manage vehicle types and vehicle hourly rates. | Should Have |
| FR-045 | Admin users shall be able to manage plant/tool catalogue and hourly rates. | Should Have |
| FR-046 | Admin users shall be able to manage material catalogue and unit costs. | Should Have |
| FR-047 | Admin users shall be able to view audit logs. | Should Have |
| FR-048 | Admin users shall be able to deactivate users when staff leave the company. | Should Have |

---

## 6. Cost Calculation Requirements

The prototype shall calculate an estimated job cost using four main categories:

```text
Total Estimated Cost =
Labour Cost + Vehicle Cost + Plant/Tools Cost + Materials Cost

-- Labour Cost
Labour Cost = Site Hours × Number of Operatives × Operative Hourly Rate

For Example
3.5 hours × 2 Operatives × £28 = £196

-- Vehicle cost
Vehicle Cost = Vehicle Hours × Vehicle Hourly Rate

For Example
3.5 hours × £12 = £42

-- Plant / Tools Cost
Plant/Tools Cost = Sum of selected tool hours × selected tool hourly rate

For Example
Cherry Picker: 2 hours × £45 = £90
Electrical Testing Kit: 1 hour × £5 = £5
Hand Tools: 3.5 hours × £3 = £10.50

Plant/Tools Total = £105.50

-- Materials cost
Materials Cost = Sum of material quantity × material unit cost

For Example
LED Lamp Unit: 1 × £35 = £35
Fuse: 2 × £4 = £8

Materials Total = £43

-- Total Estimated cost example

Labour: £196
Vehicle: £42
Plant/Tools: £105.50
Materials: £43

Total Estimated Cost: £386.50
