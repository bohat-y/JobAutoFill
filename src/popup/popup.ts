// @ts-ignore
browser.storage.sync.get("profile").then((result) => {
    const profile = result.profile || { name: "", email: "", phone: "" };

    (document.getElementById("name") as HTMLInputElement).value = profile.name;
    (document.getElementById("email") as HTMLInputElement).value = profile.email;
    (document.getElementById("phone") as HTMLInputElement).value = profile.phone;

    document.getElementById("save")?.addEventListener("click", () => {
        const updatedProfile = {
            name: (document.getElementById("name") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            phone: (document.getElementById("phone") as HTMLInputElement).value,
        };

        // @ts-ignore
        browser.storage.sync.set({ profile: updatedProfile }).then(() => {
            console.log("Profile saved successfully:", updatedProfile);
            alert("Profile saved!");
        });
    });

    // Send a message to background to trigger autofill
    document.getElementById("autofill")?.addEventListener("click", () => {
        // @ts-ignore
        browser.runtime.sendMessage({ command: "autofill", profile });
    });
});