document.addEventListener('DOMContentLoaded', function() {


  const imageId = 110 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`


  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // - As a user, when the page loads I will see an image, any comments that image has, and the number of likes that image has.
  // Action - onload
  // DOM - image, comments, number of likes
  // GET request to load data

  fetch(imageURL)
    .then(resp => resp.json())
    .then(displayImg)


  function displayImg(img_data) {
    // find if HTML element(s) exists in the DOM

    const imgURLFormat = `${img_data.url}`
    // assign const to the element
    const imgEl = document.getElementById('image')
    imgEl.setAttribute('src', imgURLFormat)

    let likesEl = document.getElementById('likes')
    // assign innerHTML
    likesEl.innerHTML = `${img_data.like_count}`

    const commentsEl = document.getElementById('comments')

    const comments = img_data.comments

    comments.forEach( function(comment) {
    // if elements don't exist create them in forEach
    const commentLi = document.createElement('li')
    commentLi.innerHTML = comment.content
    commentsEl.append(commentLi)
    })


    // - As a user, I can click to like an image, which will increase the number of likes that image has by one.
    // Action - click image
    // DOM - show number of likes
    // JS - number of likes

    const likeBtn = document.getElementById('like_button')
    likeBtn.addEventListener('click', function(e) {
      e.preventDefault()
      e.stopPropogation()
      // idk my likes keep increasing on page refresh
      likesEl++
      // console.log(likeEl)
      // console.log(total_likes)
    })

    fetch(likeURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: likesEl
      })
    })

    // need to show the new likeCount on the site, this was working before the backend stuff...
  }

  // - As a user I can fill out an input fields and submit the form to add a comment to an image. I should see my new comment below any previous comments.
  // Action - submit form
  // DOM - get input value in form
  const inputComment = document.getElementById('comment_input').value
  const inputCommentBtn = document.getElementById('comment_form')
  inputCommentBtn.addEventListener("submit", function(e) {
    e.preventDefault()
    const newCommentLi = document.createElement('li')
    newCommentLi.innerHTML = document.getElementById('comment_input').value
    const commentsUl = document.getElementById('comments')
    commentsUl.append(newCommentLi)

    // - As a user, when I refresh the page, any comments or likes I have added should be persisted to the backend API and I should see my changes on the page.
    // Action - submit form
    // DB - PATCH request
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        // idk the inputComment isn't persisting the content
        content: inputComment
      })
    })

// close function
})

// end DOM function
})
