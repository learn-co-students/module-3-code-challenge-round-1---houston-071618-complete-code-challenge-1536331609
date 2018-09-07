document.addEventListener('DOMContentLoaded', function() {
})

const imageId = 105 //Enter your assigned imageId here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`


fetch(imageURL)
  .then(res => res.json())
  .then(picture => addPictureToPage(picture))

function addPictureToPage(picture) {
  console.log(picture)
  picturePost = document.getElementById("name")
  picturePost.innerHTML +=
  `
  <img src=${picture.url}>
  <p>${picture.name}</p>
  `
  likeButton = document.getElementById("like_button")
  likeCounter = document.getElementById("like_counter")
  likeCounter.innerHTML =
  `
  <span id="likes">Likes: ${picture.like_count}</span>
  `
  likeButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (event.type === "click") {
      picture.like_count += 1
      likeCounter.innerHTML =
      `
      <span id="likes">Likes: ${picture.like_count}</span>
      `
      fetch(likeURL, {
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 105
        })
      })
    }
  })

  submitButton = document.getElementById("comment_form")
  commentList = document.getElementById("comments")
  submitButton.addEventListener("submit", (event) => {
    event.preventDefault()
    if (event.type === "submit") {
      commentList.innerHTML +=
      `
      <li>${event.target.comment.value}</li>
      `
      fetch(commentsURL, {
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 105,
          content: event.target.comment.value
        })
      })
    }
  })
  }
  
