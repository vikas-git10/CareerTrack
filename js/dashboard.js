// =========================================
// CareerTrack - Dashboard
// =========================================


// -----------------------------------------
// Load Data
// -----------------------------------------

const applications =
    ApplicationService.getAll();

const skills =
    SkillService.getAll();


// -----------------------------------------
// DOM Elements
// -----------------------------------------

const dashboardTotalApplications =
    document.getElementById(
        "dashboardTotalApplications"
    );

const dashboardInterviews =
    document.getElementById(
        "dashboardInterviews"
    );

const dashboardPending =
    document.getElementById(
        "dashboardPending"
    );

const dashboardOffers =
    document.getElementById(
        "dashboardOffers"
    );

const recentApplicationsBody =
    document.getElementById(
        "recentApplicationsBody"
    );


// -----------------------------------------
// Update Statistics
// -----------------------------------------

function updateDashboardStatistics() {


    // Total Applications

    dashboardTotalApplications.textContent =
        applications.length;


    // Interviews

    const interviewCount =
        applications.filter(
            application =>
                application.status === "Interview"
                ||
                application.status === "Technical Round"
        ).length;


    dashboardInterviews.textContent =
        interviewCount;


    // Pending

    const pendingCount =
        applications.filter(
            application =>
                application.status === "Applied"
                ||
                application.status === "Pending"
        ).length;


    dashboardPending.textContent =
        pendingCount;


    // Offers

    const offerCount =
        applications.filter(
            application =>
                application.status === "Offer"
        ).length;


    dashboardOffers.textContent =
        offerCount;

}


// -----------------------------------------
// Render Recent Applications
// -----------------------------------------

function renderRecentApplications() {

    recentApplicationsBody.innerHTML = "";


    if (applications.length === 0) {

        recentApplicationsBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-muted py-4"
                >
                    No applications added yet.
                </td>

            </tr>

        `;

        return;

    }


    // Show latest 5 applications

    const recentApplications =
        [...applications]
            .sort(
                (a, b) =>
                    new Date(
                        b.appliedDate || 0
                    )
                    -
                    new Date(
                        a.appliedDate || 0
                    )
            )
            .slice(0, 5);


    recentApplications.forEach(
        application => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td class="company-name">
                    ${application.company || "-"}
                </td>

                <td>
                    ${application.position || "-"}
                </td>

                <td>
                    ${application.location || "-"}
                </td>

                <td>
                    ${formatDate(
                        application.appliedDate
                    )}
                </td>

                <td>
                    ${getStatusBadge(
                        application.status
                    )}
                </td>

            `;


            recentApplicationsBody.appendChild(
                row
            );

        }
    );

}


// -----------------------------------------
// Format Date
// -----------------------------------------

function formatDate(dateValue) {

    if (!dateValue) {
        return "-";
    }


    const date =
        new Date(dateValue);


    if (isNaN(date)) {
        return "-";
    }


    return date.toLocaleDateString(
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

function getStatusBadge(status) {

    const statusClasses = {

        Applied: "status-applied",

        Pending: "status-pending",

        Interview: "status-interview",

        "Technical Round":
            "status-interview",

        Offer: "status-offer",

        Rejected: "status-rejected"

    };


    const badgeClass =
        statusClasses[status]
        ||
        "status-pending";


    return `

        <span
            class="badge-status ${badgeClass}"
        >
            ${status || "Unknown"}
        </span>

    `;

}


// -----------------------------------------
// Initial Dashboard Load
// -----------------------------------------

updateDashboardStatistics();

renderRecentApplications();

// -----------------------------------------
// Application Analytics Chart
// -----------------------------------------

function renderApplicationChart() {

    const canvas =
        document.getElementById(
            "applicationChart"
        );


    if (!canvas) {
        return;
    }


    // -----------------------------------------
    // Prepare last 6 months
    // -----------------------------------------

    const now =
        new Date();


    const months = [];


    for (let i = 5; i >= 0; i--) {

        const date =
            new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );


        months.push({

            month:
                date.toLocaleString(
                    "en-IN",
                    {
                        month: "short"
                    }
                ),

            monthNumber:
                date.getMonth(),

            year:
                date.getFullYear(),

            count: 0

        });

    }


    // -----------------------------------------
    // Count applications
    // -----------------------------------------

    applications.forEach(
        application => {

            if (!application.appliedDate) {
                return;
            }


            const date =
                new Date(
                    application.appliedDate
                );


            const matchingMonth =
                months.find(
                    item =>
                        item.monthNumber ===
                        date.getMonth()
                        &&
                        item.year ===
                        date.getFullYear()
                );


            if (matchingMonth) {

                matchingMonth.count++;

            }

        }
    );


    // -----------------------------------------
    // Create chart
    // -----------------------------------------

    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels:
                    months.map(
                        item => item.month
                    ),

                datasets: [

                    {

                        label:
                            "Applications",

                        data:
                            months.map(
                                item => item.count
                            ),

                        tension: 0.3,

                        fill: true

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            precision: 0

                        }

                    }

                }

            }

        }
    );

}

// -----------------------------------------
// Render Chart
// -----------------------------------------

renderApplicationChart();

// -----------------------------------------
// Application Status Chart
// -----------------------------------------

function renderApplicationStatusChart() {

    const canvas =
        document.getElementById(
            "applicationStatusChart"
        );


    if (!canvas) {
        return;
    }


    // -----------------------------------------
    // Count application statuses
    // -----------------------------------------

    const statusCounts = {

        Applied: 0,

        Pending: 0,

        Interview: 0,

        "Technical Round": 0,

        Offer: 0,

        Rejected: 0

    };


    applications.forEach(
        application => {

            const status =
                application.status;


            if (
                Object.prototype.hasOwnProperty.call(
                    statusCounts,
                    status
                )
            ) {

                statusCounts[status]++;

            }

        }
    );


    // -----------------------------------------
    // Create chart
    // -----------------------------------------

    new Chart(
        canvas,
        {

            type: "doughnut",

            data: {

                labels:
                    Object.keys(
                        statusCounts
                    ),

                datasets: [

                    {

                        data:
                            Object.values(
                                statusCounts
                            ),

                        borderWidth: 0

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "65%",

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }
    );

}


// -----------------------------------------
// Render Status Chart
// -----------------------------------------

renderApplicationStatusChart();