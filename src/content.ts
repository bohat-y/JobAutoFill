import browser from "webextension-polyfill";

// Define the profile structure
interface Profile {
    name: string;
    email: string;
    phone: string;
}

// Autofill fields using stored profile
browser.storage.sync.get("profile").then((result) => {
    const data = result as { profile: Profile }; // Explicitly cast the returned data
    const profile = data.profile;

    if (profile) {
        console.log("Autofill Profile Data:", profile);

        const firstNameField = document.querySelector('input[name="job_application[first_name]"]') as HTMLInputElement;
        const emailField = document.querySelector('input[name="job_application[email]"]') as HTMLInputElement;
        const phoneField = document.querySelector('input[name="job_application[phone]"]') as HTMLInputElement;

        if (firstNameField) {
            firstNameField.value = profile.name || "";
            console.log("First Name field autofilled.");
        }

        if (emailField) {
            emailField.value = profile.email || "";
            console.log("Email field autofilled.");
        }

        if (phoneField) {
            phoneField.value = profile.phone || "";
            console.log("Phone field autofilled.");
        }
    } else {
        console.log("No profile data found.");
    }
}).catch((error) => {
    console.error("Error retrieving profile:", error);
});