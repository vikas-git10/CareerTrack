// =========================================
// CareerTrack - Application Service
// =========================================

const APPLICATIONS_KEY = "careertrack_applications";


const ApplicationService = {

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
            application => application.id === id
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
                application => application.id === id
            );

        if (index === -1) {
            return false;
        }

        applications[index] = {
            ...applications[index],
            ...updatedApplication
        };

        this.saveAll(applications);

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
                application => application.id !== id
            );

        this.saveAll(updatedApplications);

    }

};