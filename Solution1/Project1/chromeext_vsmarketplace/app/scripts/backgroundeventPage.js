


// When the extension is installed or upgraded ...
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

    if (request.action == "show") {
        chrome.tabs.query({ active: true, currentWindow: true },
            function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
});







//console.log("backgroundEventPage 1");

//// Regex-pattern to check URLs against. 
//// It matches URLs like: http[s]://[...]stackoverflow.com[...]
//var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?marketplace.visualstudio\.com/;

//// A function to use as callback
//function doStuffWithDom(domContent) {
    //console.log("doStuffWithDom2");
    //console.log('I received the following DOM content:\n' + domContent);
//}

//// When the browser-action button is clicked...
//chrome.browserAction.onClicked.addListener(function (tab) {
//    console.log("backgroundEventPage 3");
//    // ...check the URL of the active tab against our pattern and...
//    if (urlRegex.test(tab.url)) {
//        console.log("backgroundEventPage 4");
//        // ...if it matches, send a message specifying a callback too
//        chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom);
//    }
//});



//console.log("backgroundEventPage 5");




//// When the extension is installed or upgraded...
//chrome.runtime.onInstalled.addListener(function() {
//    console.log("backgroundEventPage 6");

//    // Replace all rules...
//    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

//        console.log("backgroundEventPage 7");

//        // With a new rule...
//        chrome.declarativeContent.onPageChanged.addRules([
//            {
//                // That fires when a page's URL contains certain value
//                conditions: [
//                    new chrome.declarativeContent.PageStateMatcher({
//                        pageUrl: { urlContains: 'marketplace.visualstudio' },
//                    })
//                ],

//                // And shows the extension's page action 
//                // i.e. show popup.html (as defined in the manifest's 'page action' section)
//                // which will display what popup.js instructs it too
//                actions: [new chrome.declarativeContent.ShowPageAction()]
//            }
//        ]);

//        console.log("backgroundEventPage 8");
//    });

//    console.log("backgroundEventPage 9");
//});
