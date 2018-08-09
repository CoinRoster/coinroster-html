function setupDashboard(){
    // Get the modal
    document.getElementById('stats_modal').style.display = "block";
    document.getElementById('stats_model_content').style.display = "table";
    document.getElementsByClassName("modal-body")[0].scrollTop = 0;
    document.getElementsByClassName("stats_table")[0].style.display = "block";
    document.getElementsByClassName("newsfeed")[0].style.display = "none";
    
    var news_button = document.getElementById("news_tab");
    var stats_button = document.getElementById("stats_tab");
    var news_tab = document.getElementsByClassName("newsfeed")[0];
    var stats_tab = document.getElementsByClassName("stats_table")[0];
    var doc = document.getElementById('twitter-widget-0').contentWindow.document;
       
    news_button.onclick = function() {
       news_tab.style.display = "block";
       stats_tab.style.display = "none";
       setTimeout(function() {
           resize_twitter();
       }, 100);
    };
    stats_button.onclick = function() {
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
    
    function photo_align(media_query) {
        if (media_query.matches) { // If media query matches
            document.getElementsByClassName('playerphoto')[0].setAttribute('align', 'center');
        }
        else {
            document.getElementsByClassName('playerphoto')[0].setAttribute('align', 'auto');
        }
    }
    var media_query = window.matchMedia("(max-width: 767px)");
    photo_align(media_query); // Call listener function at run time
    media_query.addListener(photo_align); // Attach listener function on state changes

}