interface Profile {
    name: string;
    email: string;
    phone: string;
}

// @ts-ignore
browser.storage.sync.get("profile").then((result) => {
    const profile = result.profile as Profile;

    if (profile) {
        console.log("Autofill Profile Data:", profile);

        const firstNameField = document.querySelector('input[name="job_application[first_name]"]') as HTMLInputElement;
        const emailField = document.querySelector('input[name="job_application[email]"]') as HTMLInputElement;
        const phoneField = document.querySelector('input[name="job_application[phone]"]') as HTMLInputElement;

        if (firstNameField) firstNameField.value = profile.name || "";
        if (emailField) emailField.value = profile.email || "";
        if (phoneField) phoneField.value = profile.phone || "";

        console.log("Form autofilled successfully.");
    }
}).catch((error: any) => {
    console.error("Error autofilling profile:", error);
});