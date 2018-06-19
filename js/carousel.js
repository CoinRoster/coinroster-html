    (function(){

        var 

        fade_speed = 2000,
        fade_interval = 6000,

        current_slide = 1,
        number_of_slides = document.getElementsByClassName("slide").length;

        setInterval(function()
            {
            current_slide++;
            if (current_slide > number_of_slides)
                {
                for (var i=2; i<number_of_slides; i++) document.getElementById("slide_" + i).style.opacity = 0;
                $('#slide_' + number_of_slides).fadeTo(fade_speed, 0);
                current_slide = 1;
                }
            else $('#slide_' + current_slide).fadeTo(fade_speed, 1);
            }, 
        fade_interval);

    })();