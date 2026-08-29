// =========================================
// CareerTrack - Application Service
// =========================================

const APPLICATIONS_KEY = "careertrack_applications";


const ApplicationService = {

    // -----------------------------------------
    // Initialize Demo Data
    // -----------------------------------------

    initialize() {

        const existingApplications =
            StorageService.get(APPLICATIONS_KEY);

        // If applications already exist,
        // do nothing.

        if (
            existingApplications &&
            existingApplications.length > 0
        ) {
            return;
        }


        // -----------------------------------------
        // Demo Applications
        // -----------------------------------------

        const demoApplications = [

            {
                id: Date.now() + 1,
                company: "Google",
                position: "Frontend Developer",
                location: "Bangalore",
                workMode: "Hybrid",
                jobType: "Full Time",
                appliedDate: "2026-08-25",
                priority: "High",
                status: "Interview",

                requiredSkills: [
                    {
                        name: "HTML",
                        level: "Advanced"
                    },
                    {
                        name: "CSS",
                        level: "Advanced"
                    },
                    {
                        name: "JavaScript",
                        level: "Advanced"
                    },
                    {
                        name: "Angular",
                        level: "Intermediate"
                    }
                ]
            },


            {
                id: Date.now() + 2,
                company: "Microsoft",
                position: "Web Developer",
                location: "Hyderabad",
                workMode: "Hybrid",
                jobType: "Full Time",
                appliedDate: "2026-08-23",
                priority: "Medium",
                status: "Applied",

                requiredSkills: []
            },


            {
                id: Date.now() + 3,
                company: "Infosys",
                position: "Angular Developer",
                location: "Pune",
                workMode: "On-site",
                jobType: "Full Time",
                appliedDate: "2026-08-20",
                priority: "High",
                status: "Screening",

                requiredSkills: []
            },


            {
                id: Date.now() + 4,
                company: "TCS",
                position: "Frontend Engineer",
                location: "Mumbai",
                workMode: "Hybrid",
                jobType: "Full Time",
                appliedDate: "2026-08-18",
                priority: "Low",
                status: "Offer",

                requiredSkills: []
            }

        ];


        this.saveAll(
            demoApplications
        );

    },


    // -----------------------------------------
    // Get all applications
    // -----------------------------------------

    getAll() {

        const applications =
            StorageService.get(APPLICATIONS_KEY);

        return applications || [];

    },


    // -----------------------------------------
    // Save all applications
    // -----------------------------------------

    saveAll(applications) {

        StorageService.save(
            APPLICATIONS_KEY,
            applications
        );

    },


    // -----------------------------------------
    // Add application
    // -----------------------------------------

    add(application) {

        const applications =
            this.getAll();

        applications.push(application);

        this.saveAll(applications);

        return application;

    },


    // -----------------------------------------
    // Find application
    // -----------------------------------------

    getById(id) {

        const applications =
            this.getAll();

        return applications.find(
            application =>
                application.id === id
        );

    },


    // -----------------------------------------
    // Update application
    // -----------------------------------------

    update(id, updatedApplication) {

        const applications =
            this.getAll();

        const index =
            applications.findIndex(
                application =>
                    application.id === id
            );

        if (index === -1) {
            return false;
        }

        applications[index] = {

            ...applications[index],

            ...updatedApplication

        };

        this.saveAll(
            applications
        );

        return applications[index];

    },


    // -----------------------------------------
    // Delete application
    // -----------------------------------------

    delete(id) {

        const applications =
            this.getAll();

        const updatedApplications =
            applications.filter(
                application =>
                    application.id !== id
            );

        this.saveAll(
            updatedApplications
        );

    }

};