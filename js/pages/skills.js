// =========================================
// CareerTrack - Skills Page
// =========================================


// -----------------------------------------
// State
// -----------------------------------------

let skills = SkillService.getAll();

let editingSkillId = null;


// -----------------------------------------
// DOM Elements
// -----------------------------------------

const skillForm =
    document.getElementById("skillForm");

const skillModalLabel =
    document.getElementById("skillModalLabel");

const skillSubmitBtn =
    document.getElementById("skillSubmitBtn");

const skillsContainer =
    document.getElementById("skillsContainer");

const skillSearch =
    document.getElementById("skillSearch");

const skillCategoryFilter =
    document.getElementById("skillCategoryFilter");

const skillLevelFilter =
    document.getElementById("skillLevelFilter");

const clearSkillFiltersBtn =
    document.getElementById(
        "clearSkillFiltersBtn"
    );

const totalSkillsCount =
    document.getElementById("totalSkillsCount");

const advancedSkillsCount =
    document.getElementById("advancedSkillsCount");

const intermediateSkillsCount =
    document.getElementById("intermediateSkillsCount");

const beginnerSkillsCount =
    document.getElementById("beginnerSkillsCount");


    
// -----------------------------------------
// Add Skill Form
// -----------------------------------------

skillForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // -----------------------------------------
        // Collect form data
        // -----------------------------------------

        const skillData = {

            name:
                document
                    .getElementById("skillName")
                    .value
                    .trim(),

            category:
                document
                    .getElementById("skillCategory")
                    .value,

            currentLevel:
                document
                    .getElementById("currentLevel")
                    .value,

            targetLevel:
                document
                    .getElementById("targetLevel")
                    .value,

            experience:
                document
                    .getElementById("skillExperience")
                    .value,

            lastPracticed:
                document
                    .getElementById("lastPracticed")
                    .value

        };


        // -----------------------------------------
        // Add / Edit Skill
        // -----------------------------------------

        if (editingSkillId !== null) {

            // Update existing skill

            SkillService.update(
                editingSkillId,
                skillData
            );


            console.log(
                "Skill updated:",
                editingSkillId
            );

        }
        else {

            // Create new skill

            const newSkill = {

                id: Date.now(),

                ...skillData

            };


            SkillService.add(newSkill);


            console.log(
                "Skill added:",
                newSkill
            );

        }


        // -----------------------------------------
        // Reload skills
        // -----------------------------------------

        skills =
            SkillService.getAll();


        // -----------------------------------------
        // Render skills
        // -----------------------------------------

        renderSkills();


        // -----------------------------------------
        // Reset form
        // -----------------------------------------

        skillForm.reset();

        editingSkillId = null;

        skillModalLabel.textContent =
            "Add Skill";

        skillSubmitBtn.textContent =
            "Add Skill";


        // -----------------------------------------
        // Close modal
        // -----------------------------------------

        const modalElement =
            document.getElementById("skillModal");

        const modal =
            bootstrap.Modal.getInstance(
                modalElement
            );

        modal.hide();


        console.log(
            "Skill added:",
            newSkill
        );

    }
);


// -----------------------------------------
// Render Skills
// -----------------------------------------

// -----------------------------------------
// Render Skills
// -----------------------------------------

function renderSkills() {

    const searchTerm =
        skillSearch.value
            .trim()
            .toLowerCase();

    const selectedCategory =
        skillCategoryFilter.value;

    const selectedLevel =
        skillLevelFilter.value;


    // -----------------------------------------
    // Filter skills
    // -----------------------------------------

    const filteredSkills =
        skills.filter(skill => {

            const matchesSearch =
                skill.name
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                selectedCategory === ""
                ||
                skill.category === selectedCategory;


            const matchesLevel =
                selectedLevel === ""
                ||
                skill.currentLevel === selectedLevel;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesLevel
            );

        });


    // -----------------------------------------
    // Clear container
    // -----------------------------------------

    skillsContainer.innerHTML = "";


    // -----------------------------------------
    // Empty state
    // -----------------------------------------

    if (filteredSkills.length === 0) {

        skillsContainer.innerHTML = `

            <div class="text-center py-5 text-muted">

                <div class="mb-2">
                    No skills found.
                </div>

                <small>
                    Try changing your search or filters.
                </small>

            </div>

        `;

        return;

    }


    // -----------------------------------------
    // Render filtered skills
    // -----------------------------------------

    filteredSkills.forEach(skill => {

        const card =
            document.createElement("div");

        card.className =
            "skill-card";


        card.innerHTML = `

            <div class="skill-card-header">

                <div>

                    <div class="skill-name">
                        ${skill.name}
                    </div>

                    <div class="skill-category">
                        ${skill.category}
                    </div>

                </div>


                <div class="skill-level">
                    ${skill.currentLevel}
                </div>

            </div>


            <div class="skill-progress">

                <div
                    class="skill-progress-bar"
                    style="width: ${getSkillProgress(skill.currentLevel)}%"
                ></div>

            </div>


            <div class="skill-meta">

                <span>
                    Target: ${skill.targetLevel}
                </span>

                <span>
                    ${skill.experience || 0} years experience
                </span>

            </div>


            <div class="skill-actions">

                <button
                    class="btn btn-sm btn-outline-secondary"
                    onclick="editSkill(${skill.id})"
                >
                    Edit
                </button>

                <button
                    class="btn btn-sm btn-outline-danger"
                    onclick="deleteSkill(${skill.id})"
                >
                    Delete
                </button>

            </div>

        `;


        skillsContainer.appendChild(card);

    });


    // -----------------------------------------
    // Update statistics
    // -----------------------------------------

    updateStatistics();

}


// -----------------------------------------
// Skill Progress
// -----------------------------------------

function getSkillProgress(level) {

    const progress = {

        Beginner: 20,

        Basic: 40,

        Intermediate: 60,

        Advanced: 80,

        Expert: 100

    };


    return progress[level] || 0;

}


// -----------------------------------------
// Update Statistics
// -----------------------------------------

function updateStatistics() {

    totalSkillsCount.textContent =
        skills.length;


    advancedSkillsCount.textContent =
        skills.filter(
            skill =>
                skill.currentLevel === "Advanced"
                ||
                skill.currentLevel === "Expert"
        ).length;


    intermediateSkillsCount.textContent =
        skills.filter(
            skill =>
                skill.currentLevel === "Intermediate"
        ).length;


    beginnerSkillsCount.textContent =
        skills.filter(
            skill =>
                skill.currentLevel === "Beginner"
        ).length;

}


// -----------------------------------------
// Delete Skill
// -----------------------------------------

function deleteSkill(id) {

    const skill =
        SkillService.getById(id);


    if (!skill) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${skill.name}?`
        );


    if (!confirmed) {
        return;
    }


    SkillService.delete(id);


    skills =
        SkillService.getAll();


    renderSkills();

}


// -----------------------------------------
// Edit Skill
// -----------------------------------------

function editSkill(id) {

    const skill =
        SkillService.getById(id);


    if (!skill) {
        return;
    }


    editingSkillId = id;


    skillModalLabel.textContent =
        "Edit Skill";

    skillSubmitBtn.textContent =
        "Save Changes";


    document.getElementById("skillName").value =
        skill.name || "";

    document.getElementById("skillCategory").value =
        skill.category || "";

    document.getElementById("currentLevel").value =
        skill.currentLevel || "";

    document.getElementById("targetLevel").value =
        skill.targetLevel || "";

    document.getElementById("skillExperience").value =
        skill.experience || "";

    document.getElementById("lastPracticed").value =
        skill.lastPracticed || "";


    const modalElement =
        document.getElementById("skillModal");

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );

    modal.show();

}

// -----------------------------------------
// Search Skills
// -----------------------------------------

skillSearch.addEventListener(
    "input",
    renderSkills
);

// -----------------------------------------
// Category Filter
// -----------------------------------------

skillCategoryFilter.addEventListener(
    "change",
    renderSkills
);

// -----------------------------------------
// Level Filter
// -----------------------------------------

skillLevelFilter.addEventListener(
    "change",
    renderSkills
);

// -----------------------------------------
// Clear Skill Filters
// -----------------------------------------

clearSkillFiltersBtn.addEventListener(
    "click",
    function() {

        skillSearch.value = "";

        skillCategoryFilter.value = "";

        skillLevelFilter.value = "";

        renderSkills();

    }
);

// -----------------------------------------
// Initial Render
// -----------------------------------------

renderSkills();