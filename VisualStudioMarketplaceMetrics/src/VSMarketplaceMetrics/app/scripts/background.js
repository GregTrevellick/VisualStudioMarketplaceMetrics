// When the extension is installed or upgraded...
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.action == "openPopUp") {
            chrome.tabs.query({ active: true, currentWindow: true },
                function (tabs) {
                    chrome.pageAction.show(tabs[0].id);
                });
        }
    });



function sendEmail() {
    //include chrome vers, url etc in email
    var emailUrl = "mailto:blah@blah.com";
    chrome.tabs.create({ url: emailUrl }, function (tab) {
        setTimeout(function () {
            chrome.tabs.remove(tab.id);
        }, 500);
    });
}