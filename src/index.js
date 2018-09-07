//unable to complete code challenge without seeing/following previous examples.

document.addEventListener('DOMContentLoaded', function () {

  const imageId = 111

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
    .then(response => response.json())
    .then(data => {
      //grabbing the image id where I want to place it in the DOM
      const image = document.getElementById('image')
      //setting the image src to the provided imageURL
      image.src = imageURL

      const likes = document.getElementById('likes')
      const comments = document.getElementById('comment_input')
      const btn = document.getElementById('like_button')



    })


})
