chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.action == "openPopUp") {
            chrome.tabs.query({ active: true, currentWindow: true },
                function (tabs) {
                    chrome.pageAction.show(tabs[0].id);
                });
        }
    });

function dataUnavailableEmail() {

    var mailto = "support.vsmarketplacemetrics@gmail.com";
    var subject = "VS Marketplace Metrics Data Unavailable Page";
    var userAgent = navigator.userAgent;//gregt dedupe
    var pageUrl = window.location.href;//gregt dedupe
    var body =
        "User agent: " + userAgent +
        "<br />" + 
        "Page url: " + pageUrl;
    var emailUrl = "mailto:" + mailto + "?subject=" + subject + "&body=" + body;

    chrome.tabs.create({ url: emailUrl }, function (tab) {
        setTimeout(function () {
            chrome.tabs.remove(tab.id);
        }, 500);
    });
}