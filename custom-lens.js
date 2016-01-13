var $ = require('jquery');
var username_element = '.cr__lens .cr__gallery-activity .cr__gallery-activity-username>a';
var activity_count = 0;


$('head').append('<link rel="stylesheet" type="text/css" href="dist/cr_verify.css">');

// Initial load
var timer = setInterval(function(){ load_monitor() }, 50);

function load_monitor() {
    //console.log('Crowdriff is loading.');

    if ($(username_element).length > 0) {

        //console.log('Crowdriff has finished loading.');
        clearInterval(timer);
        cr_verify();
        clear_url();
        clear_anchor();
    }
}




// Load more click
$(document).on('click', '.cr__gallery-load-more', function() {
    if($(this).hasClass('busy')) {
    } else {

        $('.cr__gallery-load-more').addClass('busy');

        var timer = setInterval(function(){ batch_load_monitor() }, 50);

        function batch_load_monitor() {

            //console.log('Crowdriff is loading a batch.');
            if ($('.cr__gallery-activity').length > activity_count) {

                //console.log('Crowdriff has finished loading a batch.');
                clearInterval(timer);
                cr_verify();

                $('.cr__gallery-load-more').removeClass('busy');
            }
        }
    }
});




//clear lightbox link on mobile
function clear_anchor(){

    if( $(window).width() < 768) {
        $('.cr__gallery-activity > a').each(function() {

            $('.cr__gallery-activity > a').replaceWith(function(){
                return $('<div>' + $(this).html() + '</div>');
            });

        });
    }
}




// Verify Accounts
function cr_verify(){

    //console.log('Crowdriff elements to check: ' + $(username_element).not('.cr_verify_checked').length);

    $(username_element).not(':has(.cr_verify_checked)').each(function() {

        var username_str = ($(this).attr('href'));
        var username = username_str.split('/');

        // Verified class
        if(username[3] == cr_verify_usernames.twitter_username || username[3] == cr_verify_usernames.instagram_username || username[3] == cr_verify_usernames.facebook_username) {
            $(this).parent().parent().parent().parent().parent().addClass('cr_verify');
        }

        // Twitter class
        if(username[2] == 'twitter.com') {
            $(this).parent().parent().parent().parent().parent().addClass('cr_verify_twitter');
        }

        // Instagram class
        if(username[2] == 'instagram.com') {
            $(this).parent().parent().parent().parent().parent().addClass('cr_verify_instagram');
        }

        // Facebook class
        if(username[2] == 'www.facebook.com') {
            $(this).parent().parent().parent().parent().parent().addClass('cr_verify_facebook');
        }

        // Checked class
        $(this).addClass('cr_verify_checked');

        // Update count
        activity_count = $('.cr__gallery-activity').length;

        fix_more_button();
        clear_anchor();
    });
}




//Clear URL
function clear_url(){

    //if social page, don't clear all the way
    if (window.location.href.indexOf('social.php') > 0) {
        history.replaceState("", "", "social.php");
    } else {
        history.replaceState("", "", "/");
    }



}


// Close Lightbox (close button)
$(document).on('click', '.cr__fullscreen-close', function() {

    var interval_timer = setInterval(function(){ lens_check() }, 50);

    function lens_check() {
        if (window.location.href.indexOf('gallery') > 0) {
            clearInterval(interval_timer);
            clear_url();
            fix_more_button();
        }
    }
});


// Close using esc key
$(document).keyup(function(e) {
    if (e.keyCode == 27) {

        var interval_timer = setInterval(function(){ lens_check() }, 50);

        function lens_check() {
            if (window.location.href.indexOf('gallery') > 0) {
                clearInterval(interval_timer);
                clear_url();
                fix_more_button();
            }
        }
    }
});



// Fix More button
function fix_more_button() {

    $('.cr__gallery-load-more')
        .addClass('lens_button')
        .html('View More')
    ;
}