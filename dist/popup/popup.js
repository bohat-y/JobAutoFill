import browser from "webextension-polyfill";
// Save profile to browser storage
const saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => {
    const profile = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
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
    const data = result; // Explicitly cast the returned data
    const profile = data.profile;
    if (profile) {
        document.getElementById("name").value = profile.name || "";
        document.getElementById("email").value = profile.email || "";
        document.getElementById("phone").value = profile.phone || "";
        console.log("Loaded existing profile:", profile);
    }
    else {
        console.log("No existing profile found.");
    }
}).catch((error) => {
    console.error("Error retrieving profile:", error);
});
