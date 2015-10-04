$(function () {

  $(document).ready(function () {
    $('#body-soccer').show();
  });

  /* 'import' required variable from HTML page */

  var isHomePage = $('#is-home-page').val();
  if (isHomePage == 'true')
    isHomePage = true;
  else
    isHomePage = false;

  var isSignupPage = $('#is-signup-page').val();
  if (isSignupPage == 'true')
    isSignupPage = true;
  else
    isSignupPage = false;

  var isSigninPage = $('#is-signin-page').val();
  if (isSigninPage == 'true')
    isSigninPage = true;
  else
    isSigninPage = false;

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

  var isTweetPage = $('#is-tweet-page').val();
  if (isTweetPage == 'true')
    isTweetPage = true;
  else
    isTweetPage = false;

  var isUsersPage = $('#is-users-page').val();
  if (isUsersPage == 'true')
    isUsersPage = true;
  else
    isUsersPage = false;

  var isCreateTeamPage = $('#is-createteam-page').val();
  if (isCreateTeamPage == 'true')
    isCreateTeamPage = true;
  else
    isCreateTeamPage = false;

  var isTeamPage = $('#is-team-page').val();
  if (isTeamPage == 'true')
    isTeamPage = true;
  else
    isTeamPage = false;

  var isSchedulePage = $('#is-schedule-page').val();
  if (isSchedulePage == 'true')
    isSchedulePage = true;
  else
    isSchedulePage = false;

  var isAccommodationPage = $('#is-accommodation-page').val();
  if (isAccommodationPage == 'true')
    isAccommodationPage = true;
  else
    isAccommodationPage = false;

  var isUpdateProfilePage = $('#is-updateprofile-page').val();
  if (isUpdateProfilePage == 'true')
    isUpdateProfilePage = true;
  else
    isUpdateProfilePage = false;


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

  if (isHomePage) {

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
  }

/* Signup functions */

  // GET list of universities that match keyWords
  $('#school').bind("keyup change", function () {

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

    // // test
    // $('#dropdown-menu').remove();

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
      'background-size' : 'cover',
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

  if (isTweetPage) {

    $('body').css({
      'background-color' : '#0fff3'
    });

    (function(){
      // do some stuff
      setInterval(updateTweet, 3000);
    })();

    function updateTweet () {
      $.ajax({
        type : 'GET',
        url : '/update-tweets',
        data : {},
        success : function (response) {
            console.log('new tweets:');
            console.log(response.statuses);
            var statuses = response.statuses;

            // live update tweets
            $('.twitter-text').each(function (index) {
              $(this).text(statuses[index].text);
              $(this).siblings('.twitter-username')
                .text(statuses[index].user.name);
              $(this).siblings('.twitter-profile-image')
                .attr('src', statuses[index].user.profile_image_url);
              if (statuses[index].entities.media)
              $(this).siblings('.twitter-media')
                .attr('src', statuses[index].entities.media[0].media_url);
              
              var retweeted_status = statuses[index].retweeted_status;

              if (retweeted_status) {
                console.log('retweeted_status.text:');
                console.log(retweeted_status.text);

                $(this).siblings('.rt')
                  .children('.rt-username')
                  .text('@' + retweeted_status.text);

                if (retweeted_status.entities.media) {
                  $(this).siblings('.rt')
                    .children('.rt-media')
                    .attr('src', retweeted_status.entities.media[0].media_url);

                  console.log('media_url:');
                  console.log(statuses[index].retweeted_status.entities.media);
                }
              }
            });

        },
        error : function (err) {
          console.log('err:');
          console.log(err);
        },
        dataType : 'json'
      });
    }
  }

  if (isSigninPage) {
    $('body').css({
      'margin' : 0,
      'width' : width,
      'padding' : 0,
      'background-image' : "url('/images/stadium-crop.png')",
      'background-size' : 'cover'
    });
  }

  if (isUsersPage) {

    // adjust main-div width
    $('#main-div').css({
      'width' : '80%',
      'position' : 'relative',
      'left' : '10%'
    });

    $.ajax({
      type : 'GET',
      url : '/admin/get-users',
      data : {},
      success : function (users) {

        console.log('/admin/get-users');

        createTable($, users);

        // update table with school names
        $('.td-school').each(function () {

          var id = $(this).text();

          console.log('.td-school.each()');
          console.log('id:');
          console.log(id);

          if (id == '')
            console.log('\n\nundeinfed\n\n');

          var that = $(this);

          if (id != '' && id != 'undefined')
            $.ajax({
              type : 'GET',
              url : '/admin/schools',
              data : {
                schoolId : id
              },
              success : function (school) {
                console.log('get school?id success');
                console.log('school:');
                console.log(school);
                that.text(school.name);
              },
              error : function (err) {
                console.log(err);
              },
              dataType : 'json'
            });
          else
            that.text('---');

        });

        $('.td-email').each(function () {
          var text = $(this).text();
          if (text == '' || text == 'undefined')
            $(this).text('---');
        });
        $('.td-sports').each(function () {
          var text = $(this).text();
          if (text == '' || text == 'undefined')
            $(this).text('---');
        });

        // hide annoying table body
        $('.no-records-found').parent('tbody').hide();

      },
      error : function (err) {
        console.log(err);
      },
      dataType : 'json'
    }, 1000);
  }

  // // update table with school names
  // $.ajax({
  //   type : 'GET',
  //   url : '/admin/schools',
  //   data : {},
  //   success : function (schools) {

  //   },
  //   error : function (err) {
  //     console.log(err);
  //   },
  //   dataType : 'json'
  // });

  if (isCreateTeamPage) {
    $('body').css({
      'margin' : 0,
      'width' : width,
      'padding' : 0,
      'background-image' : "url('/images/teamwork.jpg')",
      'background-size' : 'cover',
    });

    $(".dropdown-toggle").dropdown();

    $('.game-li').click(function () {

      console.log('game-li clicked');

      var that = $(this);
      $('#dropdownMenu1').text(that.text());
      $('#dropdownMenu1').append(
        $('<span/>').attr('class', 'caret')
      );

      $('#game-input').val(that.text());
    });

  }

  if (isTeamPage) { // isTeamPage 

    console.log('isTeamPage');

    $('#upload-teamphoto').change(function () {
      $("#upload-file").text($(this).val());
    });

    // update team members: displa member names instead of member ids
    $('.team-members').each(function () {

      var memberIds = $(this).text();
      var that = $(this);

      console.log('team members: ' + that.text());

      $.ajax({
        url : 'api/get-team-member-names',
        data : {memberIds : memberIds},
        success : function (memberNames) {
          // var memberNames = "";
          // for (i in members) {
          //   memberNames += members[i].name + " ";
          // }
          // $('#' + teamId + '-members').text(memberNames);
          that.text(memberNames);

          console.log('\nsuccess /teams/get-member-names\n');

        },
        error : function (err) {
          console.log('error /teams/get-members');
        },
        dataType : 'json'
      })
    });

    $('.join-team-input').hide();

    $('.join-team-btn').click(function (event) {
      $(this).parent().siblings('input').toggle();
    });

    $('.leaders').each(function () {

      var userId = $(this).text();
      userId = userId.replace(/\s+/g, '');
      var that = $(this);

      $.ajax({
        url : '/get-user-by-id',
        data : {
          userId : userId
        },
        success : function (user) {
          console.log('success /get-user-by-id');
          console.log('userId: ' + userId);
          // $('#' + userId).text(user.firstName);
          that.text(user.firstName);
        },
        err : function (err) { 
          console.log('error /get-user-by-id');
        },
        dataType : 'json'
      });
    });

    $('.joined').each(function () {

      var teamId = $(this).attr('id');
      console.log('before slice teamId: ' + teamId);
      teamId = teamId.slice('joined-'.length, teamId.length);
      console.log('teamId: ' + teamId);

      $.ajax({
        url : 'is-user-a-team-member',
        data : {
          teamId : teamId
        },
        success : function (response) {
          console.log('response:');
          console.log(response);
          // unhide span-joined
          if (response.response)
            $('#joined-'+teamId).show();
          if (response.isLeader) {
            $('#showcode-'+teamId).show(700);
            $('#delete-team-'+teamId).show(700);
            // $('#delete-sure-'+teamId).show();
          }

        },
        error : function (err) {
          console.log(err);
        },
        dataType : 'json'
      });
    });

    // delete a team
    $(".delete-team").click(function (event) {
      var targetId = event.target.id;
      console.log('sure? ' + targetId);

      var teamId = targetId.slice("delete-team-".length, targetId.length);

      $('#delete-sure-' + teamId).toggle(300);
    });

    $(".delete-sure").click(function (event) {
      var targetId = event.target.id;
      var teamId = targetId.slice("delete-sure-".length, targetId.length);
      console.log('deleting ' + teamId);

      $.ajax({
        url : '/api/delete-team',
        method : "POST",
        data : {
          teamId : teamId
        },
        success : function (response) {
          var status = response.status;

          console.log("response.status: " + response.status);

          if (status == "OK") {
            console.log("hide team view: " + teamId);
            var team = $("#" + teamId);
            team.hide(1000);
          }
        },
        error : function (err) {
          console.log(err);
        },
        dataType : 'json'
      });

    });

    $(".delete-team, .delete-sure").mouseover(function () {
      $(this).css({
        'cursor' : 'pointer'
      });
    });

  }

  if (isSchedulePage) {
  //   $('body').css({
  //     'margin' : 0,
  //     'width' : width,
  //     'padding' : 0,
  //     'background-image' : "url('/images/schedule.jpg')",
  //     'background-size' : 'cover'
  //   });
    $('.schedule-div').css({
      'display' : 'block',
      '-moz-box-sizing': 'border-box',
      'box-sizing': 'border-box',
      'background': "url(/images/schedule.jpg) no-repeat",
      'width': '100%',
      'height': '736px',
      'padding-left': '180px',
    })
  }

  if (isAccommodationPage) {
    console.log("is isAccommodationPage");

    $(".hotel-background").each(initializeHotels);

    $('body').css({
      'margin' : 0,
      'width' : width,
      'padding' : 0,
      'background-image' : "url('/images/hamilton-fall.jpg')",
      'background-size' : 'cover'
      // 'background-repeat' : 'no-repeat'
    });

  }
  
  if (isUpdateProfilePage) {

    console.log("isUpdateProfilePage");

    $.ajax({
      url : '/api/get-school-name',
      success : function (response) {
        console.log("schoolName: " + response.schoolName);
        $("#school").val(response.schoolName);
      },
      error : function (err) {
        console.log(err);
      },
      dataType : 'json'
    })
  }

});



function createTable ($, users) {

  var data = [];
  var tableStruct = '';

  // set table header
  tableStruct+= 
        '<thead>' +
          '<tr>' +
            "<th style='width:20%;' >First Name</th>" +
            "<th style='width:20%;' >Last Name</th>" +
            "<th style='width:20%;' >School</th>" +
            "<th style='width:15%;' >Email</th>" +
            "<th style='width:10%;' >Sports</th>" +
            "<th style='width:5%;' >paid</th>" +
            "<th style='width:5%;' >volunteer?</th>" +
            "<th style='width:5%;' >FB</th>" +
          '</tr>' +
        '</thead>' +
        '<tbody>';

  // // set table header
  // $('#users-table').append(
// );

  for (i in users) {

    var user = users[i];

    data.push({
      firstName : users[i].firstName,
      lastName : users[i].lastName,
      school : users[i].school
    });

    console.log('data[i]:');
    console.log(data[i]);
    
    var isVolunteer = "<span style='color:red;'>Nope</span>";
    if (user.isVolunteer)
      isVolunteer = "<span style='color:blue';>Yup</span>";
    var hasPaid = "No";
    if (user.hasPaid)
      hasPaid = "Yes";

    // $('#users-table')
    //   .append(
      tableStruct +=
        '<tr>' + 
          '<td>' + user.firstName + '</td>' +
          '<td>' + user.lastName + '</td>' +
          "<td class='td-school'>" + user.school + '</td>' +
          "<td class='td-email'>" + user.email + '</td>' +
          "<td class='td-sports'>" + user.sports + '</td>' +
          "<td class='td-paid'>" + hasPaid + '</td>' +
          "<td class='td-volunteer'>" + isVolunteer + '</td>' +
          "<td class='td-fblinked'>" + user.facebook.isLinked + '</td>' +
        '</tr>';
        // );
  }

  // ends table
  tableStruct += '</tbody>';
  console.log(tableStruct);
  $('#users-table').append(tableStruct);
} 

// callback function inside $('.hotel-background').each();
function initializeHotels () {

  console.log('each hotel background');

  var that = $(this);

  for (i in hotels) {
    
    var hotel = hotels[i];

    var hotelData = "<div class='panel panel-default dummy-div' style='opacity:0'>";
    hotelData += "</div>";
    
    hotelData += "<div class='panel panel-default game-container'>  ";
    
    hotelData += "<div class='panel-heading hotel-heading'>";
    hotelData += "<b class='hotel-name'>";
    hotelData +=  hotel.name;
    hotelData += "&nbsp" + "( " + hotel.location + ")";
    hotelData +=  "</b>";
    hotelData += "</div>";

    hotelData += "<div class='panel-body' style='display:;' id='body-{{id}}'>";

    hotelData += "<p> <b>Cost:</b> ";
    hotelData += hotel.price;
    hotelData += "</p>";

    if (hotel.extras) {
      hotelData += "<p> <b>Extras:</b>";
      hotelData += "<ul>";
    }

    for (i in hotel.extras) {
      hotelData += "<li>" + hotel.extras[i] + "</li>";
    }

    if (hotel.extras)
      hotelData += "</ul></p>";      

    hotelData += "<hr>";

    hotelData += "<p> <b>Phone number:</b> ";
    hotelData += hotel.phone;
    // hotelData += "</p>";

    if (hotel.tollfree) {
      hotelData += " <b>Toll-free number:</b> ";
      hotelData += hotel.tollfree;
    }

    if (hotel.fax) {
      hotelData += " <b>Fax:</b> ";
      hotelData += hotel.tollfree;
    }

    if (hotel.website) {
      hotelData += " <b>Website:</b> ";
      hotelData += "<a href='http://" + hotel.website + "'>" + hotel.website + "</a>";
      hotelData += "</p>";
    }

    hotelData += "</div>";
    
    hotelData += "</div>";

    console.log("that:");
    console.log(that);

    that.append(hotelData);
  }


}

var hotels = [
  {
    name : "Visitor's Inn",
    location : "649 Main St. W.",
    phone : "(905) 529-6979",
    tollfree : "1-800-387-4620 ",
    website : "www.visitorsinn.com ",
    price : "$45-48 /person/night",
    extras : [
      "Free parking",
      "2 KM from University",
      "Highly rated place for customer satisfaction",
      "Indoor pool, restaurant"
    ]
  }, 
  {
    name : "Admiral Inn ",
    location : "149 Dundurn St. N.",
    phone : "(905) 529-2311",
    tollfree : "866-236-4662",
    fax : "(905) 529-9100",
    website : "www.admiralinn.com",
    price : "$42-45 /person/night",
    extras : [
      "Free parking",
      "Opposite of historical Dundurn castle",
      "Close to Bayfront Park/ Hamilton Harbour"
    ]
  }, 
  {
    name : "Day’s Inn",
    location : "210 Main St. East",
    phone : "(905) 528-3297",
    website : "www.hamiltondaysinn.com/",
    price : "$40-45 /person/night",
    extras : [
      "Limited free parking on-site",
      "In downtown Hamilton",
      "Reasonable price",
      "Close to all amenities"
    ]
  }, 
  {
    name : "Holiday Inn Burlington Hotel & Conference Centre",
    website : "www.hiburlington.ca/",
    price : "$42-47 /person/night",
    extras : [
      "Free parking",
      "Near main highway to Hamilton, and close to Niagara highway intersection",
      "High customer rating"
    ]
  }
];