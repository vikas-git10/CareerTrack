// =========================================
// CareerTrack - Dashboard
// =========================================

// -----------------------------------------
// Initialize Application Data
// -----------------------------------------

ApplicationService.initialize();

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

const dashboardTotalSkills =
    document.getElementById(
        "dashboardTotalSkills"
    );

const dashboardAdvancedSkills =
    document.getElementById(
        "dashboardAdvancedSkills"
    );

const dashboardIntermediateSkills =
    document.getElementById(
        "dashboardIntermediateSkills"
    );

const dashboardBeginnerSkills =
    document.getElementById(
        "dashboardBeginnerSkills"
    );

const dashboardTopSkills =
    document.getElementById(
        "dashboardTopSkills"
    );

const dashboardAverageMatch =
    document.getElementById(
        "dashboardAverageMatch"
    );

const dashboardStrongMatches =
    document.getElementById(
        "dashboardStrongMatches"
    );

const dashboardImproveMatches =
    document.getElementById(
        "dashboardImproveMatches"
    );

const dashboardMissingMatches =
    document.getElementById(
        "dashboardMissingMatches"
    );

const dashboardSkillGaps =
    document.getElementById(
        "dashboardSkillGaps"
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
        getAllInterviews().length;


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
// Update Skills Overview
// -----------------------------------------

function updateSkillsOverview() {

    // -----------------------------------------
    // Total Skills
    // -----------------------------------------

    dashboardTotalSkills.textContent =
        skills.length;


    // -----------------------------------------
    // Skill Levels
    // -----------------------------------------

    const advancedCount =
        skills.filter(
            skill =>
                skill.currentLevel === "Advanced"
                ||
                skill.currentLevel === "Expert"
        ).length;


    const intermediateCount =
        skills.filter(
            skill =>
                skill.currentLevel === "Intermediate"
        ).length;


    const beginnerCount =
        skills.filter(
            skill =>
                skill.currentLevel === "Beginner"
        ).length;


    dashboardAdvancedSkills.textContent =
        advancedCount;


    dashboardIntermediateSkills.textContent =
        intermediateCount;


    dashboardBeginnerSkills.textContent =
        beginnerCount;


    // -----------------------------------------
    // Render Top Skills
    // -----------------------------------------

    renderDashboardTopSkills();

}

// -----------------------------------------
// Update Career Readiness
// -----------------------------------------

function updateCareerReadiness() {

    const applicationsWithSkills =
        applications.filter(
            application =>
                application.requiredSkills &&
                application.requiredSkills.length > 0
        );


    // -----------------------------------------
    // No analyzable applications
    // -----------------------------------------

    if (
        applicationsWithSkills.length === 0
    ) {

        dashboardAverageMatch.textContent =
            "0%";

        dashboardStrongMatches.textContent =
            "0";

        dashboardImproveMatches.textContent =
            "0";

        dashboardMissingMatches.textContent =
            "0";

        dashboardSkillGaps.innerHTML = `

            <div class="text-muted py-3">

                Add required skills to your
                applications to see skill gaps.

            </div>

        `;

        return;

    }


    // -----------------------------------------
    // Analyze all applications
    // -----------------------------------------

    const analyses =
        applicationsWithSkills.map(
            application =>
                analyzeApplicationSkills(
                    application,
                    skills
                )
        );


    // -----------------------------------------
    // Average match
    // -----------------------------------------

    const totalMatch =
        analyses.reduce(
            (total, analysis) =>
                total +
                analysis.matchScore,
            0
        );


    const averageMatch =
        Math.round(
            totalMatch /
            analyses.length
        );


    dashboardAverageMatch.textContent =
        `${averageMatch}%`;


    // -----------------------------------------
    // Summary counts
    // -----------------------------------------

    const strongMatches =
        analyses.reduce(
            (total, analysis) =>
                total +
                analysis.strongCount,
            0
        );


    const improveMatches =
        analyses.reduce(
            (total, analysis) =>
                total +
                analysis.improveCount,
            0
        );


    const missingMatches =
        analyses.reduce(
            (total, analysis) =>
                total +
                analysis.missingCount,
            0
        );


    dashboardStrongMatches.textContent =
        strongMatches;


    dashboardImproveMatches.textContent =
        improveMatches;


    dashboardMissingMatches.textContent =
        missingMatches;


    // -----------------------------------------
    // Collect skill gaps
    // -----------------------------------------

    const skillGaps = [];


    analyses.forEach(
        analysis => {

            analysis.results.forEach(
                result => {

                    if (
                        result.status === "missing"
                        ||
                        result.status === "improve"
                    ) {

                        skillGaps.push(result);

                    }

                }
            );

        }
    );


    renderDashboardSkillGaps(
        skillGaps
    );

}

// -----------------------------------------
// Render Dashboard Skill Gaps
// -----------------------------------------

function renderDashboardSkillGaps(
    skillGaps
) {

    dashboardSkillGaps.innerHTML = "";


    if (skillGaps.length === 0) {

        dashboardSkillGaps.innerHTML = `

            <div class="text-muted py-3">

                No skill gaps found.
                Your current skills match
                the tracked requirements.

            </div>

        `;

        return;

    }


    // -----------------------------------------
    // Remove duplicate skills
    // -----------------------------------------

    const uniqueGaps = [];


    skillGaps.forEach(gap => {

        const existing =
            uniqueGaps.find(
                item =>
                    item.skill.toLowerCase() ===
                    gap.skill.toLowerCase()
            );


        if (!existing) {

            uniqueGaps.push(gap);

        }

    });


    // -----------------------------------------
    // Show top 5
    // -----------------------------------------

    uniqueGaps
        .slice(0, 5)
        .forEach(gap => {

            const item =
                document.createElement("div");


            item.className =
                "dashboard-skill-gap";


            const statusLabel =
                gap.status === "missing"
                    ? "Missing"
                    : "Needs Improvement";


            item.innerHTML = `

                <div>

                    <div class="dashboard-skill-gap-name">
                        ${gap.skill}
                    </div>

                    <div class="dashboard-skill-gap-level">

                        Your:
                        ${gap.currentLevel}

                        →

                        Required:
                        ${gap.requiredLevel}

                    </div>

                </div>


                <div
                    class="dashboard-skill-gap-status"
                >

                    ${statusLabel}

                </div>

            `;


            dashboardSkillGaps.appendChild(
                item
            );

        });

}

// -----------------------------------------
// Render Top Skills
// -----------------------------------------

function renderDashboardTopSkills() {

    dashboardTopSkills.innerHTML = "";


    if (skills.length === 0) {

        dashboardTopSkills.innerHTML = `

            <div class="text-muted py-3">

                No skills added yet.

            </div>

        `;

        return;

    }


    const levelValues = {

        Beginner: 1,

        Basic: 2,

        Intermediate: 3,

        Advanced: 4,

        Expert: 5

    };


    const topSkills =
        [...skills]
            .sort(
                (a, b) =>
                    (
                        levelValues[b.currentLevel] || 0
                    )
                    -
                    (
                        levelValues[a.currentLevel] || 0
                    )
            )
            .slice(0, 5);


    topSkills.forEach(skill => {

        const item =
            document.createElement("div");


        item.className =
            "dashboard-skill-item";


        item.innerHTML = `

            <div>

                <div class="dashboard-skill-name">
                    ${skill.name}
                </div>

                <div class="dashboard-skill-category">
                    ${skill.category}
                </div>

            </div>


            <div class="dashboard-skill-level">

                ${skill.currentLevel}

            </div>

        `;


        dashboardTopSkills.appendChild(
            item
        );

    });

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

updateSkillsOverview();

updateCareerReadiness();