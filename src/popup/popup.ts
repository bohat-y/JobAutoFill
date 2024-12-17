const saveButton = document.getElementById("save") as HTMLButtonElement;

saveButton.addEventListener("click", () => {
    const profile = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
    };

    // @ts-ignore
    browser.storage.sync.set({ profile }).then(() => {
        console.log("Profile saved successfully:", profile);
        alert("Profile saved!");
    }).catch((error: any) => {
        console.error("Error saving profile:", error);
    });
});

// @ts-ignore
browser.storage.sync.get("profile").then((result) => {
    const profile = result.profile as { name: string; email: string; phone: string };

    if (profile) {
        (document.getElementById("name") as HTMLInputElement).value = profile.name || "";
        (document.getElementById("email") as HTMLInputElement).value = profile.email || "";
        (document.getElementById("phone") as HTMLInputElement).value = profile.phone || "";
        console.log("Loaded existing profile:", profile);
    } else {
        console.log("No existing profile found.");
    }
}).catch((error: any) => {
    console.error("Error retrieving profile:", error);
});