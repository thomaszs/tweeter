/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  function renderTweets(tweets) {
    $('#tweet-section').empty();
    for (let index of tweets) {
      let tweet = createTweetElement(index)
      $('#tweet-section').prepend(tweet)
    }
  }

  $('form').on('submit', function (e) {
    e.preventDefault();
    let data = $('form').serialize();
    let form = $('#input-field').val();
    if (!form) {
      alert("Please type in something!");
      return;
    } else if (form.length > 140) {
      alert("You have exceeded the input limit");
      return;
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: data,
      }).done(function(res) {
        loadTweets(res);
        $('#input-field').val('');
        $('.counter').text(140);
      })
    }
  })

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetdata) {
        renderTweets(tweetdata);
      }
    })
  }
  
  loadTweets()

  $('#nav-bar button.compose' ).click(function() {
    $('#nav-bar button.compose').css('cursor', 'pointer');
    $('section.new-tweet' ).slideToggle( "slow", function() {
      $('#input-field').focus();
    });
  });

  function createTweetElement(tweet) {

    let dataName = tweet.user.name;
    let dataImg = tweet.user.avatars.small;
    let dataHandle = tweet.user.handle;
    let dataBody = tweet.content.text;
    let dataDate = tweet.created_at;

    let $h3 = $('<h3>').text(dataName);
    let userLogo = $('<img>').attr('src', dataImg).addClass('user-logo');
    let userHandle = $('<span>').text(dataHandle).addClass('user-handle');
    $h3.append(userLogo, userHandle);

    let $header = $('<header>');
    $header.append($h3);

    let tweetbody = $('<p>').text(dataBody).addClass('tweet-body');

    let icon1 = $('<i>').addClass('fas fa-flag');
    let icon2 = $('<i>').addClass('fas fa-retweet');
    let icon3 = $('<i>').addClass('fas fa-heart');
    let $iconClass = $('<span>').addClass('icon');
    let $tweetdate = $('<p>').text(dataDate).addClass('tweet-date');
    let $footer = $('<footer>');
    $iconClass.append(icon1, icon2, icon3);
    $tweetdate.append($iconClass);
    $footer.append($tweetdate);

    let $tweet = $('<article>').addClass('tweet');
    $tweet.append($header, tweetbody, $footer);

    return $tweet
  }
  // renderTweets(data);
})