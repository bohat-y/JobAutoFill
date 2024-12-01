"use strict";
const saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => {
    // Capture data from input fields
    const profile = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    };
    // Save the data to chrome.storage.sync
    chrome.storage.sync.set({ profile }, () => {
        // Check for errors
        if (chrome.runtime.lastError) {
            console.error("Error saving profile:", chrome.runtime.lastError);
        }
        else {
            console.log("Profile saved successfully:", profile);
            alert("Profile saved!");
        }
    });
});
