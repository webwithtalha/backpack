# 03 - User Interface Sketch  

## 1. UI Design Purpose

The purpose of this user interface is to allow an **Operative** to record job completion details while on site.

The interface captures the key information required by **QS** to calculate and review the cost of a completed job, including:

- Time on site
- Number of Operatives
- Vehicle used
- Plant/tools used
- Materials used
- Job notes
- Evidence placeholder
- Estimated cost summary

The screen is designed to be **mobile-first** because Operatives are likely to use the app while working on site. However, the layout can also adapt to desktop screens.

---

## 2. Main Screen

The prototype focuses on one screen:

**Operative Job Completion and Cost Capture Screen**

This screen supports the workflow:

Operative opens job
        ↓
Operative enters site details
        ↓
System calculates estimated cost
        ↓
Operative saves draft or submits to QS
        ↓
QS reviews the submitted cost information


--------------------------------------------------------------------------------
Backpack                                        Status: Draft
Job Cost Capture
Record site details and estimate job cost for QS review
--------------------------------------------------------------------------------

|------------------------------------------------|   |--------------------------|
| Job Summary                                    |   | Estimated Cost Summary   |
|------------------------------------------------|   |--------------------------|
| Job Ref: SUF-10291                             |   | Site Hours: 3.5          |
| Asset: SL-8821 - Streetlight Column            |   | Labour:      £196.00     |
| Location: Ipswich Road, Suffolk                |   | Vehicle:     £42.00      |
| Fault: Lamp not working                        |   | Plant/Tools: £105.50     |
| Priority: Medium                               |   | Materials:   £43.00      |
| Status: In Progress                            |   |--------------------------|
| Operative: Talha Zulfiqar                      |   | Total:       £386.50     |
|------------------------------------------------|   |--------------------------|
                                                     | [Save Draft]             |
|------------------------------------------------|   | [Submit to QS]           |
| Time on Site                                   |   | [Reset Form]             |
|------------------------------------------------|   |--------------------------|
| Arrival Time:          [09:00]                 |
| Departure Time:        [12:30]                 |
| Number of Operatives:  [2]                     |
| Calculated Site Hours: 3.5 hours               |
|------------------------------------------------|

|------------------------------------------------|
| Vehicle Used                                   |
|------------------------------------------------|
| Vehicle Type:          [Transit Van ▼]         |
| Vehicle Hours:         [3.5]                   |
| Vehicle Rate:          £12/hour                |
|------------------------------------------------|

|------------------------------------------------|
| Plant / Tools Used                             |
|------------------------------------------------|
| [x] Cherry Picker              Hours: [2]      |
|     Rate: £45/hour                             |
|                                                |
| [x] Electrical Testing Kit     Hours: [1]      |
|     Rate: £5/hour                              |
|                                                |
| [ ] Cable Locator              Hours: [0]      |
|     Rate: £15/hour                             |
|                                                |
| [x] Hand Tools                 Hours: [3.5]    |
|     Rate: £3/hour                              |
|                                                |
| [ ] Traffic Management Kit     Hours: [0]      |
|     Rate: £20/hour                             |
|------------------------------------------------|

|------------------------------------------------|
| Materials Used                                 |
|------------------------------------------------|
| LED Lamp Unit          Qty: [1]     £35 each   |
| Fuse                   Qty: [2]     £4 each    |
| Cable Connector        Qty: [0]     £8 each    |
| Photocell Sensor       Qty: [0]     £18 each   |
| Bracket                Qty: [0]     £12 each   |
|------------------------------------------------|

|------------------------------------------------|
| Job Notes                                      |
|------------------------------------------------|
| [ Lamp unit replaced, wiring checked, and       |
|   asset tested successfully. ]                  |
|------------------------------------------------|

|------------------------------------------------|
| Evidence                                       |
|------------------------------------------------|
| [ Upload Photo Placeholder ]                    |
| completion-photo.jpg                           |
| Note: In production, Operatives would upload    |
| completion evidence photos here.               |
|------------------------------------------------|