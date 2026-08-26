// =========================================
// CareerTrack - Skill Gap Analyzer
// =========================================


// -----------------------------------------
// Load Data
// -----------------------------------------

let applications =
    ApplicationService.getAll();

let skills =
    SkillService.getAll();


// -----------------------------------------
// DOM Elements
// -----------------------------------------

const jobSelect =
    document.getElementById("jobSelect");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const skillGapEmpty =
    document.getElementById("skillGapEmpty");

const skillGapResults =
    document.getElementById("skillGapResults");


// -----------------------------------------
// Populate Job Dropdown
// -----------------------------------------

function populateJobSelect() {

    jobSelect.innerHTML = `

        <option value="">
            Select an application
        </option>

    `;


    applications.forEach(application => {

        const option =
            document.createElement("option");


        option.value =
            application.id;


        option.textContent =
            `${application.company} — ${application.position}`;


        jobSelect.appendChild(option);

    });

}


// -----------------------------------------
// Analyze Skill Gap
// -----------------------------------------

function analyzeSkillGap() {

    const selectedApplicationId =
        Number(jobSelect.value);


    if (!selectedApplicationId) {

        alert(
            "Please select a job application."
        );

        return;

    }


    const application =
        applications.find(
            app =>
                app.id ===
                selectedApplicationId
        );


    if (!application) {

        alert(
            "Application not found."
        );

        return;

    }


    // -----------------------------------------
    // Use Skill Gap Service
    // -----------------------------------------

    const analysis =
        analyzeApplicationSkills(
            application,
            skills
        );


    if (analysis.results.length === 0) {

        alert(
            "This application does not have any required skills."
        );

        return;

    }


    renderAnalysis(
        application,
        analysis
    );

}


// -----------------------------------------
// Render Analysis
// -----------------------------------------

function renderAnalysis(
    application,
    analysis
) {

    const results =
        analysis.results;


    // -----------------------------------------
    // Show Results
    // -----------------------------------------

    skillGapEmpty.classList.add(
        "d-none"
    );

    skillGapResults.classList.remove(
        "d-none"
    );


    // -----------------------------------------
    // Job Information
    // -----------------------------------------

    document.getElementById(
        "resultCompany"
    ).textContent =
        application.company;


    document.getElementById(
        "resultPosition"
    ).textContent =
        application.position;


    document.getElementById(
        "resultLocation"
    ).textContent =
        application.location ||
        "Location not specified";


    // -----------------------------------------
    // Summary Counts
    // -----------------------------------------

    document.getElementById(
        "strongSkillsCount"
    ).textContent =
        analysis.strongCount;


    document.getElementById(
        "improveSkillsCount"
    ).textContent =
        analysis.improveCount;


    document.getElementById(
        "missingSkillsCount"
    ).textContent =
        analysis.missingCount;


    // -----------------------------------------
    // Match Score
    // -----------------------------------------

    document.getElementById(
        "matchScore"
    ).textContent =
        `${analysis.matchScore}%`;


    // -----------------------------------------
    // Render Skill Comparison
    // -----------------------------------------

    renderSkillComparison(
        results
    );

}


// -----------------------------------------
// Render Skill Comparison
// -----------------------------------------

function renderSkillComparison(
    results
) {

    const container =
        document.getElementById(
            "skillComparisonContainer"
        );


    container.innerHTML = "";


    results.forEach(result => {


        // -----------------------------------------
        // Status
        // -----------------------------------------

        let statusLabel;

        let statusClass;


        if (
            result.status === "strong"
        ) {

            statusLabel =
                "Strong";

            statusClass =
                "comparison-status-strong";

        }
        else if (
            result.status === "improve"
        ) {

            statusLabel =
                "Needs Improvement";

            statusClass =
                "comparison-status-improve";

        }
        else {

            statusLabel =
                "Missing";

            statusClass =
                "comparison-status-missing";

        }


        // -----------------------------------------
        // Level Values
        // -----------------------------------------

        const levelValues = {

            Beginner: 1,

            Basic: 2,

            Intermediate: 3,

            Advanced: 4,

            Expert: 5

        };


        const currentValue =
            levelValues[
                result.currentLevel
            ] || 0;


        const requiredValue =
            levelValues[
                result.requiredLevel
            ] || 1;


        const progress =
            result.status === "missing"

                ? 0

                : Math.min(
                    (
                        currentValue /
                        requiredValue
                    ) * 100,
                    100
                );


        // -----------------------------------------
        // Create Item
        // -----------------------------------------

        const item =
            document.createElement("div");


        item.className =
            "skill-comparison-item";


        item.innerHTML = `

            <div class="skill-comparison-header">

                <div class="comparison-skill-name">

                    ${result.skill}

                </div>


                <div
                    class="comparison-status ${statusClass}"
                >

                    ${statusLabel}

                </div>

            </div>


            <div class="comparison-levels">

                <span>

                    Your Level:

                    <strong>
                        ${result.currentLevel}
                    </strong>

                </span>


                <span>

                    Required:

                    <strong>
                        ${result.requiredLevel}
                    </strong>

                </span>

            </div>


            <div class="comparison-progress">

                <div
                    class="comparison-progress-bar"
                    style="width: ${progress}%"
                ></div>

            </div>

        `;


        container.appendChild(
            item
        );

    });

}


// -----------------------------------------
// Initial Page Setup
// -----------------------------------------

populateJobSelect();


// -----------------------------------------
// Analyze Button
// -----------------------------------------

analyzeBtn.addEventListener(
    "click",
    analyzeSkillGap
);