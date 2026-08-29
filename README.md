```text
CareerTrack

CareerTrack is a personal job application and career tracking platform designed for students, freshers, and job seekers to organize and manage their job search in one place.

Features

Dashboard
• Total job applications
• Interview count
• Pending applications
• Job offers
• Application analytics
• Application status visualization
• Integrated interview tracking

Job Applications
• Add, edit, view, and delete applications
• Track company, position, location, priority, application date, and status
• Search and filter applications
• Connect applications with interviews
• Track interview-stage applications

Skills
• Add, edit, and delete skills
• Track skill proficiency levels
• Manage technical and professional skills

Skill Gap Analysis
• Select a job application
• Compare current skills with required skills
• Calculate job match percentage
• Identify strong skills
• Identify skills needing improvement
• Identify missing skills
• Visualize skill comparison

Interview Management
• Schedule interviews
• Link interviews to applications
• Store interview date and time
• Track interview type and mode
• Add meeting links or locations
• Add preparation notes
• Track interview status
• Search and filter interviews
• Edit and delete interviews
• Prevent duplicate interview records

Analytics
• Application statistics
• Application trends
• Application status distribution
• Career-search insights
• Visual data representation

Profile
• Manage personal career information
• Store target role
• Store experience level
• Store location
• Add professional biography
• View profile summary

Settings
• Light and dark mode
• Notification preference
• Export CareerTrack data
• Clear stored application data

Technology Stack

• HTML5
• CSS3
• JavaScript
• Bootstrap 5
• Browser LocalStorage
• Git
• GitHub
• GitHub Pages

Project Architecture

CareerTrack uses a modular client-side architecture with separate HTML pages, CSS files, JavaScript page modules, and reusable services.

CareerTrack
├── index.html
├── pages/
│   ├── applications.html
│   ├── skills.html
│   ├── skill-gap.html
│   ├── interviews.html
│   ├── analytics.html
│   ├── profile.html
│   └── settings.html
├── css/
│   ├── style.css
│   ├── dashboard.css
│   ├── applications.css
│   ├── skills.css
│   ├── skill-gap.css
│   ├── interviews.css
│   ├── theme.css
│   └── settings.css
└── js/
    ├── app.js
    ├── dashboard.js
    ├── theme.js
    ├── pages/
    │   ├── applications.js
    │   ├── skills.js
    │   ├── skill-gap.js
    │   ├── interviews.js
    │   ├── analytics.js
    │   ├── profile.js
    │   └── settings.js
    ├── services/
    │   ├── applicationService.js
    │   ├── skillService.js
    │   ├── skillGapService.js
    │   ├── interviewService.js
    │   └── storage.js
    └── utils/

Data Management

CareerTrack uses browser LocalStorage for client-side data persistence. Application data, skills, interviews, profile information, and settings are stored locally in the user's browser.

Each major module uses dedicated services for managing its data.

Users can export their stored CareerTrack data as a JSON backup from the Settings section.

Data is local to the current browser and device and is not synchronized between different devices or browsers.

Application Workflow

Create Profile → Add Skills → Add Job Application → Track Application Status → Schedule / Track Interviews → Analyze Skill Gap → Monitor Progress → View Analytics

Interview & Application Integration

CareerTrack separates job application tracking from interview scheduling while connecting the two modules.

A job application represents the overall recruitment process, while an interview represents a specific interview event or round.

One application can have multiple interview records because companies may conduct multiple interview rounds.

For example:

Google – Frontend Developer
Application Status: Interview
├── Technical Interview
└── HR Interview

This approach prevents multiple interview rounds from being treated as separate job applications while allowing interview information to remain connected with the related application.

Theme Support

CareerTrack supports Light Mode and Dark Mode.

The selected theme is stored in LocalStorage and applied across the application pages.

Running the Project

CareerTrack is a client-side web application and does not require a backend server.

To run locally:

1. Open the CareerTrack project in Visual Studio Code.
2. Install the Live Server extension if required.
3. Open index.html.
4. Select Open with Live Server.

The main entry point is index.html.

The project can also be hosted using GitHub Pages because it uses standard HTML, CSS, and JavaScript and does not require a build process.

Project Scope

The current version is designed as a single-user, local-first career tracking application.

The project focuses on job application management, skill tracking, skill gap analysis, interview management, career analytics, profile management, local data persistence, theme customization, and integration between application modules.

The current version does not include authentication, login/logout, a backend API, server-side database, multi-user account management, cloud synchronization, or external job-board integration.

Why CareerTrack?

Job seekers often manage applications using spreadsheets, notes, emails, calendars, and different tracking tools.

CareerTrack brings application tracking, skills, interviews, skill-gap analysis, profile information, and career analytics together in one centralized platform.

The goal is to make job-search management more organized, measurable, and easier to maintain.

Project Goals

• Centralize job-search management
• Reduce dependency on spreadsheets and scattered notes
• Track application progress
• Identify skill gaps
• Organize interview information
• Provide useful career-search analytics
• Demonstrate modular JavaScript development
• Demonstrate integration between application modules
• Provide a simple and user-friendly interface

Limitations

Because CareerTrack currently uses browser LocalStorage:

• Data is limited to the current browser and device
• Data is not synchronized between devices
• There is no user authentication
• There is no server-side backup
• Clearing browser storage can remove locally stored data

Users can export their data as a JSON backup from Settings.

Future Scope

• User authentication
• Login and logout
• Cloud database integration
• Multi-user support
• Cloud synchronization
• Resume builder
• Job recommendation system
• Job-board API integration
• Interview reminders
• Calendar integration
• Advanced career analytics
• AI-based resume analysis
• AI-based skill recommendations
• Job matching
• Progressive Web App support

Author

Vikas Gupta

MCA Student

CareerTrack was developed as an academic project focused on web programming, client-side application development, modular JavaScript architecture, data management, application integration, and user experience.

GitHub Repository

https://github.com/vikas-git10/CareerTrack

License

This project is intended for academic and educational purposes. The source code may be used for learning and reference purposes.
```
