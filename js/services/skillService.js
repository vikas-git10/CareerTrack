// =========================================
// CareerTrack - Skill Service
// =========================================

const SKILLS_KEY = "careertrack_skills";


const SkillService = {

    // -----------------------------------------
    // Get all skills
    // -----------------------------------------

    getAll() {

        const skills =
            StorageService.get(SKILLS_KEY);

        return skills || [];

    },


    // -----------------------------------------
    // Save all skills
    // -----------------------------------------

    saveAll(skills) {

        StorageService.save(
            SKILLS_KEY,
            skills
        );

    },


    // -----------------------------------------
    // Add skill
    // -----------------------------------------

    add(skill) {

        const skills =
            this.getAll();

        skills.push(skill);

        this.saveAll(skills);

        return skill;

    },


    // -----------------------------------------
    // Get skill by ID
    // -----------------------------------------

    getById(id) {

        const skills =
            this.getAll();

        return skills.find(
            skill => skill.id === id
        );

    },


    // -----------------------------------------
    // Update skill
    // -----------------------------------------

    update(id, updatedSkill) {

        const skills =
            this.getAll();

        const index =
            skills.findIndex(
                skill => skill.id === id
            );

        if (index === -1) {
            return false;
        }

        skills[index] = {
            ...skills[index],
            ...updatedSkill
        };

        this.saveAll(skills);

        return skills[index];

    },


    // -----------------------------------------
    // Delete skill
    // -----------------------------------------

    delete(id) {

        const skills =
            this.getAll();

        const updatedSkills =
            skills.filter(
                skill => skill.id !== id
            );

        this.saveAll(updatedSkills);

    }

};