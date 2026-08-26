// =========================================
// CareerTrack - Storage Service
// =========================================

const StorageService = {

    // -----------------------------------------
    // Save data
    // -----------------------------------------

    save(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    },


    // -----------------------------------------
    // Get data
    // -----------------------------------------

    get(key) {

        const data =
            localStorage.getItem(key);

        if (!data) {
            return null;
        }

        try {

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "Error reading localStorage:",
                error
            );

            return null;

        }

    },


    // -----------------------------------------
    // Remove data
    // -----------------------------------------

    remove(key) {

        localStorage.removeItem(key);

    },


    // -----------------------------------------
    // Clear all CareerTrack data
    // -----------------------------------------

    clear() {

        localStorage.clear();

    }

};