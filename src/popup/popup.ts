const saveButton = document.getElementById("save") as HTMLButtonElement;

saveButton.addEventListener("click", () => {
    // Capture data from input fields
    const profile = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
    };

    // Save the data to chrome.storage.sync
    chrome.storage.sync.set({ profile }, () => {
        // Check for errors
        if (chrome.runtime.lastError) {
            console.error("Error saving profile:", chrome.runtime.lastError);
        } else {
            console.log("Profile saved successfully:", profile);
            alert("Profile saved!");
        }
    });
});
