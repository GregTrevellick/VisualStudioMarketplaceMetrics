// Regex-pattern to check URLs against. It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?marketplace.visualstudio\.com/;

// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom);
    }
});





$(function () {

    //var bg = chrome.extension.getBackgroundPage();
    //var appinfo = bg.appinfo;


        

    console.log('here');
    var theTot = 999;

    //grab ALL elements from DOM with selector    .install-count
    jQuery('.install-count').each(function () {
        var currentElement = $(this);
        var value = currentElement.val(); // if it is an input/select/textarea field
        console.log(value);
    });
 

    //theTot = dlcounts.innerHTML;
    

    console.log(theTot);
    var display = document.getElementById('daTotal');
    display.innerHTML = theTot;




    // When button clicked do something
    //$('#GetTotalBtn').click(function () {
    //    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //        chrome.tabs.sendMessage(tabs[0].id, { action: "GetTotalBtn" });
    //    });
    //});
  
});