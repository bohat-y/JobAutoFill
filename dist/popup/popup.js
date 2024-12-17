"use strict";
// @ts-ignore
browser.storage.sync.get("profile").then((result) => {
    var _a, _b;
    const profile = result.profile || { name: "", email: "", phone: "" };
    document.getElementById("name").value = profile.name;
    document.getElementById("email").value = profile.email;
    document.getElementById("phone").value = profile.phone;
    (_a = document.getElementById("save")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const updatedProfile = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
        };
        // @ts-ignore
        browser.storage.sync.set({ profile: updatedProfile }).then(() => {
            console.log("Profile saved successfully:", updatedProfile);
            alert("Profile saved!");
        });
    });
    // Send a message to background to trigger autofill
    (_b = document.getElementById("autofill")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        // @ts-ignore
        browser.runtime.sendMessage({ command: "autofill", profile });
    });
});
