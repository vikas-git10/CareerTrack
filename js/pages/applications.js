// =========================================
// CareerTrack - Applications Page
// =========================================

let editingApplicationId = null;
// -----------------------------------------
// Application Data
// -----------------------------------------

let applications = ApplicationService.getAll();

if (applications.length === 0) {

    applications = [

        {
            id: Date.now() + 1,
            company: "Google",
            position: "Frontend Developer",
            location: "Bangalore",
            workMode: "Hybrid",
            jobType: "Full Time",
            appliedDate: "2026-08-25",
            priority: "High",
            status: "Interview"
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
            status: "Applied"
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
            status: "Screening"
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
            status: "Offer"
        }

    ];

    ApplicationService.saveAll(applications);

}

// -----------------------------------------
// DOM Elements
// -----------------------------------------

const applicationForm =
    document.getElementById("applicationForm");

const applicationsTableBody =
    document.getElementById("applicationsTableBody");

const applicationModalLabel =
    document.getElementById("applicationModalLabel");

const applicationSubmitBtn =
    document.getElementById("applicationSubmitBtn");

const applicationSearch =
    document.getElementById("applicationSearch");

const statusFilter =
    document.getElementById("statusFilter");

const priorityFilter =
    document.getElementById("priorityFilter");

const clearFiltersBtn =
    document.getElementById("clearFiltersBtn");

const totalApplicationsCount =
    document.getElementById(
        "totalApplicationsCount"
    );

const appliedApplicationsCount =
    document.getElementById(
        "appliedApplicationsCount"
    );

const interviewApplicationsCount =
    document.getElementById(
        "interviewApplicationsCount"
    );

const offerApplicationsCount =
    document.getElementById(
        "offerApplicationsCount"
    );


// -----------------------------------------
// Render Applications
// -----------------------------------------

function renderApplications() {

    const searchTerm =
        applicationSearch.value
            .trim()
            .toLowerCase();

    const selectedStatus =
        statusFilter.value;

    const selectedPriority =
        priorityFilter.value;


    // -----------------------------------------
    // Filter applications
    // -----------------------------------------

    const filteredApplications =
        applications.filter(application => {

            const matchesSearch =
                application.company
                    .toLowerCase()
                    .includes(searchTerm)
                ||
                application.position
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesStatus =
                selectedStatus === ""
                ||
                application.status === selectedStatus;


            const matchesPriority =
                selectedPriority === ""
                ||
                application.priority === selectedPriority;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );

        });


    // -----------------------------------------
    // Clear existing table
    // -----------------------------------------

    applicationsTableBody.innerHTML = "";


    // -----------------------------------------
    // Empty state
    // -----------------------------------------

    if (filteredApplications.length === 0) {

        applicationsTableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="text-center py-5"
                >

                    <div class="text-muted">

                        <div class="mb-2">
                            No applications found.
                        </div>

                        <small>
                            Try changing your search or filters.
                        </small>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    // -----------------------------------------
    // Render filtered applications
    // -----------------------------------------

    filteredApplications.forEach(application => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td class="company-name">
                ${application.company}
            </td>

            <td>
                ${application.position}
            </td>

            <td>
                ${application.location}
            </td>

            <td>
                ${formatDate(application.appliedDate)}
            </td>

            <td>
                ${getPriorityBadge(application.priority)}
            </td>

            <td>
                ${getStatusBadge(application.status)}
            </td>

            <td>

                <button
                    class="btn btn-sm btn-outline-primary"
                    onclick="viewApplication(${application.id})"
                >
                    View
                </button>

                <button
                    class="btn btn-sm btn-outline-secondary"
                    onclick="editApplication(${application.id})"
                >
                    Edit
                </button>

                <button
                    class="btn btn-sm btn-outline-danger"
                    onclick="deleteApplication(${application.id})"
                >
                    Delete
                </button>

            </td>

        `;


        applicationsTableBody.appendChild(row);

    });

    updateStatistics();

}

// -----------------------------------------
// Update Application Statistics
// -----------------------------------------

function updateStatistics() {

    const total =
        applications.length;


    const applied =
        applications.filter(
            application =>
                application.status === "Applied"
        ).length;


    const interviews =
        applications.filter(
            application =>
                application.status === "Interview"
                ||
                application.status === "Technical Round"
        ).length;


    const offers =
        applications.filter(
            application =>
                application.status === "Offer"
        ).length;


    totalApplicationsCount.textContent =
        total;

    appliedApplicationsCount.textContent =
        applied;

    interviewApplicationsCount.textContent =
        interviews;

    offerApplicationsCount.textContent =
        offers;

}


// -----------------------------------------
// Search Applications
// -----------------------------------------

applicationSearch.addEventListener(
    "input",
    renderApplications
);

// -----------------------------------------
// Status Filter
// -----------------------------------------

statusFilter.addEventListener(
    "change",
    renderApplications
);

// -----------------------------------------
// Priority Filter
// -----------------------------------------

priorityFilter.addEventListener(
    "change",
    renderApplications
);

// -----------------------------------------
// Clear Filters
// -----------------------------------------

clearFiltersBtn.addEventListener(
    "click",
    function() {

        applicationSearch.value = "";

        statusFilter.value = "";

        priorityFilter.value = "";

        renderApplications();

    }
);

// -----------------------------------------
// Format Date
// -----------------------------------------

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

}


// -----------------------------------------
// Priority Badge
// -----------------------------------------

function getPriorityBadge(priority) {

    const className = {

        High: "priority-high",
        Medium: "priority-medium",
        Low: "priority-low"

    }[priority];

    return `
        <span class="${className}">
            ${priority}
        </span>
    `;

}


// -----------------------------------------
// Status Badge
// -----------------------------------------

function getStatusBadge(status) {

    const statusClasses = {

        Saved: "status-pending",
        Applied: "status-applied",
        Screening: "status-pending",
        Interview: "status-interview",
        "Technical Round": "status-interview",
        Offer: "status-offer",
        Rejected: "status-pending",
        Withdrawn: "status-pending"

    };

    const className =
        statusClasses[status] || "status-pending";

    return `
        <span class="badge-status ${className}">
            ${status}
        </span>
    `;

}


// -----------------------------------------
// Add / Edit Application
// -----------------------------------------

applicationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // -----------------------------------------
    // Collect form data
    // -----------------------------------------

    const applicationData = {

        company:
            document.getElementById("company").value.trim(),

        position:
            document.getElementById("position").value.trim(),

        location:
            document.getElementById("location").value.trim(),

        workMode:
            document.getElementById("workMode").value,

        jobType:
            document.getElementById("jobType").value,

        status:
            document.getElementById("status").value,

        priority:
            document.getElementById("priority").value,

        appliedDate:
            document.getElementById("appliedDate").value,

        jobUrl:
            document.getElementById("jobUrl").value.trim(),

        notes:
            document.getElementById("notes").value.trim()

    };


    // -----------------------------------------
    // EDIT MODE
    // -----------------------------------------

    if (editingApplicationId !== null) {

        ApplicationService.update(
            editingApplicationId,
            applicationData
        );


        console.log(
            "Application updated:",
            editingApplicationId
        );

    }


    // -----------------------------------------
    // ADD MODE
    // -----------------------------------------

    else {

        const newApplication = {

            id: Date.now(),

            ...applicationData

        };


        ApplicationService.add(
            newApplication
        );


        console.log(
            "Application added:",
            newApplication
        );

    }


    // -----------------------------------------
    // Reload applications
    // -----------------------------------------

    applications =
        ApplicationService.getAll();


    // -----------------------------------------
    // Update table
    // -----------------------------------------

    renderApplications();


    // -----------------------------------------
    // Reset form
    // -----------------------------------------

    applicationForm.reset();


    // -----------------------------------------
    // Reset edit mode
    // -----------------------------------------

    editingApplicationId = null;


    // -----------------------------------------
    // Reset modal title/button
    // -----------------------------------------

    applicationModalLabel.textContent =
        "Add Job Application";

    applicationSubmitBtn.textContent =
        "Add Application";


    // -----------------------------------------
    // Close modal
    // -----------------------------------------

    const modalElement =
        document.getElementById("applicationModal");

    const modal =
        bootstrap.Modal.getInstance(
            modalElement
        );

    modal.hide();

});

// -----------------------------------------
// View Application
// -----------------------------------------

function viewApplication(id) {

    const application =
        applications.find(app => app.id === id);

    console.log("Viewing application:", application);

}


// -----------------------------------------
// Edit Application
// -----------------------------------------

function editApplication(id) {

    const application =
        ApplicationService.getById(id);


    if (!application) {

        console.error(
            "Application not found:",
            id
        );

        return;

    }


    // Store the ID of the application being edited

    editingApplicationId = id;


    // -----------------------------------------
    // Change modal title and button
    // -----------------------------------------

    applicationModalLabel.textContent =
        "Edit Job Application";

    applicationSubmitBtn.textContent =
        "Save Changes";


    // -----------------------------------------
    // Populate form
    // -----------------------------------------

    document.getElementById("company").value =
        application.company || "";

    document.getElementById("position").value =
        application.position || "";

    document.getElementById("location").value =
        application.location || "";

    document.getElementById("workMode").value =
        application.workMode || "";

    document.getElementById("jobType").value =
        application.jobType || "";

    document.getElementById("status").value =
        application.status || "";

    document.getElementById("priority").value =
        application.priority || "";

    document.getElementById("appliedDate").value =
        application.appliedDate || "";

    document.getElementById("jobUrl").value =
        application.jobUrl || "";

    document.getElementById("notes").value =
        application.notes || "";


    // -----------------------------------------
    // Open modal
    // -----------------------------------------

    const modalElement =
        document.getElementById("applicationModal");

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );

    modal.show();

}

// -----------------------------------------
// Delete Application
// -----------------------------------------

function deleteApplication(id) {

    const application =
        ApplicationService.getById(id);


    if (!application) {

        console.error(
            "Application not found:",
            id
        );

        return;

    }


    // Ask for confirmation

    const confirmed = confirm(
        `Are you sure you want to delete the application for ${application.company}?`
    );


    if (!confirmed) {
        return;
    }


    // Delete from LocalStorage

    ApplicationService.delete(id);


    // Reload applications

    applications =
        ApplicationService.getAll();


    // Update table

    renderApplications();


    console.log(
        "Application deleted:",
        application
    );

}

// -----------------------------------------
// Initial Render
// -----------------------------------------

renderApplications();