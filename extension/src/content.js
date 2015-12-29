var textResponse;
var jsonResponse;
var uniqueListOfWords;
var currentUrl = window.location.href;

// sample jQuery.ajax() call to get important keywords in a text
$.ajax({
    type: "POST",
    url: "https://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords",
    async: false,
    data: {
        "url":currentUrl,
        "apikey":"70feaf9092b12babf41a9a9909499c1307091db0",
        "maxRetrieve":"10",
        "keywordExtractMode":"strict",
        "outputMode":"json"
    },
    success: function (data) {
        textResponse = JSON.stringify(data);
        var obj = $.parseJSON(textResponse);
        var keywords = "";
        $.each(obj.keywords, function(i, keyword) {
            keywords = keywords + keyword.text + " ";
        });
        uniqueListOfWords = getUniqueKeywords(keywords);
        console.log(uniqueListOfWords);
    },
    error: function () {
        textResponse = "Error";
    }
});

// sample jQuery.ajax() call to get related articles for a particular stirng
$.ajax({
    type: "POST",
    url: "https://news-api.lateral.io/recommend-by-text/",
    headers: { 
        "subscription-key": "21b109cfad5536905f5cf081ed599cee"
    },
    async: false,
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
        "text":uniqueListOfWords
    }),
    success: function (data) {
        jsonResponse = JSON.stringify(data);
    },
    error: function () {
        jsonResponse = "Error";
    }
});

function getUniqueKeywords(keywords) {
    return keywords.split(' ').filter(function(allItems,i,a){
        return i==a.indexOf(allItems);
    }).join(' ');
};


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            //console.log(textResponse);
            //console.log("-----------");
            console.log(jsonResponse);
        }
    }
);