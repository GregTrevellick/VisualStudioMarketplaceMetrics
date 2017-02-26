console.log("content script 0");

//Set up the active tab to listen to for messages from popup.js (like "gimme all d/l count elements")
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
       console.log("content script 1");
   
        //if (msg.text === 'report_back') {//ocmPcnVrm2
        if (request.action == "ocmPcnVrm1") {
           // console.log("content script 2");
            // Call the specified callback, passing the web-page's DOM content as argument
            sendResponse(document.all[0].outerHTML);
        }

       // console.log("content script 3");
    }

);

chrome.runtime.sendMessage({ action: "show" });
//Content scripts are the only component of an extension that has access to the web-page's DOM.
