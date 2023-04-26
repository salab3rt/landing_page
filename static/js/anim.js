
$(document).ready(function() {
    var trig = $('.tri-box');
    var clic = $('.click');
    var apodLink = $('#apod-link');
    var apod = {
        "url": "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
        "method": "GET",
        "timeout": 0,
    };

    var apodrandom = {
        "url": "https://api.nasa.gov/planetary/apod?count=1&api_key=DEMO_KEY",
        "method": "GET",
        "timeout": 0,
    };
    var apodVid = '<iframe id="apod-vid" width="100%" height="auto" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      
    $('a[href="#modal-apod"]').click(function(event) {
        event.preventDefault();
        $(this).modal({
          fadeDuration: 250,
        });
    });

    $.ajax(apod).done(function (response) {
        var imgdate = response.date
        console.log(imgdate)
        var formattedDate = moment(imgdate, "YYYY-MM-DD").format("YYMMDD");
        console.log(formattedDate)

        apodLink.attr('href', 'https://apod.nasa.gov/apod/ap' + formattedDate + '.html')
        if (response.media_type === "video"){
            $('#apod-img').html(apodVid)
            $('#apod-vid').attr('src', response.url);
        } else {
            $('#apod-img').css('background-image', "url(" + response.url + ")");
            $('#apod-img-modal').attr('src', response.url);
        }
        $('.apod-title').html(response.title);
        $('.apod-description').html(response.explanation);
        if (response.copyright) {
          $('.apod-author').html('Author: ' + response.copyright + ' ' + response.date);
        } else {
          $('.apod-author').html('Date: ' + response.date);
        }
    });

    $('.apod-card').css('display', 'none');

    $('#getrandomapod').click(function(event){
        event.stopPropagation();
        $.get(apodrandom).done(function(response) {
            console.log(response);
            var imgdate = response[0].date
            var formattedDate = moment(imgdate, "YYYY-MM-DD").format("YYMMDD");

            apodLink.attr('href', 'https://apod.nasa.gov/apod/ap' + formattedDate + '.html')
            if (response[0].media_type === "video"){
                if ($('apod-vid')){
                    $('#apod-vid').remove();
                }
                $('#apod-img').html(apodVid)
                $('#apod-vid').attr('src', response[0].url);
                $('#apod-img').css('background-image', 'None');
            } else {
                $('#apod-vid').remove();
                $('#apod-vid').attr('src', '');
                $('#apod-img').css('background-image', "url(" + response[0].url + ")");
                $('#apod-img-modal').attr('src', response[0].url);
            }
            $('.apod-title').html(response[0].title);
            $('.apod-description').html(response[0].explanation);
            if (response[0].copyright) {
              $('.apod-author').html('Author: ' + response[0].copyright + ' ' + response[0].date);
            } else {
              $('.apod-author').html('Date: ' + response[0].date);
            }
        });
        
    });



    

    var canslide = true
    $('.tri').click(function() { 
        if (trig.hasClass('trig-anim-out')) {
            trig.removeClass('trig-anim-out');
            canslide = true
        }
        trig.addClass('trig-anim-in');
        $('.apod-card').css('display', 'block');

        $('.tri').addClass('tri1').fadeIn('slow');
        if (canslide) {
            $( ".apod-side-title" ).toggle( "slide right" );
        };
        
        canslide = false;
        if (clic.hasClass('click-anim-rev')) {
            clic.removeClass('click-anim-rev');
        }
        clic.fadeOut('slow').addClass('click-anim');
        $('.disc').delay(1000).fadeIn('slow');
                
            //}
        });
    // trig.mouseleave(function() {
        // if (trig.hasClass('trig-anim-in')) {
            // trig.removeClass('trig-anim-in');
            // trig.addClass('trig-anim-out');
        // }
        // $('.tri').removeClass('tri1').fadeIn('slow');
        // if (clic.hasClass('click-anim')) {
            // $( ".apod-side-title" ).toggle( "slide right" )
            // clic.removeClass('click-anim');
            // clic.delay(700).fadeIn('slow').addClass('click-anim-rev');
            // $('.disc').fadeOut('slow');
            // $('.apod-card').hide();
        // }
    // });
        
});

//https://api.jqueryui.com/slide-effect/


// var form = new FormData();
// form.append("email", "salabert57@gmail.com");

// var settings = {
//   "url": "https://api.jwstapi.com/api/key",
//   "method": "POST",
//   "timeout": 0,
//   "processData": false,
//   "mimeType": "multipart/form-data",
//   "contentType": false,
//   "data": form
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });




// $.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
//     var number = data['number'];
//     $('#spacepeeps').html(number);

//     data['people'].forEach(function (d) {
//          $('#astronames').append('<li>' + d['name'] + '</li>');
//     });
// });


// $.getJSON('https://ipapi.co/8.8.8.8/json/', function(data){
//   console.log(data)
// })