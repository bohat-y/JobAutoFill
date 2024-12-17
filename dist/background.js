"use strict";
// @ts-ignore
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "autofill") {
        console.log("Received autofill request in background script", message.profile);
        // Send the profile data to the content script
        // @ts-ignore
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            var _a;
            if ((_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id) {
                // @ts-ignore
                browser.tabs.sendMessage(tabs[0].id, { command: "fillForm", profile: message.profile });
            }
        });
        sendResponse({ status: "Autofill request sent to content script" });
    }
});
