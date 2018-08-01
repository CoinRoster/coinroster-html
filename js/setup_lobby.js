function get_counts(data){
    var call = api({
      method: "IncludePrivateContests",
      args: {
          active_subs: data
      }
    });
    if (call.status === "1") 
      return call.counts;
    else return null;
}

function get_active_subs(){
    var arr = [];
    var subs = document.getElementsByClassName("lobby_body_container")[0].children;
    for(i = 0; i < subs.length; i++){
        sub_cat = subs[i].href.split("&sub=")[1];
        arr.push(sub_cat)
    }
    return arr;
}
    
function populate_lobby(rtn){
    var subs = document.getElementsByClassName("lobby_body_container")[0].children;
    for(i = 0; i < subs.length; i++){
        sub_cat = subs[i].href.split("&sub=")[1].toUpperCase();
        console.log(sub_cat)
        var open_div = subs[i].getElementsByClassName("open_contests_class")[0];
        var in_play_div = subs[i].getElementsByClassName("in_play_detail")[0];
        var open = rtn[sub_cat].open;
        console.log("open: " + open);
        if(open > 0){
            open_div.innerHTML = open + " open";
            open_div.classList.add("green");
        }else{
             open_div.innerHTML = "0 open";
        }
        var in_play = rtn[sub_cat].in_play;
        console.log("in play: " + in_play);
        if(in_play > 0){
            in_play_div.innerHTML = in_play + " in play";
            in_play_div.classList.add("orange");
        }else{
             in_play_div.innerHTML = "0 in play";
        }
    }
}
    
var arr = get_active_subs();
var rtn = get_counts(arr);
populate_lobby(rtn);
    