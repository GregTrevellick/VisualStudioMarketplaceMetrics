$(function () {
    console.log('here');

    var theTot = 999;

    //grab ALL elements from DOM with selector    .install-count
    //sum their values into 'theTot'

    console.log(theTot);
    $('#daTotal').val(theTot);//i want this to be the dom of pop.html but i suspect is looking in the dom of the page

    

    // When button clicked do something
    //$('#GetTotalBtn').click(function () {
    //    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //        chrome.tabs.sendMessage(tabs[0].id, { action: "GetTotalBtn" });
    //    });
    //});
  
});