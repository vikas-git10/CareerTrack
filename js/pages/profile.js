// =========================================
// CareerTrack - Profile
// =========================================


const PROFILE_KEY =
    "careertrack_profile";


// -----------------------------------------
// DOM Elements
// -----------------------------------------

const profileForm =
    document.getElementById(
        "profileForm"
    );


const profileName =
    document.getElementById(
        "profileName"
    );


const profileEmail =
    document.getElementById(
        "profileEmail"
    );


const profilePhone =
    document.getElementById(
        "profilePhone"
    );


const profileLocation =
    document.getElementById(
        "profileLocation"
    );


const profileTargetRole =
    document.getElementById(
        "profileTargetRole"
    );


const profileExperience =
    document.getElementById(
        "profileExperience"
    );


const profileBio =
    document.getElementById(
        "profileBio"
    );


const profileSaveMessage =
    document.getElementById(
        "profileSaveMessage"
    );


// -----------------------------------------
// Summary Elements
// -----------------------------------------

const summaryName =
    document.getElementById(
        "summaryName"
    );


const summaryRole =
    document.getElementById(
        "summaryRole"
    );


const summaryEmail =
    document.getElementById(
        "summaryEmail"
    );


const summaryLocation =
    document.getElementById(
        "summaryLocation"
    );


const summaryExperience =
    document.getElementById(
        "summaryExperience"
    );


// -----------------------------------------
// Load Profile
// -----------------------------------------

function loadProfile() {

    const profile =
        StorageService.get(
            PROFILE_KEY
        );


    if (!profile) {

        updateProfileSummary();

        return;

    }


    profileName.value =
        profile.name || "";


    profileEmail.value =
        profile.email || "";


    profilePhone.value =
        profile.phone || "";


    profileLocation.value =
        profile.location || "";


    profileTargetRole.value =
        profile.targetRole || "";


    profileExperience.value =
        profile.experience || "";


    profileBio.value =
        profile.bio || "";


    updateProfileSummary();

}


// -----------------------------------------
// Save Profile
// -----------------------------------------

profileForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const profile = {

            name:
                profileName.value.trim(),

            email:
                profileEmail.value.trim(),

            phone:
                profilePhone.value.trim(),

            location:
                profileLocation.value.trim(),

            targetRole:
                profileTargetRole.value.trim(),

            experience:
                profileExperience.value,

            bio:
                profileBio.value.trim()

        };


        StorageService.save(
            PROFILE_KEY,
            profile
        );


        updateProfileSummary();


        profileSaveMessage.textContent =
            "Profile saved successfully.";


        setTimeout(
            () => {

                profileSaveMessage.textContent =
                    "";

            },
            3000
        );

    }
);


// -----------------------------------------
// Update Summary
// -----------------------------------------

function updateProfileSummary() {

    const name =
        profileName.value.trim();


    const email =
        profileEmail.value.trim();


    const location =
        profileLocation.value.trim();


    const targetRole =
        profileTargetRole.value.trim();


    const experience =
        profileExperience.value;


    summaryName.textContent =
        name || "Vikas";


    summaryRole.textContent =
        targetRole ||
        "Target role not set";


    summaryEmail.textContent =
        email ||
        "Not set";


    summaryLocation.textContent =
        location ||
        "Not set";


    summaryExperience.textContent =
        experience ||
        "Not set";

}


// -----------------------------------------
// Initial Load
// -----------------------------------------

loadProfile();