"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Type casting elements to the correct HTML types
    const form = document.getElementById("resumeForm");
    const resume = document.getElementById("resume");
    const formContainer = document.querySelector(".form-container");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const contactField = document.getElementById("contact");
    const educationField = document.getElementById("education");
    const skillsField = document.getElementById("skills");
    const experienceField = document.getElementById("experience");
    const profilePicField = document.getElementById("profilePic");
    const displayName = document.getElementById("displayName");
    const displayContact = document.getElementById("displayContact");
    const displayEducation = document.getElementById("displayEducation");
    const displaySkills = document.getElementById("displaySkills");
    const displayExperience = document.getElementById("displayExperience");
    const displayProfilePic = document.getElementById("displayProfilePic");
    const livePreview = document.createElement("div");
    livePreview.classList.add("resume-preview");
    livePreview.innerHTML = `
      <section class="personal-info">
        <img id="liveProfilePic" src="/default-profile.jpg" alt="Profile Picture" class="profile-pic"/>
        <h1 id="liveName"></h1>
        <p id="liveContact"></p>
        <hr />
      </section>
  
      <section id="live-education-section" class="section-content">
        <h2>Education</h2>
        <p id="liveEducation"></p>
        <hr />
      </section>
  
      <section id="live-skills-section" class="section-content">
        <h2>Skills</h2>
        <ul id="liveSkills"></ul>
        <hr />
      </section>
  
      <section id="live-work-experience-section" class="section-content">
        <h2>Work Experience</h2>
        <p id="liveExperience"></p>
        <hr />
      </section>
    `;
    formContainer.appendChild(livePreview);
    const liveName = document.getElementById("liveName");
    const liveContact = document.getElementById("liveContact");
    const liveEducation = document.getElementById("liveEducation");
    const liveSkills = document.getElementById("liveSkills");
    const liveExperience = document.getElementById("liveExperience");
    const liveProfilePic = document.getElementById("liveProfilePic");
    // Function to update skills in real-time
    const updateSkills = () => {
        const skills = skillsField.value.split(",").map((skill) => skill.trim());
        liveSkills.innerHTML = "";
        displaySkills.innerHTML = "";
        skills.forEach((skill) => {
            const li = document.createElement("li");
            li.textContent = skill;
            liveSkills.appendChild(li);
            const resumeLi = li.cloneNode(true); // Clone for resume
            displaySkills.appendChild(resumeLi);
        });
    };
    // Update profile picture in real-time
    profilePicField.addEventListener("change", () => {
        const profilePic = profilePicField.files ? profilePicField.files[0] : null;
        const profilePicURL = profilePic
            ? URL.createObjectURL(profilePic)
            : "/default-profile.jpg";
        liveProfilePic.src = profilePicURL;
        displayProfilePic.src = profilePicURL;
    });
    // Add event listeners to form inputs for real-time updates
    nameField.addEventListener("input", () => {
        liveName.textContent = nameField.value;
        displayName.textContent = nameField.value;
    });
    emailField.addEventListener("input", updateContact);
    contactField.addEventListener("input", updateContact);
    educationField.addEventListener("input", () => {
        liveEducation.textContent = educationField.value;
        displayEducation.textContent = educationField.value;
    });
    skillsField.addEventListener("input", updateSkills);
    experienceField.addEventListener("input", () => {
        liveExperience.textContent = experienceField.value;
        displayExperience.textContent = experienceField.value;
    });
    // Function to update contact details in real-time
    function updateContact() {
        const contactText = `${emailField.value} | ${contactField.value}`;
        liveContact.textContent = contactText;
        displayContact.textContent = contactText;
    }
    // Hide form and show resume on submit
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formContainer.style.display = "none"; // Hide the form
        livePreview.style.display = "none"; // Hide live preview
        resume.style.display = "block"; // Show the resume
    });
    // Function to toggle visibility of resume sections
    function toggleSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            if (targetElement.classList.contains("hidden")) {
                targetElement.classList.remove("hidden");
                targetElement.style.maxHeight = targetElement.scrollHeight + "px";
                targetElement.style.opacity = "1";
            }
            else {
                targetElement.classList.add("hidden");
                targetElement.style.maxHeight = "0";
                targetElement.style.opacity = "0";
            }
        }
    }
    // Add event listeners to toggle buttons
    const toggleButtons = document.querySelectorAll(".toggle-button");
    toggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            if (targetId) {
                toggleSection(targetId);
            }
        });
    });
});
