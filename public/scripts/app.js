/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [{
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

$(document).ready(function () {

  function renderTweets(tweets) {
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