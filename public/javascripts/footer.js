$(function () {

  /* 'import' required variable from HTML page */

  var isSignupPage = $('#is-signup-page').val();
  if (isSignupPage == 'true')
    isSignupPage = true;
  else
    isSignupPage = false;

  var isCreateGamePage = $('#is-create-game-page').val();
  if (isCreateGamePage == 'true')
    isCreateGamePage = true;
  else
    isCreateGamePage = false;

  var isGamesPage = $('#is-games-page').val();
  if (isGamesPage == 'true')
    isGamesPage = true;
  else
    isGamesPage = false;

  console.log("$('#section-3').height():");
  console.log($('#section-3').height());
  console.log("typeof($('#section-3').height()):");
  console.log(typeof($('#section-3').height()));
  console.log("$('#section-3').position():");
  console.log($('#section-3').position());

  // // $('body').scrollTo($('#section-3').position(), {
  //   $(window).scrollTo({top : $('#section-3').position().top+$(window).height()*2, left:50}, {
  //     // offsetTop: $(window).height(),
  //     // offset: 1000,
  //     duration: 1500
  // });
  // $(window).scrollto($('#section-1'));

  var width = $(window).width();
  var height = $(window).height();
  $('body').css({
    'margin' : 0,
    'width' : width,
    'padding' : 0,
  });
  $('.section').css({
    'width': 'inherit',
    'margin' : 0,
    'height' : height*1.2
    // 'background-image' : "url('/images/stadium.png')"
  });
  // $('.section').css('margin', 0);
  // $('.section').css('oveflow', 'hidden');

  // if ({{isSignupPage}})
  //     $('body').css({
  //       'margin' : 0,
  //       'width' : width,
  //       'padding' : 0,
  //       'background-image' : "url('/images/stadium-crop.png')",
  //       'background-size' : 'cover'
  //     });

  var MAROON = '#5D0F0D';

  $('a').mouseover(function () {
    $(this).css({
      'color' : MAROON,
      'text-decoration' : 'none'
    });
  });

  $('a').mouseleave(function () {
    $(this).css('color', 'grey');
  });

  $('.big-a').mouseleave(function () {
    $(this).css({
      'color' : 'white', 
      'text-decoration' : 'none'
    });
  });

  $('.nav-a,.nav-btn').click(function (event) {

    console.log('event.target.className:');
    console.log(event.target.className);

    // if btn
    if (event.target.className.indexOf('glyphicon') != -1) {
      console.log('is button');
      var goTo = event.target.id;
      goTo = goTo.substr('nav-glyph-'.length, goTo.length);
      goTo = Number(goTo);
      console.log('goTo:');
      console.log(goTo);

      $(window).scrollTo($('#section-' + String(goTo+1)), {
          // offset: $(window).height()*goTo,
          // offset: 1000,
          duration: 501
      });

      $('#nav-'+String(goTo+1)).parent().siblings().removeClass('active');
      $('#nav-'+String(goTo+1)).parent().addClass('active');

    } else if (event.target.className.indexOf('nav-btn') != -1) {
      console.log('is button');
      var goTo = event.target.id;
      goTo = goTo.substr('nav-btn-'.length, goTo.length);
      goTo = Number(goTo);
      console.log('goTo:');
      console.log(goTo);

      $(window).scrollTo($('#section-' + String(goTo+1)), {
          // offset: $(window).height()*goTo,
          // offset: 1000,
          duration: 501
      });

      $('#nav-'+String(goTo+1)).parent().siblings().removeClass('active');
      $('#nav-'+String(goTo+1)).parent().addClass('active');

    } else {
      var goTo = event.target.id;
      goTo = goTo.substr('nav-'.length, goTo.length);
      goTo = Number(goTo);
      console.log('goTo:');
      console.log(goTo);

      $(window).scrollTo($('#section-' + String(goTo)), {
          // offset: $(window).height()*goTo,
          // offset: 1000,
          duration: 501
      });

      $(this).parent().siblings().removeClass('active');
      $(this).parent().parent('li').addClass('active');
    }

  });

  // if({{isSignupPage}}) {
    
  //   console.log('activate signup nav-btn');
  //   // $('#nav-'+String(goTo+1)).parent().siblings().removeClass('active');
  //   // $('#nav-'+String(goTo+1)).parent().addClass('active');
  //   $('.navbar-nav').children('li').removeClass('active');
  //   $('#nav-3').parent('li').addClass('active');

  //   console.log("$('#nav-3').parent('li').attr('class')");
  //   console.log($('#nav-3').parent('li').attr('class'));
  // }

  // console.log('\n\n\n');
  // console.log('isSignupPage');
  // console.log({{isSignupPage}});
  // console.log('\n\n\n');

  // $('.nav-btn').click(function (event) {

  //   var goTo = event.target.id;
  //   goTo = goTo.substr('nav-btn-'.length, goTo.length);
  //   goTo = Number(goTo);
  //   console.log('goTo:');
  //   console.log(goTo);

  //   $(window).scrollTo($('#section-' + String(goTo+1)), {
  //       // offset: $(window).height()*goTo,
  //       // offset: 1000,
  //       duration: 501
  //   });

  //   $(this).parent().siblings().removeClass('active');
  //   $(this).parent().addClass('active');

  // });

  $(window).scroll(function() {

    var scrollTop = $(window).scrollTop();

    if (scrollTop < $('#section-2').position().top) {
      console.log('@section-1');
    } else if (scrollTop < $('#section-3').position().top) {
      console.log('@section-2');
    }

      // console.log("$(window).scrollTop()");
      // console.log($(window).scrollTop());

      // console.log("$(#section-1).position().top - 19");
      // console.log($('#section-1').position().top - 19);

      // console.log("($('#section-3').position().top + height:");
      // console.log($('#section-3').position().top + $(window).height());
  });

/* Signup functions */

  // GET list of universities that match keyWords
  $('#school').keyup(function () {

    var keyWords = '';
    keyWords = $('#school').val();

    // // TEST
    // console.log('keyWords:');
    // console.log(keyWords);

    if (keyWords.length >= 0) {

      $.ajax({
        type : 'GET',
        url : '/get-all-universities',
        data : {
          'keyWords' : keyWords
        },
        success : function (response) {
          // console.log('/get-all-universities SUCCESS\n');
          // console.log('response:');
          // console.log(response);

          if (response.length > 7)
            response = response.slice(0, 7);

          var schools = '';
          for (i in response) {
            if (i != response.length - 1)
              schools += response[i].name + ', ';
            else
              schools += response[i].name;
          }

          // $('#result').text(schools);

          $('#result').text('');

          // instead of text,
          // use jquery object to create dropdowns
          $('<div/>')
            // .addClass('dropdown')
            .attr({
              id : 'dropdown',
              style : 'color:grey;width:100%;border-width:1px;'
            })
            .appendTo('#result');

          $('<div>')
            // .addClass('dropdown-menu')
            .attr({
              id : 'dropdown-menu',
              style : 'background-color:#fff0e3;border-width:1px;border-style:solid;'
            })
            .appendTo('#dropdown');

          for (i in response) {
            var school = response[i];
            $('<div>')
              .appendTo('#dropdown-menu')
              .attr({
                id : 'dropdown-item-' + String(i)
              })
              .text(school.name);
          }
        },
        error : function (err) {
          console.log('/get-all-universities ERROR\n');
          console.log('err:');
          console.log(err);
        },
        dataType : 'json'
      });

    }

  });


  $('div').mouseover(function (event) {
    var id = event.target.id;

    // console.log('INSIDE: DIV mouseenter');
    // console.log("id:");
    // console.log(id);

    // console.log("$('#' + id).attr('id'):");
    // console.log($('#' + id).attr('id'));

    if ((id.indexOf('dropdown-item') != -1)) {

      $('#' + id).hover(function () {
        // change color of target
        var mugo = $(this)
        mugo.attr('style', 'background-color:#EE7AE9;');
        // update input
        $('#school').val(mugo.text());
      });

      $('#' + id).mouseleave(function () {
        // change color of target
        var mugo = $(this)
        mugo.attr('style', 'background-color:#fff0e3;');
      });     

      $('#' + id).click(function() {
        var mugo = $(this)
        mugo.attr('style', 'background-color:#EE7AE9;');
        // update input
        $('#school').val(mugo.text());
        // collapse the dropdown
        $('#dropdown-menu').remove();
      });

      $('body').click(function() {
        // collapse if clicked not on dropdown
        $('#dropdown-menu').remove();
      });
    } 
  });


  if (isSignupPage) {
    console.log('activate signup nav-btn');
    // $('#nav-'+String(goTo+1)).parent().siblings().removeClass('active');
    // $('#nav-'+String(goTo+1)).parent().addClass('active');
    $('.navbar-nav').children('li').removeClass('active');
    $('#nav-4').parent('li').addClass('active');

    console.log("$('#nav-').parent('li').attr('class')");
    console.log($('#nav-4').parent('li').attr('class'));

    $('body').css({
      'margin' : 0,
      'width' : width,
      'padding' : 0,
      'background-image' : "url('/images/stadium-crop.png')",
      'background-size' : 'cover'
    });

  }

  if (isCreateGamePage) {
    // admin adds more time to input for a game
    $('#add-more-time').click(function (event) {

      console.log('clicked add more time');

      // insert a new time input after the latest one
      var nTimes = $('.time-input').size();
      var lastTimeInput = $('.time-input').last();

      console.log('lastTimeInput.val():');
      console.log(lastTimeInput.val());
      console.log('nTimes:');
      console.log(nTimes);

      // create base div
      var nTimeDivs = $('.div-time-input').size();
      var divTimeInput = $('<div/>').attr({
        'id' : 'div-time-input-' + String(nTimeDivs),
        'class' : 'div-time-input'
      });
      divTimeInput.appendTo('#time-input-base');

      // create and append <span>from</span>
      $('<span/>').text('From')
      .appendTo(divTimeInput);
      // create a new start time input
      var starttime = $('<input/>').attr({
        'name' : 'starttimes',
        'id' : 'starttime-' + String(nTimes),
        'type' : 'time',
        'placeholder' : 'start time',
        'aria-describedby' : 'sizing-addon2'
      })
      .addClass('form-control')
      .addClass('time-input')
      // append
      .appendTo(divTimeInput);
      // starttime.insertAfter(lastTimeInput);
      // line break
      $('<br>').appendTo(divTimeInput);
      // $('<br>').insertAfter(lastTimeInput);
      // create <span>to</span>
      var to = $('<span/>').text('To');
      // and append
      to.appendTo(divTimeInput);
      // create a new end time input
      var endtime = $('<input/>').attr({
        'name' : 'endtimes',
        'id' : 'endtime-' + String(nTimes),
        'type' : 'time',
        'placeholder' : 'end time',
        'aria-describedby' : 'sizing-addon2'
      })
      .addClass('form-control')
      .addClass('time-input')
      // append
      .appendTo(divTimeInput);;
      // // append
      // endtime.insertAfter(to);
      // line break and horizontal line
      $('<hr>').insertAfter(
        $('<br>').insertAfter(
          $('<br>').appendTo(
            divTimeInput
      )));

    });
  }

  if (isGamesPage) {
    /* all /games specific codes should be here  */

    $('.game-heading').click(function (event) {
      var game = event.target.id;
      game = game.slice('heading-'.length, game.length);
      console.log('game:');
      console.log(game);

      // toggle show game body
      ('#body-' + game).toggle();
    });

    $('.game-container').click(function (event) {
      var game = event.target.id;
      game = game.slice('heading-'.length, game.length);
      console.log('game:');
      console.log(game);

      // toggle show game body
      $('#body-' + game).toggle(400);
    });    

    $('.game-name').click(function (event) {
      var game = event.target.id;
      game = game.slice('game-name-'.length, game.length);

      // toggle show game body
      $('#body-' + game).toggle(400);
    });    

    $('.game-heading').mouseover(function (event) {
      $(this).css({
        'cursor' : 'pointer'
      });
    });
  }

});
