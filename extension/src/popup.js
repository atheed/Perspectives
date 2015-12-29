// Called when the user clicks on the browser action.
// Send a message to the current tab
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"}, function(relatedArticles) {
    	$("#loadingContent").html("");
    	$("#relatedArticles").html("");
    	$.each(relatedArticles, function(i, article) {
    		$("#relatedArticles").append("<a href='"  + article[1] + "'>" + article[0] + "</a>");
    		$("#relatedArticles").append("<p></p>");
    	});
    });
});