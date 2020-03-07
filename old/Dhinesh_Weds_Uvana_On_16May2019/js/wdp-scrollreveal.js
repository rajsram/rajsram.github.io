/*
Version : 1.1
*/

jQuery(window).load(function($){

    "use strict";
    
    /* Scroll Reveal Animation for element(s) */
    
    var wdp_site_title = {
        origin   : "top", // 'bottom', 'left', 'top', 'right'
        distance : "10vh", // Can be any valid CSS distance, e.g. '5rem', '10%', '20vw', etc.
        duration : 800, // Time in milliseconds
        opacity  : 0, // Starting opacity value, before transitioning to the computed opacity.
        delay    : 0, // No Time Delay
        reset    : false, // Reveals occur once as elements become visible
        easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)', // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
    };
    
    var wdp_site_title_groom = {
        origin   : "left",
        distance : "20vh",
        duration : 1000,
        opacity  : 0,
        delay    : 100,
        reset    : false,
    };
    
    var wdp_site_title_bride = {
        origin   : "right",
        distance : "20vh",
        duration : 1000,
        opacity  : 0,
        delay    : 100,
        reset    : false,
    };
    
    var wdp_nav = {
        origin   : "bottom",
        distance : "2vh",
        duration : 800,
        opacity  : 0,
        delay    : 800,
        reset    : false,
        mobile   : false, // true/false to control reveal animations on mobile.
    };
    
    var wdp_splash_inner = {
        origin   : "top",
        distance : "8vh",
        duration : 1400,
        opacity  : 0,
        scale    : 0,
        delay    : 1000,
        reset    : false,
    };
    
    var wdp_splash_hearts = {
        origin   : "bottom",
        distance : "8vh",
        duration : 1600,
        opacity  : 0,
        scale    : 0,
        delay    : 1200,
        reset    : false,
    };
    
    var wdp_section_title = {
        origin   : "top",
        distance : "8vh",
        duration : 600,
        opacity  : 0,
        scale    : 0,
        delay    : 10,
        reset    : false,
    };
    
    var wdp_countdown_item_inner = {
        origin   : "bottom",
        distance : "8vh",
        duration : 800,
        opacity  : 0,
        scale    : 0,
        delay    : 50,
        reset    : false,
    };
    
    
    var wdp_about_groom = {
        origin   : "left",
        distance : "20vh",
        duration : 1000,
        opacity  : 0,
        delay    : 100,
        reset    : false,
    };
    
    var wdp_about_bride = {
        origin   : "right",
        distance : "20vh",
        duration : 1000,
        opacity  : 0,
        delay    : 100,
        reset    : false,
    };
    
    var wdp_home_event_item = {
        origin   : "bottom",
        distance : "8vh",
        duration : 800,
        opacity  : 0,
        scale    : 0,
        delay    : 50,
        reset    : false,
    };
    
    var wdp_home_form = {
        origin   : "bottom",
        distance : "8vh",
        duration : 800,
        opacity  : 0,
        scale    : 0,
        delay    : 50,
        reset    : false,
    };
    
    var wdp_carousel_swiper = {
        origin   : "bottom",
        distance : "8vh",
        duration : 800,
        opacity  : 0,
        scale    : 0,
        delay    : 50,
        reset    : false,
    };

    
    var wdp_home_registry_inner = {
        origin   : "bottom",
        distance : "8vh",
        duration : 800,
        opacity  : 0,
        scale    : 0,
        delay    : 50,
        reset    : false,
    };
    
    var wdp_contact_bar_address = {
        origin   : "top",
        distance : "8vh",
        duration : 600,
        opacity  : 0,
        scale    : 0,
        delay    : 10,
        reset    : false,
    };
    
    var wdp_contact_bar_phone = {
        origin   : "left",
        distance : "20vh",
        duration : 1000,
        opacity  : 0,
        delay    : 100,
        reset    : false,
    };
    
    var wdp_contact_bar_mail = {
        origin   : "right",
        distance : "20vh",
        duration : 1000,
        opacity  : 0,
        delay    : 100,
        reset    : false,
    };
    
    window.sr = ScrollReveal() ;
    
    sr.reveal( ".wdp_site_title", wdp_site_title );
    sr.reveal( ".wdp_site_title .groom", wdp_site_title_groom );
    sr.reveal( ".wdp_site_title .bride", wdp_site_title_bride );
    sr.reveal( ".wdp_nav", wdp_nav );
    sr.reveal( ".wdp_splash_inner", wdp_splash_inner );
    sr.reveal( ".wdp_splash_hearts", wdp_splash_hearts );
    sr.reveal( ".wdp_section_title", wdp_section_title );
    sr.reveal( ".wdp_countdown_item_inner", wdp_countdown_item_inner );
    sr.reveal( ".wdp_about_groom", wdp_about_groom );
    sr.reveal( ".wdp_about_bride", wdp_about_bride );
    sr.reveal( ".wdp_home_event_item", wdp_home_event_item );
    sr.reveal( ".wdp_home_form", wdp_home_form );
    sr.reveal( ".wdp_carousel_swiper", wdp_carousel_swiper );
    sr.reveal( ".wdp_home_registry_inner", wdp_home_registry_inner );
    sr.reveal( ".wdp_contact_bar_address", wdp_contact_bar_address );
    sr.reveal( ".wdp_contact_bar_phone", wdp_contact_bar_phone );
    sr.reveal( ".wdp_contact_bar_mail", wdp_contact_bar_mail );

});