    function id(_id)
        {
        return document.getElementById(_id);
        }
        
    function show(_id, override)
        {
        var display_type = "block";
        if (typeof override !== "undefined") display_type = override;
        if (typeof _id === "string") id(_id).style.display = display_type;
        else _id.style.display = display_type;
        }
        
    function hide(_id)
        {
        if (typeof _id === "string") id(_id).style.display = "none";
        else _id.style.display = "none";
        }
        
    function get_inputs_with_attribute(attribute)
        {
        var matching_inputs = [];
        var all_inputs = document.getElementsByTagName('input');
        for (var i=0, limit=all_inputs.length; i<limit; i++)
            {
            if (all_inputs[i].getAttribute(attribute) !== null) matching_inputs.push(all_inputs[i]);
            }
        return matching_inputs;
        }

    function destroy(_id)
        {
        var _el = document.getElementById(_id);
        _el.parentNode.removeChild(_el);
        }
            
    function new_table(parent)
        {
        var parent_element = id(parent);
        parent_element.innerHTML = "";
        var table = document.createElement("table");
        parent_element.appendChild(table);
        return table;
        }
        
    function new_row(table, row_index, data)
        {
        var row = table.insertRow(row_index),
        array = [row];
        for (var i=0; i<data.length; i++)
            {
            var cell = row.insertCell(i); 
            cell.innerHTML = data[i];
            array.push(cell);
            }
        return array;
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
        
    function dateconv_date_start_time(d)
        {
        var 
        
        date = new Date(d),
        date_string = dateconv_ms_to_string(date),
        date_ms = Date.parse(date_string);
        
        return date_ms;
        }
    
    function dateconv_get_gmt_date(d)
        {
        var 
        
        date = new Date(d),
        date_string = dateconv_ms_to_string(date),
        date_ms = Date.parse(date_string),
        offset = date.getTimezoneOffset() * 60000;
        
        return date_ms + offset;
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
        if (typeof selector === "string") selector = id(selector);
        return selector.options[selector.selectedIndex].value;
        }
        
    function selectorHTML(selector)
        {
        if (typeof selector === "string") selector = id(selector);
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
        
    function toBTC(raw_value)
        {
        var 
        
        input_value = raw_value.toString().replace(/[^0-9$.]/g, ''),
        allow_decimal = true,
        output_value = "",
        decimal_limit = input_value.length;

        for (var i=0; i<decimal_limit; i++)
            {
            var char = input_value.charAt(i);
            if (char === ".")
                {
                if (allow_decimal)
                    {
                    decimal_limit = i + 9;
                    output_value += char;
                    allow_decimal = false;
                    }
                }
            else output_value += char;
            }
        
        return (+output_value).toFixed(8);
        }
    
    function commas(x) 
        {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
       
    function get_ordinal_suffix(i) 
        {
        var 
        
        j = i % 10,
        k = i % 100;

        if (j === 1 && k !== 11) return "st";
        if (j === 2 && k !== 12) return "nd";
        if (j === 3 && k !== 13) return "rd";
        
        return "th";
        }
        
    function set_focus(_id)
        {
        setTimeout(function()
            {
            id(_id).focus();
            },100);
        }
        
    function right_align(row, index_array)
        {
        index_array.forEach(function(index) 
            {
            row[index].style.textAlign = "right";
            });
        }
 
    Array.prototype.contains = function(value) 
        {
        for (var i=0; i<this.length; i++) if (this[i] === value) return true;
        return false;
        };
 
    function logout()
        {
        api({method: "Logout", args: {}});
        location  = "/";
        }

    var session = api({method: "GetSessionDetails", args: {}});