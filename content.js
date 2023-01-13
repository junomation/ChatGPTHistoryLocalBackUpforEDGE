chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "saveContent") {
        let main = document.getElementsByTagName('main');    
        let html = main[0].outerHTML;
        let title = document.title;
        chrome.runtime.sendMessage({
            action: "download",
            html: html,
            title: title
        }, function(response) {
            if(response && response.status === "success") {
                sendResponse({ status: "success" });
            }
            else
            {
            }
            return true;
        });
    }
});