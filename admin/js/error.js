    window.onerror = function (message, url, lineNo) 
        {
        alert('Error: ' + message + 
              '\nUrl: ' + url + 
              '\nLine Number: ' + lineNo);
        return true;   
        };