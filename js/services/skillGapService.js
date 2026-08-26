// =========================================
// CareerTrack - Skill Gap Service
// =========================================


// -----------------------------------------
// Skill Level Mapping
// -----------------------------------------

const SKILL_LEVEL_VALUES = {

    Beginner: 1,

    Basic: 2,

    Intermediate: 3,

    Advanced: 4,

    Expert: 5

};


// -----------------------------------------
// Get Required Skill Information
// -----------------------------------------

function normalizeRequiredSkill(requiredSkill) {

    // New format:
    //
    // {
    //     name: "JavaScript",
    //     level: "Advanced"
    // }

    if (
        typeof requiredSkill === "object" &&
        requiredSkill !== null
    ) {

        return {

            name: requiredSkill.name,

            level:
                requiredSkill.level ||
                "Intermediate"

        };

    }


    // Old format:
    //
    // "JavaScript"

    return {

        name: requiredSkill,

        level: "Intermediate"

    };

}


// -----------------------------------------
// Analyze Application Skills
// -----------------------------------------

function analyzeApplicationSkills(
    application,
    userSkills
) {

    const requiredSkills =
        application.requiredSkills || [];


    if (requiredSkills.length === 0) {

        return {

            results: [],

            matchScore: 0,

            strongCount: 0,

            improveCount: 0,

            missingCount: 0

        };

    }


    const results =
        requiredSkills.map(
            requiredSkill => {

                const normalized =
                    normalizeRequiredSkill(
                        requiredSkill
                    );


                // -----------------------------------------
                // Find user's matching skill
                // -----------------------------------------

                const userSkill =
                    userSkills.find(
                        skill =>
                            skill.name
                                .toLowerCase() ===
                            normalized.name
                                .toLowerCase()
                    );


                // -----------------------------------------
                // Missing
                // -----------------------------------------

                if (!userSkill) {

                    return {

                        skill:
                            normalized.name,

                        requiredLevel:
                            normalized.level,

                        currentLevel:
                            "Missing",

                        status:
                            "missing",

                        gap:
                            null

                    };

                }


                // -----------------------------------------
                // Compare levels
                // -----------------------------------------

                const currentValue =
                    SKILL_LEVEL_VALUES[
                        userSkill.currentLevel
                    ] || 0;


                const requiredValue =
                    SKILL_LEVEL_VALUES[
                        normalized.level
                    ] || 1;


                const gap =
                    requiredValue -
                    currentValue;


                let status;


                if (gap <= 0) {

                    status = "strong";

                }
                else {

                    status = "improve";

                }


                return {

                    skill:
                        normalized.name,

                    requiredLevel:
                        normalized.level,

                    currentLevel:
                        userSkill.currentLevel,

                    status:
                        status,

                    gap:
                        gap

                };

            }
        );


    // -----------------------------------------
    // Calculate Match Score
    // -----------------------------------------

    const matchScore =
        calculateMatchScore(results);


    // -----------------------------------------
    // Summary Counts
    // -----------------------------------------

    const strongCount =
        results.filter(
            result =>
                result.status === "strong"
        ).length;


    const improveCount =
        results.filter(
            result =>
                result.status === "improve"
        ).length;


    const missingCount =
        results.filter(
            result =>
                result.status === "missing"
        ).length;


    return {

        results,

        matchScore,

        strongCount,

        improveCount,

        missingCount

    };

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

        // Missing skill = 0%

        if (
            result.status === "missing"
        ) {

            return;

        }


        const currentValue =
            SKILL_LEVEL_VALUES[
                result.currentLevel
            ] || 0;


        const requiredValue =
            SKILL_LEVEL_VALUES[
                result.requiredLevel
            ] || 1;


        const skillScore =
            Math.min(
                currentValue /
                requiredValue,
                1
            );


        totalScore +=
            skillScore * 100;

    });


    return Math.round(
        totalScore / results.length
    );

}