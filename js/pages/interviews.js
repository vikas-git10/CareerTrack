// =========================================
// CareerTrack - Interviews
// =========================================


// -----------------------------------------
// Load Interviews
// -----------------------------------------

let interviews =
    getAllInterviews();


// -----------------------------------------
// DOM Elements
// -----------------------------------------

const interviewList =
    document.getElementById("interviewList");

const addInterviewBtn =
    document.getElementById("addInterviewBtn");

const interviewForm =
    document.getElementById("interviewForm");

const interviewModal =
    new bootstrap.Modal(
        document.getElementById("interviewModal")
    );

const interviewModalTitle =
    document.getElementById(
        "interviewModalTitle"
    );

const interviewSearch =
    document.getElementById(
        "interviewSearch"
    );

const interviewStatusFilter =
    document.getElementById(
        "interviewStatusFilter"
    );

const interviewTypeFilter =
    document.getElementById(
        "interviewTypeFilter"
    );


// -----------------------------------------
// Statistics Elements
// -----------------------------------------

const upcomingInterviewCount =
    document.getElementById(
        "upcomingInterviewCount"
    );

const completedInterviewCount =
    document.getElementById(
        "completedInterviewCount"
    );

const totalInterviewCount =
    document.getElementById(
        "totalInterviewCount"
    );


// -----------------------------------------
// Form Elements
// -----------------------------------------

const interviewId =
    document.getElementById(
        "interviewId"
    );

const interviewCompany =
    document.getElementById(
        "interviewCompany"
    );

const interviewPosition =
    document.getElementById(
        "interviewPosition"
    );

const interviewDate =
    document.getElementById(
        "interviewDate"
    );

const interviewTime =
    document.getElementById(
        "interviewTime"
    );

const interviewType =
    document.getElementById(
        "interviewType"
    );

const interviewMode =
    document.getElementById(
        "interviewMode"
    );

const interviewStatus =
    document.getElementById(
        "interviewStatus"
    );

const interviewLink =
    document.getElementById(
        "interviewLink"
    );

const interviewNotes =
    document.getElementById(
        "interviewNotes"
    );


// -----------------------------------------
// Reset Form
// -----------------------------------------

function resetInterviewForm() {

    interviewForm.reset();

    interviewId.value = "";

    interviewModalTitle.textContent =
        "Schedule Interview";

    interviewStatus.value =
        "Scheduled";

    interviewMode.value =
        "Online";

    interviewType.value =
        "Technical";

}


// -----------------------------------------
// Open Add Modal
// -----------------------------------------

addInterviewBtn.addEventListener(
    "click",
    () => {

        resetInterviewForm();

    }
);


// -----------------------------------------
// Save Interview
// -----------------------------------------

interviewForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const id =
            interviewId.value;


        const interviewData = {

            company:
                interviewCompany.value.trim(),

            position:
                interviewPosition.value.trim(),

            date:
                interviewDate.value,

            time:
                interviewTime.value,

            type:
                interviewType.value,

            mode:
                interviewMode.value,

            status:
                interviewStatus.value,

            link:
                interviewLink.value.trim(),

            notes:
                interviewNotes.value.trim()

        };


        // -----------------------------------------
        // Update Existing Interview
        // -----------------------------------------

        if (id) {

    const result =
        updateInterview(
            Number(id),
            interviewData
        );


    if (result && result.error) {

        alert(
            result.error
        );

        return;

    }

}


        // -----------------------------------------
        // Create New Interview
        // -----------------------------------------

        else {

    const result =
        createInterview(
            interviewData
        );


    if (result && result.error) {

        alert(
            result.error
        );

        return;

    }

}


        // Reload data

        interviews =
            getAllInterviews();


        renderInterviews();

        updateInterviewStats();


        // Close modal

        interviewModal.hide();

    }
);


// -----------------------------------------
// Render Interviews
// -----------------------------------------

function renderInterviews() {

    const search =
        interviewSearch.value
            .trim()
            .toLowerCase();


    const status =
        interviewStatusFilter.value;


    const type =
        interviewTypeFilter.value;


    let filtered =
        interviews.filter(
            interview => {


                const matchesSearch =

                    interview.company
                        .toLowerCase()
                        .includes(search)

                    ||

                    interview.position
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =

                    !status

                    ||

                    interview.status ===
                    status;


                const matchesType =

                    !type

                    ||

                    interview.type ===
                    type;


                return (
                    matchesSearch
                    &&
                    matchesStatus
                    &&
                    matchesType
                );

            }
        );


    // -----------------------------------------
    // Sort by date/time
    // -----------------------------------------

    filtered.sort(
        (a, b) => {

            const dateA =
                new Date(
                    `${a.date}T${a.time || "00:00"}`
                );

            const dateB =
                new Date(
                    `${b.date}T${b.time || "00:00"}`
                );

            return dateA - dateB;

        }
    );


    // -----------------------------------------
    // Empty State
    // -----------------------------------------

    if (
        filtered.length === 0
    ) {

        interviewList.innerHTML = `

            <div class="interview-empty">

                <h5>
                    No interviews found
                </h5>

                <p class="mb-0">
                    Schedule an interview to start
                    tracking your interview progress.
                </p>

            </div>

        `;

        return;

    }


    // -----------------------------------------
    // Render Cards
    // -----------------------------------------

    interviewList.innerHTML = "";


    filtered.forEach(
        interview => {

            const card =
                createInterviewCard(
                    interview
                );


            interviewList.appendChild(
                card
            );

        }
    );

}


// -----------------------------------------
// Create Interview Card
// -----------------------------------------

function createInterviewCard(
    interview
) {

    const card =
        document.createElement("div");


    card.className =
        "interview-card";


    const formattedDate =
        formatInterviewDate(
            interview.date
        );


    const statusClass =
        getStatusClass(
            interview.status
        );


    card.innerHTML = `

        <div class="interview-card-header">

            <div>

                <div class="interview-company">
                    ${escapeHtml(interview.company)}
                </div>

                <div class="interview-position">
                    ${escapeHtml(interview.position)}
                </div>

            </div>


            <span class="badge ${statusClass}">
                ${escapeHtml(interview.status)}
            </span>

        </div>


        <div class="interview-meta">

            <div class="interview-meta-item">
                📅 ${formattedDate}
            </div>

            <div class="interview-meta-item">
                🕐 ${escapeHtml(interview.time)}
            </div>

            <div class="interview-meta-item">
                ${escapeHtml(interview.type)}
            </div>

            <div class="interview-meta-item">
                ${escapeHtml(interview.mode)}
            </div>

        </div>


        ${
            interview.link
                ? `
                    <div class="interview-meta">

                        <div class="interview-meta-item">

                            📍
                            ${escapeHtml(interview.link)}

                        </div>

                    </div>
                  `
                : ""
        }


        ${
            interview.notes
                ? `
                    <div class="interview-notes">

                        <strong>
                            Notes:
                        </strong>

                        ${escapeHtml(interview.notes)}

                    </div>
                  `
                : ""
        }


        <div class="interview-actions">

            <button
                class="btn btn-sm btn-outline-primary edit-interview-btn"
                data-id="${interview.id}"
            >
                Edit
            </button>


            <button
                class="btn btn-sm btn-outline-danger delete-interview-btn"
                data-id="${interview.id}"
            >
                Delete
            </button>

        </div>

    `;


    // -----------------------------------------
    // Edit
    // -----------------------------------------

    card.querySelector(
        ".edit-interview-btn"
    ).addEventListener(
        "click",
        () => {

            openEditInterview(
                interview.id
            );

        }
    );


    // -----------------------------------------
    // Delete
    // -----------------------------------------

    card.querySelector(
        ".delete-interview-btn"
    ).addEventListener(
        "click",
        () => {

            handleDeleteInterview(
                interview.id
            );

        }
    );


    return card;

}


// -----------------------------------------
// Open Edit Modal
// -----------------------------------------

function openEditInterview(
    id
) {

    const interview =
        getInterviewById(
            Number(id)
        );


    if (!interview) {

        return;

    }


    interviewId.value =
        interview.id;

    interviewCompany.value =
        interview.company;

    interviewPosition.value =
        interview.position;

    interviewDate.value =
        interview.date;

    interviewTime.value =
        interview.time;

    interviewType.value =
        interview.type;

    interviewMode.value =
        interview.mode;

    interviewStatus.value =
        interview.status;

    interviewLink.value =
        interview.link;

    interviewNotes.value =
        interview.notes;


    interviewModalTitle.textContent =
        "Edit Interview";


    interviewModal.show();

}


// -----------------------------------------
// Delete Interview
// -----------------------------------------

function handleDeleteInterview(
    id
) {

    const interview =
        getInterviewById(
            Number(id)
        );


    if (!interview) {

        return;

    }


    const confirmed =
        confirm(
            `Delete the interview with ${interview.company}?`
        );


    if (!confirmed) {

        return;

    }


    deleteInterview(
        Number(id)
    );


    interviews =
        getAllInterviews();


    renderInterviews();

    updateInterviewStats();

}


// -----------------------------------------
// Update Statistics
// -----------------------------------------

function updateInterviewStats() {

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const upcoming =
        interviews.filter(
            interview => {

                if (
                    interview.status !==
                    "Scheduled"
                ) {

                    return false;

                }


                const interviewDate =
                    new Date(
                        `${interview.date}T${interview.time || "00:00"}`
                    );


                return interviewDate >= today;

            }
        ).length;


    const completed =
        interviews.filter(
            interview =>
                interview.status ===
                "Completed"
        ).length;


    upcomingInterviewCount.textContent =
        upcoming;


    completedInterviewCount.textContent =
        completed;


    totalInterviewCount.textContent =
        interviews.length;

}


// -----------------------------------------
// Format Date
// -----------------------------------------

function formatInterviewDate(
    date
) {

    if (!date) {

        return "Date not set";

    }


    const parsed =
        new Date(
            `${date}T00:00:00`
        );


    return parsed.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// -----------------------------------------
// Status Badge
// -----------------------------------------

function getStatusClass(
    status
) {

    if (
        status === "Scheduled"
    ) {

        return "bg-primary";

    }


    if (
        status === "Completed"
    ) {

        return "bg-success";

    }


    if (
        status === "Cancelled"
    ) {

        return "bg-secondary";

    }


    return "bg-primary";

}


// -----------------------------------------
// Escape HTML
// -----------------------------------------

function escapeHtml(
    value
) {

    return String(
        value || ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


// -----------------------------------------
// Filter Events
// -----------------------------------------

interviewSearch.addEventListener(
    "input",
    renderInterviews
);


interviewStatusFilter.addEventListener(
    "change",
    renderInterviews
);


interviewTypeFilter.addEventListener(
    "change",
    renderInterviews
);


// -----------------------------------------
// Initial Load
// -----------------------------------------

renderInterviews();

updateInterviewStats();