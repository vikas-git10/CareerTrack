// =========================================
// CareerTrack - Analytics
// =========================================


// -----------------------------------------
// Load Data
// -----------------------------------------

const analyticsApplications =
    ApplicationService.getAll();

const analyticsSkills =
    SkillService.getAll();


// -----------------------------------------
// DOM Elements
// -----------------------------------------

const analyticsTotalApplications =
    document.getElementById(
        "analyticsTotalApplications"
    );

const analyticsInterviewRate =
    document.getElementById(
        "analyticsInterviewRate"
    );

const analyticsOfferRate =
    document.getElementById(
        "analyticsOfferRate"
    );

const analyticsSuccessRate =
    document.getElementById(
        "analyticsSuccessRate"
    );

const analyticsSkillList =
    document.getElementById(
        "analyticsSkillList"
    );

const analyticsInsights =
    document.getElementById(
        "analyticsInsights"
    );


// -----------------------------------------
// Update Overview Cards
// -----------------------------------------

function updateAnalyticsOverview() {

    const total =
        analyticsApplications.length;


    const interviews =
        analyticsApplications.filter(
            application =>
                application.status === "Interview"
                ||
                application.status === "Technical Round"
        ).length;


    const offers =
        analyticsApplications.filter(
            application =>
                application.status === "Offer"
        ).length;


    const successfulApplications =
        analyticsApplications.filter(
            application =>
                application.status === "Offer"
                ||
                application.status === "Interview"
                ||
                application.status === "Technical Round"
        ).length;


    const interviewRate =
        total > 0
            ? Math.round(
                (interviews / total) * 100
            )
            : 0;


    const offerRate =
        total > 0
            ? Math.round(
                (offers / total) * 100
            )
            : 0;


    const successRate =
        total > 0
            ? Math.round(
                (successfulApplications / total) * 100
            )
            : 0;


    analyticsTotalApplications.textContent =
        total;


    analyticsInterviewRate.textContent =
        `${interviewRate}%`;


    analyticsOfferRate.textContent =
        `${offerRate}%`;


    analyticsSuccessRate.textContent =
        `${successRate}%`;

}


// -----------------------------------------
// Application Funnel
// -----------------------------------------

function renderApplicationFunnelChart() {

    const canvas =
        document.getElementById(
            "applicationFunnelChart"
        );


    if (!canvas) {
        return;
    }


    const statuses = [

        "Saved",

        "Applied",

        "Screening",

        "Interview",

        "Technical Round",

        "Offer"

    ];


    const counts =
        statuses.map(
            status =>
                analyticsApplications.filter(
                    application =>
                        application.status === status
                ).length
        );


    new Chart(
        canvas,
        {

            type: "bar",

            data: {

                labels: statuses,

                datasets: [

                    {

                        label:
                            "Applications",

                        data: counts,

                        borderRadius: 6

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
// Status Distribution
// -----------------------------------------

function renderAnalyticsStatusChart() {

    const canvas =
        document.getElementById(
            "analyticsStatusChart"
        );


    if (!canvas) {
        return;
    }


    const statuses = [

        "Saved",

        "Applied",

        "Screening",

        "Interview",

        "Technical Round",

        "Offer",

        "Rejected",

        "Withdrawn"

    ];


    const counts =
        statuses.map(
            status =>
                analyticsApplications.filter(
                    application =>
                        application.status === status
                ).length
        );


    new Chart(
        canvas,
        {

            type: "doughnut",

            data: {

                labels: statuses,

                datasets: [

                    {

                        data: counts,

                        borderWidth: 0

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "60%",

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
// Application Trend
// -----------------------------------------

function renderApplicationTrendChart() {

    const canvas =
        document.getElementById(
            "applicationTrendChart"
        );


    if (!canvas) {
        return;
    }


    const now =
        new Date();


    const months = [];


    for (
        let i = 5;
        i >= 0;
        i--
    ) {

        const date =
            new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );


        months.push({

            label:
                date.toLocaleString(
                    "en-IN",
                    {
                        month: "short"
                    }
                ),

            month:
                date.getMonth(),

            year:
                date.getFullYear(),

            count: 0

        });

    }


    analyticsApplications.forEach(
        application => {

            if (
                !application.appliedDate
            ) {

                return;

            }


            const date =
                new Date(
                    application.appliedDate
                );


            const month =
                months.find(
                    item =>
                        item.month ===
                        date.getMonth()
                        &&
                        item.year ===
                        date.getFullYear()
                );


            if (month) {

                month.count++;

            }

        }
    );


    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels:
                    months.map(
                        item =>
                            item.label
                    ),

                datasets: [

                    {

                        label:
                            "Applications",

                        data:
                            months.map(
                                item =>
                                    item.count
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
// Most Requested Skills
// -----------------------------------------

function renderRequestedSkills() {

    const skillCounts = {};


    analyticsApplications.forEach(
        application => {

            const requiredSkills =
                application.requiredSkills || [];


            requiredSkills.forEach(
                requiredSkill => {

                    let skillName;


                    if (
                        typeof requiredSkill ===
                        "object"
                    ) {

                        skillName =
                            requiredSkill.name;

                    }
                    else {

                        skillName =
                            requiredSkill;

                    }


                    if (!skillName) {

                        return;

                    }


                    const key =
                        skillName
                            .trim()
                            .toLowerCase();


                    if (
                        !skillCounts[key]
                    ) {

                        skillCounts[key] = {

                            name:
                                skillName.trim(),

                            count: 0

                        };

                    }


                    skillCounts[key].count++;

                }
            );

        }
    );


    const sortedSkills =
        Object.values(
            skillCounts
        )
            .sort(
                (a, b) =>
                    b.count - a.count
            )
            .slice(0, 7);


    analyticsSkillList.innerHTML =
        "";


    if (
        sortedSkills.length === 0
    ) {

        analyticsSkillList.innerHTML = `

            <div class="text-muted">

                No required skills found
                in your applications.

            </div>

        `;

        return;

    }


    const maxCount =
        sortedSkills[0].count;


    sortedSkills.forEach(
        skill => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "analytics-skill-item";


            const percentage =
                Math.round(
                    (
                        skill.count /
                        maxCount
                    ) * 100
                );


            item.innerHTML = `

                <div class="analytics-skill-header">

                    <div class="analytics-skill-name">

                        ${escapeAnalyticsHtml(
                            skill.name
                        )}

                    </div>


                    <div class="analytics-skill-count">

                        ${skill.count}
                        ${
                            skill.count === 1
                                ? "job"
                                : "jobs"
                        }

                    </div>

                </div>


                <div class="analytics-skill-bar">

                    <div
                        class="analytics-skill-bar-fill"
                        style="width: ${percentage}%"
                    ></div>

                </div>

            `;


            analyticsSkillList.appendChild(
                item
            );

        }
    );

}


// -----------------------------------------
// Key Insights
// -----------------------------------------

function renderAnalyticsInsights() {

    analyticsInsights.innerHTML =
        "";


    const total =
        analyticsApplications.length;


    if (total === 0) {

        analyticsInsights.innerHTML = `

            <div class="analytics-insight">

                <div class="analytics-insight-title">

                    Start tracking applications

                </div>

                <div class="analytics-insight-text">

                    Add job applications to generate
                    personalized analytics.

                </div>

            </div>

        `;

        return;

    }


    const interviewCount =
        analyticsApplications.filter(
            application =>
                application.status === "Interview"
                ||
                application.status === "Technical Round"
        ).length;


    const offerCount =
        analyticsApplications.filter(
            application =>
                application.status === "Offer"
        ).length;


    const rejectedCount =
        analyticsApplications.filter(
            application =>
                application.status === "Rejected"
        ).length;


    const interviewRate =
        Math.round(
            (interviewCount / total) * 100
        );


    const offerRate =
        Math.round(
            (offerCount / total) * 100
        );


    const insights = [];


    insights.push({

        title:
            "Interview Conversion",

        text:
            `${interviewRate}% of your applications have reached an interview stage.`

    });


    insights.push({

        title:
            "Offer Conversion",

        text:
            `${offerRate}% of your applications have resulted in an offer.`

    });


    if (
        rejectedCount > 0
    ) {

        insights.push({

            title:
                "Rejected Applications",

            text:
                `${rejectedCount} application${
                    rejectedCount === 1
                        ? ""
                        : "s"
                } have been rejected. Review your skill gaps and application strategy.`

        });

    }
    else {

        insights.push({

            title:
                "Keep Building Momentum",

            text:
                "Continue tracking applications and interviews to build a stronger performance history."

        });

    }


    insights.forEach(
        insight => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "analytics-insight";


            item.innerHTML = `

                <div class="analytics-insight-title">

                    ${insight.title}

                </div>


                <div class="analytics-insight-text">

                    ${insight.text}

                </div>

            `;


            analyticsInsights.appendChild(
                item
            );

        }
    );

}


// -----------------------------------------
// Escape HTML
// -----------------------------------------

function escapeAnalyticsHtml(
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
// Initialize Analytics
// -----------------------------------------

updateAnalyticsOverview();

renderApplicationFunnelChart();

renderAnalyticsStatusChart();

renderApplicationTrendChart();

renderRequestedSkills();

renderAnalyticsInsights();