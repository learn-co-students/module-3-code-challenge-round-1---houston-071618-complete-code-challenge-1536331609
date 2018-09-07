//unable to complete challenge without seeing/following examples.

document.addEventListener('DOMContentLoaded', function () {

  const imageId = 111

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

  const imageCard = document.getElementById('image_card')

  imageCard.append()

  //unable to complete challenge without seeing examples.
})
