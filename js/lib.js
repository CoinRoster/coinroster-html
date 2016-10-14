    function id(_id)
        {
        return document.getElementById(_id);
        }
                
    function show(_id)
        {
        return id(_id).style.display = "block";
        }
                        
    function hide(_id)
        {
        return id(_id).style.display = "none";
        }
        
    function destroy(_id)
        {
        var _el = document.getElementById(_id);
        _el.parentNode.removeChild(_el);
        }
        
    function api(call)  
        {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../" + call.method + ".api", false);
        xhr.send(encodeURIComponent(JSON.stringify(call.args)));
        var output = JSON.parse(xhr.responseText);
        return output;
        }

    function get_cookie(name) 
        {
        var temp_cookie = "; " + document.cookie;
        var parts = temp_cookie.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        }
        
    function set_cookie(name, value) 
        {
        document.cookie = name + "=" + value + "; path=/;";
        }
        
    function validate_email(email) 
        {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
        }
         
    function dateconv_ms_to_string(d)
        {
        d = new Date(+d);
        var date = d.getDate();
        if (date < 10) date = "0" + date;
        return (["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()] + " " + date + " " + d.getFullYear());
        }
        
    function dateconv_ms_to_time(d)
        {
        d = new Date(+d);

        var 
        
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return (hours + ':' + minutes + ':' + seconds);
        }
    
    function timeSince(ms) 
        {
        var seconds = Math.floor((new Date().getTime() - ms) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval >= 1) 
            {
            var unit = " year";
            if (interval > 1) unit += "s";
            return interval + unit + " ago";
            }

        interval = Math.floor(seconds / 2592000);

        if (interval >= 1) 
            {
            var unit = " month";
            if (interval > 1) unit += "s";
            return interval + unit + " ago";
            }

        interval = Math.floor(seconds / 86400);

        if (interval >= 1) 
            {
            var unit = " day";
            if (interval > 1) unit += "s";
            return interval + unit + " ago";
            }

        interval = Math.floor(seconds / 3600);

        if (interval >= 1) 
            {
            var unit = " hour";
            if (interval > 1) unit += "s";
            return interval + unit + " ago";
            }

        interval = Math.floor(seconds / 60);

        if (interval >= 1) 
            {
            var unit = " minute";
            if (interval > 1) unit += "s";
            return interval + unit + " ago";
            }

        interval = Math.floor(seconds);
        
        // at least one second:
        
        interval = Math.max(interval, 1);
        
        var unit = " second";
        if (interval > 1) unit += "s";
        return interval + unit + " ago";
        }

    function selectorValue(selector)
        {
        return selector.options[selector.selectedIndex].value;
        }
        
    function selectorHTML(selector)
        {
        return selector.options[selector.selectedIndex].innerHTML;
        }

    function toCurrency(num)
        {
        if (num !== "")
            {
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                {
                num = "0";
                }

            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();

            if (cents < 10)
                {
                cents = "0" + cents;
                }
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                {
                num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                }

            return (((sign) ? '' : '-') /*+ '$'*/ + num + '.' + cents);
            }
        else return "";
        }
        
    function fromCurrency(num)
        {
        return Number(num.replace(/[^0-9\.]+/g,""));
        }
        
    function commas(x) 
        {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
            
    function login()
        {
        var
        
        username = id("login_username").value,
        password = id("login_password").value;

        if (username === "" || password === "") return false;

        setTimeout(function()
            {
            var call = api({
                method: "login",
                args: {
                    username: username,
                    password: password
                }
            });
            if (call.status === "1") location = "/account";
            else
                {
                id("message").innerHTML = "<ul><li>Invalid Credentials!</li></ul>";
                id("message").style.color = "red";
                id("login_username").value = "";
                id("login_password").value = "";
                }
            },100);
        return false;
        }
      
    function logout()
        {
        api({method: "logout", args: {}});
        location  = "/";
        }

    var session = api({method: "get_session_details", args: {}});