// =========================================
// CareerTrack - Global Theme
// =========================================

const savedSettings =
    localStorage.getItem("careertrack_settings");

if (savedSettings) {

    try {

        const settings =
            JSON.parse(savedSettings);

        if (settings.theme === "dark") {

            document.body.classList.add("dark-mode");

        }

    } catch (error) {

        console.error(
            "Unable to load saved theme:",
            error
        );

    }

}