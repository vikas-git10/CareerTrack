# CareerTrack

CareerTrack is a personal job application and career tracking platform designed to help students, freshers, and job seekers organize their job search in one place.

The application provides a centralized dashboard for managing job applications, tracking skills, identifying skill gaps, scheduling interviews, and analyzing job-search progress.

## Features

### Dashboard
- Overview of total job applications
- Interview count
- Pending applications
- Job offers
- Application analytics
- Application status visualization

### Job Applications
- Add and manage job applications
- Track company, position, location, priority, and application date
- Track application status
- Search and filter applications
- View, edit, and delete applications
- Connect interview records with applications

### Skills
- Add professional and technical skills
- Track proficiency levels
- Edit and delete skills
- Organize skills for career development

### Skill Gap Analysis
- Select a job application
- Compare current skills with required skills
- Calculate job match percentage
- Identify strong skills
- Identify skills that need improvement
- Identify missing skills

### Interview Management
- Schedule interviews
- Link interviews to existing job applications
- Store interview date and time
- Track interview type
- Track interview mode
- Add meeting links or locations
- Add preparation notes
- Track interview status
- Search and filter interviews
- Edit and delete interviews

### Analytics
- Application statistics
- Application trends
- Status distribution
- Career-search insights

### Profile
- Manage personal career information
- Store target role
- Store experience level
- Store location
- Add professional biography

### Settings
- Light and dark theme
- Notification preference
- Export CareerTrack data
- Clear stored application data

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Browser LocalStorage
- Git & GitHub

## Project Architecture

CareerTrack follows a modular client-side architecture.

```text
CareerTrack
│
├── index.html
│
├── pages/
│   ├── applications.html
│   ├── skills.html
│   ├── skill-gap.html
│   ├── interviews.html
│   ├── analytics.html
│   ├── profile.html
│   └── settings.html
│
├── css/
│   ├── style.css
│   ├── dashboard.css
│   ├── applications.css
│   ├── skills.css
│   ├── skill-gap.css
│   ├── interviews.css
│   ├── theme.css
│   └── settings.css
│
└── js/
    ├── app.js
    ├── dashboard.js
    ├── theme.js
    │
    ├── pages/
    │   ├── applications.js
    │   ├── skills.js
    │   ├── skill-gap.js
    │   ├── interviews.js
    │   ├── analytics.js
    │   ├── profile.js
    │   └── settings.js
    │
    ├── services/
    │   ├── applicationService.js
    │   ├── skillService.js
    │   ├── skillGapService.js
    │   ├── interviewService.js
    │   └── storage.js
    │
    └── utils/