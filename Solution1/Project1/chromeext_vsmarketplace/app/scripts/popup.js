$(function () {
    console.log('here');

    var theTot = 999;

    debugger;

    //grab ALL elements from DOM with selector    .install-count
    var dlcounts = document.getElementsByClassName('install-count');
    console.log(dlcounts.item(0));
    console.log(dlcounts.innerHTML);
    theTot = dlcounts.innerHTML;
    //sum their values into 'theTot'

    console.log(theTot);
    // $('#daTotal').val(theTot);
    var display = document.getElementById('daTotal');
    display.innerHTML = theTot;




    // When button clicked do something
    //$('#GetTotalBtn').click(function () {
    //    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //        chrome.tabs.sendMessage(tabs[0].id, { action: "GetTotalBtn" });
    //    });
    //});
  
});