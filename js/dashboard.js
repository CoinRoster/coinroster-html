function setupDashboard(index){
    // Get the modal
    window['dash_index'] = index;
    document.getElementById('stats_modal').style.display = "block";
    document.getElementsByClassName("modal-body")[index].scrollTop = 0;
    document.getElementsByClassName("stats_table")[index].style.display = "block";
    document.getElementsByClassName("newsfeed")[index].style.display = "none";
    
    function photo_align(media_query) {
        if (media_query.matches) { // If media query matches
            document.getElementsByClassName('playerphoto')[index].setAttribute('align', 'center');
        }
        else {
            document.getElementsByClassName('playerphoto')[index].setAttribute('align', 'auto');
        }
    }
    var media_query = window.matchMedia("(max-width: 767px)");
    photo_align(media_query); // Call listener function at run time
    media_query.addListener(photo_align); // Attach listener function on state changes

}

var index = window.dash_index;
news_button = "news_tab_" + index;
stats_button = "stats_tab_" + index;
var news_button = document.getElementById(news_button);
var stats_button = document.getElementById(stats_button);

var news_tab = document.getElementsByClassName("newsfeed")[index];
var stats_tab = document.getElementsByClassName("stats_table")[index];
twitter_class = "twitter-widget-" + index;
var doc = document.getElementById(twitter_class).contentWindow.document;

news_button.onclick = function() {
    console.log("news tab clicked");
   news_tab.style.display = "block";
   stats_tab.style.display = "none";
   setTimeout(function() {
       resize_twitter();
   }, 100);
};
stats_button.onclick = function() {
    console.log("stats tab clicked");
   news_tab.style.display = "none";
   stats_tab.style.display = "block";
};
doc.getElementsByClassName("timeline-LoadMore-prompt")[0].onclick = function() {
    setTimeout(function() {
       resize_twitter();
    }, 500);
};
function resize_twitter(){

    var tweets = doc.getElementsByClassName("timeline-Tweet-text");
    var media = doc.getElementsByClassName("timeline-Tweet-media");
    for (var i = 0; i < tweets.length; i++) {
        tweets[i].style.fontSize = "100%";
        tweets[i].style.lineHeight = "16px";
    }
    for (var i = 0; i < media.length; i++){
        media[i].style.display = "none";
    }
}