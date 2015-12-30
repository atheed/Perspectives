// Called when the user clicks on the browser action.
// Send a message to the current tab
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"}, function(relatedArticles) {
    	$("#loadingContent").html("");
    	$("#relatedArticles").html("");
    	if (relatedArticles === "Error") {
    		$("#relatedArticles").append("There is not enough context on this page to find related articles");
    	} else {
    		$.each(relatedArticles, function(i, article) {
	    		$("#relatedArticles").append("<div class='article'><a class='article-link' href='"  + article[1] + "'>" + article[0] + "</a><br />" + 
	    			"<h5>Published on: " + article[2] + "<br />Source: " + article[3] + "</h5>" + "<p></p>" + "</div>");
	    	});
    	}
    });
});



/*

if (relatedArticles === "Error") {
    		$("#relatedArticles").append("There is not enough context on this page to find related articles");
    	}
*/