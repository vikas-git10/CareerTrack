// =========================================
// CareerTrack - Applications Page
// =========================================


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


// -----------------------------------------
// Render Applications
// -----------------------------------------

function renderApplications() {

    applicationsTableBody.innerHTML = "";

    applications.forEach(application => {

        const row = document.createElement("tr");

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

}


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
// Add Application
// -----------------------------------------

applicationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Create new application object

    const newApplication = {

        id: Date.now(),

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
    // Save to LocalStorage
    // -----------------------------------------

    ApplicationService.add(newApplication);


    // -----------------------------------------
    // Reload applications from LocalStorage
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
    // Close modal
    // -----------------------------------------

    const modalElement =
        document.getElementById("applicationModal");

    const modal =
        bootstrap.Modal.getInstance(modalElement);

    modal.hide();


    console.log(
        "Application added:",
        newApplication
    );

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
        applications.find(app => app.id === id);

    console.log("Editing application:", application);

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