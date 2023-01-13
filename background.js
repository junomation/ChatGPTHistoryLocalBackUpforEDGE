chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "save") {
        let tabId = request.tabId;
        return new Promise(function(resolve, reject) {
            chrome.tabs.sendMessage(tabId, { action: "saveContent" }, function(response) {
                if(response && response.status === "success") {
                    resolve(response);
                } else {
                    reject(Error("It broke"));
                }
                return true;
            });
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "download") {
        return new Promise(function(resolve, reject) {
            chrome.downloads.download({
                url: "data:text/html," + encodeURIComponent(request.html),
                filename: request.title + ".html"
            }, function(downloadId) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                }
                if (downloadId === undefined) {
                    console.log("Download failed");
                } else {
                    console.log("Download started with ID: " + downloadId);
                    resolve({status: "success", downloadId: downloadId});
                }
                return true;
            });
        });
    }
})    
