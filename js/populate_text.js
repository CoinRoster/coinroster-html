function change_text(){
    var call = api({
        method: "GetLandingString",
        args: {}
    });
    if (call.status === "1") return call.html;
    else return null;
}
document.getElementById("lobby_value_prop").innerHTML = change_text();