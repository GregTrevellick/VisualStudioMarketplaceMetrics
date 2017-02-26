$(function () {

    console.log("popup.js here1");


    function psuedoClick() {
        console.log("psuedoClick called");
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm1" }, doStuffWithDom);
            });
    };

    psuedoClick();




    //Regex-pattern to check URLs against. It matches URLs like: http[s]://[...]stackoverflow.com[...]
    //var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?marketplace.visualstudio\.com/;

    //// A function to use as callback
    function doStuffWithDom(domContent) {
        console.log("doStuffWithDom1");
        console.log("I received the following DOM content:\n" + domContent);
    }

    // When the page-action button is clicked...
    chrome.pageAction.onClicked.addListener(function (tab) {
        console.log("popup.js here3");
        // ...check the URL of the active tab against our pattern and...
        //if (urlRegex.test(tab.url)) {
            //// ...if it matches, send a message specifying a callback too
            //chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom);
        //}
        chrome.tabs.sendMessage(tab.id, { text: 'report_back'}, doStuffWithDom);
    });


    
    console.log("popup.js here4");
    var theTot = 999;

    //grab ALL elements from DOM with selector    .install-count
    jQuery('.install-count').each(function () {
        console.log("popup.js here5");
        var currentElement = $(this);
        var value = currentElement.val(); // if it is an input/select/textarea field
        console.log(value);
    });
 

    console.log("popup.js here6 heres the tot...");
    console.log(theTot);
    var display = document.getElementById('daTotal');
    display.innerHTML = theTot;

    console.log("popup.js here7");


    ////////////// When button clicked do something
    //////////////$('#GetTotalBtn').click(function () {
    //////////////    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //////////////        chrome.tabs.sendMessage(tabs[0].id, { action: "GetTotalBtn" });
    //////////////    });
    //////////////});
  
});