/**
*
* -----------------------------------------------------------------------------
*
* Template : #
* Author : #
* Author URI : #

* -----------------------------------------------------------------------------
*
**/

(function ($) {
    "use strict";

    // pisticky Menu
    var header = $('.rts-header');
    var win = $(window);
    win.on('scroll', function () {
        var scroll = win.scrollTop();
        if (scroll < 100) {
            header.removeClass("rts-sticky");
        } else {
            header.addClass("rts-sticky");
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    //preloader
    $(window).on('load', function () {
        $("#rts__preloader").delay(1000).fadeOut(400);
        $("#rts__preloader").delay(1000).fadeOut(400);
    });

    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    //Clients Slider
    if ($('.innerpage-carousel').length) {
        $('.innerpage-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: false,
            centerPadding: '160px',
            centerMode: true,
            responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        centerMode: false,
                        centerPadding: '0px',
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        arrows: false,
                        centerPadding: '0px',
                        centerMode: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    function Tabs() {
        var bindAll = function () {
            var menuElements = document.querySelectorAll('[data-tab]');
            for (var i = 0; i < menuElements.length; i++) {
                menuElements[i].addEventListener('click', change, false);
            }
        }

        var clear = function () {
            var menuElements = document.querySelectorAll('[data-tab]');
            for (var i = 0; i < menuElements.length; i++) {
                menuElements[i].classList.remove('active');
                var id = menuElements[i].getAttribute('data-tab');
                document.getElementById(id).classList.remove('active');
            }
        }

        var change = function (e) {
            clear();
            e.target.classList.add('active');
            var id = e.currentTarget.getAttribute('data-tab');
            document.getElementById(id).classList.add('active');
        }

        bindAll();

        
    }
     // image slide gsap
     gsap.to(".images", {
        scrollTrigger:{
          // trigger: ".images",
          start: "top bottom", 
          end: "bottom top", 
          scrub: 1,
          // markers: true
        },
        y: -300,
      });
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
    }

    function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }
    
    for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }
    
    currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
    }

    function animateLetterOut(cw, i) {
    setTimeout(function() {
            cw[i].className = 'letter out';
    }, i*80);
    }

    function animateLetterIn(nw, i) {
    setTimeout(function() {
            nw[i].className = 'letter in';
    }, 340+(i*80));
    }

    function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }
    
    wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);


    
    function TextChange() {
        var blockLetters = new TimelineMax({paused:true}),
        albumLetters = new TimelineMax({paused:false}),
        fullText = $("#fullText"),
        splitHeadline = new SplitText(fullText, {type:"words,chars"}), 
        chars = splitHeadline.chars,
        bgController = $("#backgroundController"),
        letter = $(".letter"),
        letterTiming = 0.6,
        spaceTiming = 0.8,
        stringsArray = ["Function", "Developer", "Rooms", "Intorior", "Design"],
        currentString = 0;
  
  
      function revertSplit(targetSplit, newString){
    
        if(newString !== undefined){
          // go to the nxt string
          currentString++;
          // reset the text timeline
          albumLetters.pause(0).clear();
          // revert the tet split
          targetSplit.revert();
    
          // set the container's opacity to 0 and change the text
          TweenLite.set(fullText, {autoAlpha:0, text:{value:newString}});
    
          // reset the split text
          splitHeadline = new SplitText(fullText, {type:"words,chars"});
          chars = splitHeadline.chars;
    
          // container's opacity back to 1
          TweenLite.set(fullText, {autoAlpha:1});
    
          albumLetters
            .staggerFrom(chars,0.6, {opacity:0, y: -20}, 0.1)
            .staggerTo(chars,0.6, {opacity:0, y: 20}, 0.05,'+=0', revertSplit, [splitHeadline,stringsArray[currentString]])
            .play();
    
        } else {
          currentString = 0;
          revertSplit(splitHeadline, stringsArray[currentString]);
        }
    
      }
      currentString++;
  
      albumLetters
      .staggerFrom(chars,0.6, {opacity:0, y: -20}, 0.1)
      .staggerTo(chars,0.6, {opacity:0, y: 20}, 0.05,'+=0', revertSplit, [splitHeadline,stringsArray[currentString]]);

    };

    var connectTabs = new Tabs();


})(jQuery);

// Get the button:
let topBtn = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$(document).ready(function () {
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    document.getElementById('year').innerHTML=currentYear;

});

let portfolioMultiPage=1;

function loadMultiPage(){
    let pageName='multipage-'+portfolioMultiPage+'.html';
    $("#portfolioMultiPage").load(pageName);
    portfolioMultiPage+=1;
    if(portfolioMultiPage===4){
        $('#portfolioMultiPagebtn').hide();
    }
}

let portfolioSinglePage=1;

function loadSinglePage(){
    let pageName='singlepage-'+portfolioSinglePage+'.html';
    $("#portfolioSinglePage").load(pageName);
    portfolioSinglePage+=1;
    if(portfolioSinglePage===4){
        $('#portfolioSinglePagebtn').hide();
    }
}

let portfolioShowcase=1;

function loadShowcase(){
    let pageName='showcase-'+portfolioShowcase+'.html';
    $("#portfolioShowcase").load(pageName);
    portfolioShowcase+=1;
    if(portfolioShowcase===4){
        $('#portfolioShowcasebtn').hide();
    }
}