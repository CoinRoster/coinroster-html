function change_text(){
    var call = api({
        method: "GetLandingString",
        args: {}
    });
    if (call.status === "1") return call.html;
    else return null;
}
var field = document.getElementById("lobby_value_prop");
if(field !== null)
    field.innerHTML = change_text();