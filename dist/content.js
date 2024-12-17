"use strict";
// Autofill input fields
function autofillFields(profile) {
    console.log("Attempting to autofill fields with profile:", profile);
    // Define patterns to match attributes like name, id, and placeholder
    const regexMap = {
        name: /first|given/i,
        email: /email/i,
        phone: /phone|mobile/i,
    };
    // List of all input elements
    const inputs = Array.from(document.querySelectorAll("input, textarea"));
    // Try to match fields based on attributes
    inputs.forEach((input) => {
        const nameAttr = input.getAttribute("name") || "";
        const idAttr = input.getAttribute("id") || "";
        const placeholderAttr = input.getAttribute("placeholder") || "";
        if (regexMap.name.test(nameAttr) || regexMap.name.test(idAttr) || regexMap.name.test(placeholderAttr)) {
            // @ts-ignore
            input.value = profile.name;
            console.log(`Filled Name field: ${input}`);
        }
        else if (regexMap.email.test(nameAttr) || regexMap.email.test(idAttr) || regexMap.email.test(placeholderAttr)) {
            // @ts-ignore
            input.value = profile.email;
            console.log(`Filled Email field: ${input}`);
        }
        else if (regexMap.phone.test(nameAttr) || regexMap.phone.test(idAttr) || regexMap.phone.test(placeholderAttr)) {
            // @ts-ignore
            input.value = profile.phone;
            console.log(`Filled Phone field: ${input}`);
        }
    });
    // Match fields by labels associated with the "for" attribute
    document.querySelectorAll("label").forEach((label) => {
        const htmlFor = label.getAttribute("for");
        if (htmlFor) {
            const input = document.getElementById(htmlFor);
            if (input) {
                if (/first|given/i.test(label.textContent || "")) {
                    input.value = profile.name;
                    console.log(`Filled Name field via label: ${input}`);
                }
                else if (/email/i.test(label.textContent || "")) {
                    input.value = profile.email;
                    console.log(`Filled Email field via label: ${input}`);
                }
                else if (/phone|mobile/i.test(label.textContent || "")) {
                    input.value = profile.phone;
                    console.log(`Filled Phone field via label: ${input}`);
                }
            }
        }
    });
}
// Listen for autofill requests
// @ts-ignore
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "fillForm") {
        autofillFields(message.profile);
    }
});
