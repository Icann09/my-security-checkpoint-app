Business Goals 
- Improve Operational Transparency (Provide real-time visibility of guard attendance, shifts, and absences to supervisors and management)
- Reduce Manual Reporting Time (Automate absence logging and shift reporting to cut admin work by 50–70%, compared to spreadsheets or paper logs)
- Increase Guard Accountability (Track attendance history, lateness, and no-show records to improve performance and reduce repeated violations)
- Enhance Data Accuracy (Eliminate manual human errors by centralizing digital attendance records with timestamps and automated validation)
- Strengthen Compliance & Documentation (Maintain organized records that comply with internal policies and external audit requirements)
- Improve Decision-Making With Analytics 

Core Features (MVP — Minimum Viable Product)
1. User Roles & Access
  - Security Guard
  - Supervisor / Shift Leader
  - Manager / Admin
2. Attendance Tracking
  - Guard check-in / check-out
  - Automatic timestamping
  - Mark absence, late, or no-show
3. Absence Reporting
  - Guards can submit absence requests (sick leave, emergency, etc.)
  - Supervisor approval/rejection
  - Reason tagging
4. Shift Management
  - Assign shifts and locations
  - View daily and weekly schedules
  - Track coverage vs unfilled shifts
5. Dashboards
  - Today’s absences
  - Current active guards
  - Quick overview of locations
  - Stats summary for supervisors
6. Notifications & Alerts
  - Alert supervisor when a guard is absent or late
  - Email/SMS push notifications
  - Replacement guard needed notification
7. Attendance History
  - Daily logs
  - Absence patterns
  - Lateness count
  - Export history to PDF/Excel
8. Basic Reporting
  - Monthly attendance report
  - Absence summary report
  - Location-based guard coverage

Advanced Features (Growth Stage)
1. Digital Timesheets
  - Automatically generated hours worked
  - Overtime calculations
2. Replacement Assignment
  - Automated suggestions for available guards
  - One-click assign replacement
3. Multi-Site Monitoring
  - Map or list view of all security posts
  - Real-time guard availability per site
4. Document Management
  - Guard ID, certifications, contracts
  - Expiration reminders
5. Performance & Reliability Score
  - Attendance-based scoring
  - Trend analysis per guard
6. API Access
  - Output to HR, payroll, scheduling systems
7. Supervisor Tools
  - Approve/edit shift logs
  - Assign tasks
  - Message guards directly

Pages: 
1. Landing Page
2. Login Page
3. Admin Dashboard (Summary of total officers, active posts, today’s attendance, reports, alerts)
4. Officers Management
  - List of all security officers
  - Create new officer
  - Edit officer info
  - Assign to posts
5. Officer Detail Page
  - Personal data
  - Attendance history
  - Schedule
  - Performance metrics

Thecs
- Framework: Next.js / React 
- Monorepo 
- Authentication system: Clerk, Auth.js
- Database: PostgreSQL 
- ORM: Drizzle 
- File storage: Image Kit
- Email provider: Resend
- CI/CD: GitHub Actions / Vercel pipeline
- API: REST