var jsonResponse;

// sample jQuery.ajax() call to get related articles for a particular stirng
$.ajax({
    type: "POST",
    url: "https://news-api.lateral.io/recommend-by-text/",
    headers: { 
        "subscription-key": "21b109cfad5536905f5cf081ed599cee"
    },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
        "text":"Machine learning is a subfield of computer science that evolved from the study of pattern recognition and computational learning theory in artificial intelligence. Machine learning explores the construction and study of algorithms that can learn from and make predictions on data."
    }),
    success: function (data) {
        jsonResponse = JSON.stringify(data);
    },
    error: function () {
        jsonResponse = "Error";
    }
});


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            console.log(jsonResponse);
        }
    }
);