import browser from "webextension-polyfill";

// Define the profile structure
interface Profile {
    name: string;
    email: string;
    phone: string;
}

// Save profile to browser storage
const saveButton = document.getElementById("save") as HTMLButtonElement;

saveButton.addEventListener("click", () => {
    const profile: Profile = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
    };

    browser.storage.sync.set({ profile }).then(() => {
        console.log("Profile saved successfully:", profile);
        alert("Profile saved!");
    }).catch((error) => {
        console.error("Error saving profile:", error);
    });
});

// Autofill popup fields with existing profile data
browser.storage.sync.get("profile").then((result) => {
    const data = result as { profile: Profile }; // Explicitly cast the returned data
    const profile = data.profile;

    if (profile) {
        (document.getElementById("name") as HTMLInputElement).value = profile.name || "";
        (document.getElementById("email") as HTMLInputElement).value = profile.email || "";
        (document.getElementById("phone") as HTMLInputElement).value = profile.phone || "";
        console.log("Loaded existing profile:", profile);
    } else {
        console.log("No existing profile found.");
    }
}).catch((error) => {
    console.error("Error retrieving profile:", error);
});