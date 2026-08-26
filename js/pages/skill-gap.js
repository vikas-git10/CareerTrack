// =========================================
// CareerTrack - Skill Gap Analyzer
// =========================================


// -----------------------------------------
// State
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
// Populate Job Applications
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
            `${application.company} — ${application.position} (${application.requiredSkills?.length || 0} skills)`;


        jobSelect.appendChild(option);

    });

}

// -----------------------------------------
// Skill Level Mapping
// -----------------------------------------

const skillLevelValues = {

    Beginner: 1,

    Basic: 2,

    Intermediate: 3,

    Advanced: 4,

    Expert: 5

};

// -----------------------------------------
// Initial Setup
// -----------------------------------------

populateJobSelect();

// -----------------------------------------
// Analyze Button
// -----------------------------------------

analyzeBtn.addEventListener(
    "click",
    analyzeSkillGap
);

// -----------------------------------------
// Analyze Skill Gap
// -----------------------------------------

function analyzeSkillGap() {

    const selectedApplicationId =
        Number(jobSelect.value);


    if (!selectedApplicationId) {

        alert("Please select a job application.");

        return;

    }


    const application =
        applications.find(
            app => app.id === selectedApplicationId
        );


    if (!application) {

        alert("Application not found.");

        return;

    }


    const requiredSkills =
        application.requiredSkills || [];


    if (requiredSkills.length === 0) {

        alert(
            "This application does not have any required skills."
        );

        return;

    }


    // -----------------------------------------
    // Compare skills
    // -----------------------------------------

    const results =
    requiredSkills.map(requiredSkill => {

        // -----------------------------------------
        // Support both old and new formats
        // -----------------------------------------

        const requiredSkillName =
            typeof requiredSkill === "object"
                ? requiredSkill.name
                : requiredSkill;


        const requiredLevel =
            typeof requiredSkill === "object"
                ? requiredSkill.level
                : getRequiredLevel(requiredSkill);


        // -----------------------------------------
        // Find user's skill
        // -----------------------------------------

        const userSkill =
            skills.find(
                skill =>
                    skill.name.toLowerCase() ===
                    requiredSkillName.toLowerCase()
            );


        // -----------------------------------------
        // Missing skill
        // -----------------------------------------

        if (!userSkill) {

            return {

                skill:
                    requiredSkillName,

                requiredLevel:
                    requiredLevel,

                currentLevel:
                    "Missing",

                status:
                    "missing",

                gap:
                    null

            };

        }


        // -----------------------------------------
        // Compare proficiency
        // -----------------------------------------

        const currentValue =
            skillLevelValues[
                userSkill.currentLevel
            ] || 0;


        const requiredValue =
            skillLevelValues[
                requiredLevel
            ] || 1;


        const gap =
            requiredValue - currentValue;


        let status;


        if (gap <= 0) {

            status = "strong";

        }
        else {

            status = "improve";

        }


        return {

            skill:
                requiredSkillName,

            requiredLevel:
                requiredLevel,

            currentLevel:
                userSkill.currentLevel,

            status:
                status,

            gap:
                gap

        };

    });


    renderAnalysis(
        application,
        results
    );

}

// -----------------------------------------
// Get Required Skill Level
// -----------------------------------------

function getRequiredLevel(skillName) {

    // Temporary default:
    // Every required skill is considered
    // Intermediate until we add required
    // proficiency to the application form.

    return "Intermediate";

}

// -----------------------------------------
// Render Analysis
// -----------------------------------------

function renderAnalysis(
    application,
    results
) {

    // -----------------------------------------
    // Show results
    // -----------------------------------------

    skillGapEmpty.classList.add("d-none");

    skillGapResults.classList.remove("d-none");


    // -----------------------------------------
    // Job information
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
        application.location || "Location not specified";


    // -----------------------------------------
    // Count results
    // -----------------------------------------

    const strongSkills =
        results.filter(
            result =>
                result.status === "strong"
        );


    const improveSkills =
        results.filter(
            result =>
                result.status === "improve"
        );


    const missingSkills =
        results.filter(
            result =>
                result.status === "missing"
        );


    // -----------------------------------------
    // Update summary
    // -----------------------------------------

    document.getElementById(
        "strongSkillsCount"
    ).textContent =
        strongSkills.length;


    document.getElementById(
        "improveSkillsCount"
    ).textContent =
        improveSkills.length;


    document.getElementById(
        "missingSkillsCount"
    ).textContent =
        missingSkills.length;


    // -----------------------------------------
    // Match score
    // -----------------------------------------

    const matchScore =
        calculateMatchScore(results);


    document.getElementById(
        "matchScore"
    ).textContent =
        `${matchScore}%`;


    // -----------------------------------------
    // Render comparison
    // -----------------------------------------

    renderSkillComparison(results);

}

// -----------------------------------------
// Calculate Match Score
// -----------------------------------------

function calculateMatchScore(results) {

    if (results.length === 0) {
        return 0;
    }


    let totalScore = 0;


    results.forEach(result => {

        if (result.status === "missing") {

            totalScore += 0;

            return;

        }


        const currentValue =
            skillLevelValues[
                result.currentLevel
            ] || 0;


        const requiredValue =
            skillLevelValues[
                result.requiredLevel
            ] || 1;


        const skillScore =
            Math.min(
                currentValue / requiredValue,
                1
            );


        totalScore +=
            skillScore * 100;

    });


    return Math.round(
        totalScore / results.length
    );

}

// -----------------------------------------
// Render Skill Comparison
// -----------------------------------------

function renderSkillComparison(results) {

    const container =
        document.getElementById(
            "skillComparisonContainer"
        );


    container.innerHTML = "";


    results.forEach(result => {

        const item =
            document.createElement("div");


        item.className =
            "skill-comparison-item";


        let statusLabel;

        let statusClass;


        if (result.status === "strong") {

            statusLabel = "Strong";

            statusClass =
                "comparison-status-strong";

        }
        else if (result.status === "improve") {

            statusLabel =
                "Needs Improvement";

            statusClass =
                "comparison-status-improve";

        }
        else {

            statusLabel = "Missing";

            statusClass =
                "comparison-status-missing";

        }


        const currentValue =
            skillLevelValues[
                result.currentLevel
            ] || 0;


        const requiredValue =
            skillLevelValues[
                result.requiredLevel
            ] || 1;


        const progress =
            result.status === "missing"

                ? 0

                : Math.min(
                    (currentValue / requiredValue) * 100,
                    100
                );


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


        container.appendChild(item);

    });

}