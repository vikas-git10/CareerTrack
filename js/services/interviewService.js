// =========================================
// CareerTrack - Interview Service
// =========================================


// -----------------------------------------
// Storage Key
// -----------------------------------------

const INTERVIEW_STORAGE_KEY =
    "careertrack_interviews";


// -----------------------------------------
// Get All Interviews
// -----------------------------------------

function getAllInterviews() {

    const data =
        localStorage.getItem(
            INTERVIEW_STORAGE_KEY
        );

    return data
        ? JSON.parse(data)
        : [];

}


// -----------------------------------------
// Save All Interviews
// -----------------------------------------

function saveAllInterviews(
    interviews
) {

    localStorage.setItem(
        INTERVIEW_STORAGE_KEY,
        JSON.stringify(interviews)
    );

}


// -----------------------------------------
// Create Interview
// -----------------------------------------

function createInterview(
    interview
) {

    const interviews =
        getAllInterviews();

    // -----------------------------------------
// Prevent Duplicate Interview
// -----------------------------------------

const duplicate =
    interviews.some(existingInterview =>

        existingInterview.company
            .trim()
            .toLowerCase() ===
        (interview.company || "")
            .trim()
            .toLowerCase()

        &&

        existingInterview.position
            .trim()
            .toLowerCase() ===
        (interview.position || "")
            .trim()
            .toLowerCase()

        &&

        existingInterview.date ===
        (interview.date || "")

        &&

        existingInterview.time ===
        (interview.time || "")

    );


if (duplicate) {

    return {
        error:
            "An interview with the same company, position, date and time already exists."
    };

}


    const newInterview = {

        id: Date.now(),

        applicationId:
            interview.applicationId || null,

        company:
            interview.company || "",

        position:
            interview.position || "",

        date:
            interview.date || "",

        time:
            interview.time || "",

        type:
            interview.type || "Technical",

        mode:
            interview.mode || "Online",

        status:
            interview.status || "Scheduled",

        link:
            interview.link || "",

        notes:
            interview.notes || "",

        createdAt:
            new Date().toISOString()

    };


    interviews.push(
        newInterview
    );


    saveAllInterviews(
        interviews
    );


    return newInterview;

}


// -----------------------------------------
// Update Interview
// -----------------------------------------

function updateInterview(
    id,
    updatedData
) {

    const interviews =
        getAllInterviews();

    // -----------------------------------------
// Prevent Duplicate During Edit
// -----------------------------------------

const duplicate =
    interviews.some(existingInterview =>

        existingInterview.id !== id

        &&

        existingInterview.company
            .trim()
            .toLowerCase() ===
        (updatedData.company || "")
            .trim()
            .toLowerCase()

        &&

        existingInterview.position
            .trim()
            .toLowerCase() ===
        (updatedData.position || "")
            .trim()
            .toLowerCase()

        &&

        existingInterview.date ===
        (updatedData.date || "")

        &&

        existingInterview.time ===
        (updatedData.time || "")

    );


if (duplicate) {

    return {
        error:
            "Another interview with the same company, position, date and time already exists."
    };

}


    const index =
        interviews.findIndex(
            interview =>
                interview.id === id
        );


    if (index === -1) {

        return null;

    }


    interviews[index] = {

        ...interviews[index],

        ...updatedData,

        id: id

    };


    saveAllInterviews(
        interviews
    );


    return interviews[index];

}


// -----------------------------------------
// Delete Interview
// -----------------------------------------

function deleteInterview(
    id
) {

    const interviews =
        getAllInterviews();


    const filtered =
        interviews.filter(
            interview =>
                interview.id !== id
        );


    saveAllInterviews(
        filtered
    );

}


// -----------------------------------------
// Get Interview By ID
// -----------------------------------------

function getInterviewById(
    id
) {

    const interviews =
        getAllInterviews();


    return interviews.find(
        interview =>
            interview.id === id
    );

}