// =========================================
// CareerTrack - Settings
// =========================================


const SETTINGS_KEY =
    "careertrack_settings";


// -----------------------------------------
// DOM Elements
// -----------------------------------------

const themeSetting =
    document.getElementById(
        "themeSetting"
    );


const notificationSetting =
    document.getElementById(
        "notificationSetting"
    );


const exportDataBtn =
    document.getElementById(
        "exportDataBtn"
    );


const clearDataBtn =
    document.getElementById(
        "clearDataBtn"
    );


const settingsMessage =
    document.getElementById(
        "settingsMessage"
    );


// -----------------------------------------
// Load Settings
// -----------------------------------------

function loadSettings() {

    const settings =
        StorageService.get(
            SETTINGS_KEY
        );


    if (!settings) {

        themeSetting.value =
            "light";

        notificationSetting.checked =
            false;

        return;

    }


    themeSetting.value =
        settings.theme || "light";


    notificationSetting.checked =
        settings.notifications === true;

}


// -----------------------------------------
// Save Settings
// -----------------------------------------

function saveSettings() {

    const settings = {

        theme:
            themeSetting.value,

        notifications:
            notificationSetting.checked

    };


    StorageService.save(
        SETTINGS_KEY,
        settings
    );


    applyTheme(
        settings.theme
    );


    showMessage(
        "Settings saved successfully."
    );

}


// -----------------------------------------
// Apply Theme
// -----------------------------------------

function applyTheme(
    theme
) {

    if (
        theme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    }
    else {

        document.body.classList.remove(
            "dark-mode"
        );

    }

}


// -----------------------------------------
// Show Message
// -----------------------------------------

function showMessage(
    message
) {

    settingsMessage.textContent =
        message;


    setTimeout(
        () => {

            settingsMessage.textContent =
                "";

        },
        3000
    );

}


// -----------------------------------------
// Export Data
// -----------------------------------------

function exportData() {

    const data = {

        applications:
            StorageService.get(
                "careertrack_applications"
            ) || [],

        skills:
            StorageService.get(
                "careertrack_skills"
            ) || [],

        interviews:
            StorageService.get(
                "careertrack_interviews"
            ) || [],

        profile:
            StorageService.get(
                "careertrack_profile"
            ) || {},

        settings:
            StorageService.get(
                SETTINGS_KEY
            ) || {}

    };


    const json =
        JSON.stringify(
            data,
            null,
            2
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "careertrack-backup.json";


    link.click();


    URL.revokeObjectURL(
        url
    );


    showMessage(
        "Data exported successfully."
    );

}


// -----------------------------------------
// Clear All Data
// -----------------------------------------

function clearAllData() {

    const confirmed =
        confirm(
            "This will permanently delete your applications, skills, interviews, profile and settings. Continue?"
        );


    if (!confirmed) {

        return;

    }


    StorageService.clear();


    showMessage(
        "All CareerTrack data has been cleared."
    );


    setTimeout(
        () => {

            window.location.reload();

        },
        1000
    );

}


// -----------------------------------------
// Event Listeners
// -----------------------------------------

themeSetting.addEventListener(
    "change",
    saveSettings
);


notificationSetting.addEventListener(
    "change",
    saveSettings
);


exportDataBtn.addEventListener(
    "click",
    exportData
);


clearDataBtn.addEventListener(
    "click",
    clearAllData
);


// -----------------------------------------
// Initialize
// -----------------------------------------

loadSettings();


applyTheme(
    themeSetting.value
);