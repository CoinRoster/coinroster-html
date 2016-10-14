    (function(){
        
        var 

        fade_timeout = 1000,
        number_of_slides = 5,
        interval_direction = 0,
        photo_index = number_of_slides;

        setInterval(function()
            {
            if (interval_direction === 0) 
                {
                $("#carousel_bg_" + photo_index).fadeOut(fade_timeout);
                photo_index--;
                }
            else 
                {
                $("#carousel_bg_" + photo_index).fadeIn(fade_timeout);

                setTimeout(function()
                    {
                    for (var i=1; i<photo_index; i++)
                        {
                        $("#carousel_bg_" + i).fadeIn(1);
                        }
                    }, fade_timeout);

                interval_direction = 0;
                }

            if (photo_index === 1)
                {
                if (interval_direction) interval_direction = 0;
                else interval_direction = 1;
                photo_index = number_of_slides;
                }
            }, 7000);
            
        setTimeout(function()
            {
            for (var i=4; i>=1; i--)
                {
                id("carousel_bg_" + i).className += " carousel_bg_" + i;
                }
            }, 2000);

        })();