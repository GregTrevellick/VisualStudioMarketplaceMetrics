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
    var chromeVersion = navigator.appVersion;//gregt http://stackoverflow.com/questions/27022527/javascript-detect-what-chrome-version
    var pageUrl = window.location.href;
    var body =
        "Chrome version: " + chromeVersion +
        "<br />" + 
        "Page url: " + pageUrl;
    var emailUrl = "mailto:" + mailto + "?subject=" + subject + "&body=" + body;

    chrome.tabs.create({ url: emailUrl }, function (tab) {
        setTimeout(function () {
            chrome.tabs.remove(tab.id);
        }, 500);
    });
}