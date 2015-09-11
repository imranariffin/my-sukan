$(function () {


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

});

