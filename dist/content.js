"use strict";
// @ts-ignore
browser.storage.sync.get("profile").then((result) => {
    const profile = result.profile;
    if (profile) {
        console.log("Autofill Profile Data:", profile);
        const firstNameField = document.querySelector('input[name="job_application[first_name]"]');
        const emailField = document.querySelector('input[name="job_application[email]"]');
        const phoneField = document.querySelector('input[name="job_application[phone]"]');
        if (firstNameField)
            firstNameField.value = profile.name || "";
        if (emailField)
            emailField.value = profile.email || "";
        if (phoneField)
            phoneField.value = profile.phone || "";
        console.log("Form autofilled successfully.");
    }
}).catch((error) => {
    console.error("Error autofilling profile:", error);
});
