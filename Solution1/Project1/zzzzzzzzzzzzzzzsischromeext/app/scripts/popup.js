$(function () {

    $('#EasiPermitsRenewalPermitNumberPin').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "easiPermitsPermitNbrPin" });
        });
    });

    $('#OcmPcnVrm1').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm1" });
        });
    });

    $('#OcmPcnVrm2').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm2" });
        });
    });

    $('#OcmPcnVrm3GetTotal').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "OcmPcnVrm3GetTotal" });
        });
    });

    $('#OcmPcnVrm4').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm4" });
        });
    });

    $('#OcmPcnVrm5').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm5" });
        });
    });

    $('#OcmPcnVrm6').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm6" });
        });
    });

    $('#OcmPcnVrm8').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm8" });
        });
    });

    $('#OcmPcnVrm9').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ocmPcnVrm9" });
        });
    });



});