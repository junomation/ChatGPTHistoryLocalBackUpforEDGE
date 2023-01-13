async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}


var saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", async function(){
    let tab = await getActiveTabURL();
    return new Promise(function(resolve, reject) {
        chrome.runtime.sendMessage({
            action: "save",
            tabId: tab.id
        }, function(response) {
            if(response && response.status === "success") {
                resolve(response);
            } else {
            }
            return true;
        });
    });
});