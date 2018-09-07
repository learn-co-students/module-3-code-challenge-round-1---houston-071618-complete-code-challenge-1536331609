document.addEventListener('DOMContentLoaded', function() {

  const imageId = 108 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  imageFetch(imageURL)
  currentImageURL = imageURL

})
let currentImageURL = ''
const imageTag = document.querySelector('#image')
const nameTag = document.querySelector('#name')
const likesTag = document.querySelector('#likes')
const commentsList = document.querySelector('#comments')
const likeButton = document.querySelector('#like_button')
const commentForm = document.querySelector('#comment_form')
let currentImageId = 0
let currentImage = {}

likeButton.addEventListener('click', (e) => {
  addLike()
})

function addLike () {
  let newLikeNumber = parseInt(likesTag.innerText) + 1
  likesTag.innerText = newLikeNumber
  currentImage.like_count = newLikeNumber
  updateImageLike(currentImage)
}

commentForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formInput = e.target.comment_input
  let newComment = createComment(formInput)
  displayComment(newComment)
  databaseComment(currentImage, newComment)
  clearForm()

})

function clearForm () {
  commentForm.comment_input.value = ''
}

function createComment(formInput) {
  let newComment = new Comment(formInput.value, currentImageId)
  return newComment
}
function createImage (id, url, name, count, commentArray) {
  currentImage = new Image (id, url, name, count, commentArray)
}

function updateImageLike (currentImage) {
  
  fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: currentImage.id
    })
      
  })
}

function databaseComment (currentImage, newcomment) {
  fetch('https://randopic.herokuapp.com/comments', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: currentImage.id,
      content: newcomment.content
    })

  })
}






function imageFetch (imageURL) {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => loadImage(image))
}

function loadImage (image) {
  currentImageId = image.id
  imageTag.src = image.url
  nameTag.innerText = image.name
  likesTag.innerText = image.like_count
  createImage(image.id, image.url, image.name, image.like_count, image.comments)
  handleComments(image.comments)
}

function handleComments(comments) {
  comments.forEach (comment => {
    displayComment(comment)
  })

}

function displayComment(comment) {
  let li = document.createElement('li')
  li.innerText = comment.content
  commentsList.appendChild(li)
}


// {
//   "id": 108,
//   "url": "http://blog.flatironschool.com/wp-content/uploads/2017/06/5-year-event-352x200.jpg",
//   "name": "Avi and Adam",
//   "like_count": 0,
//   "comments": [
//     {
//       "id": 1133,
//       "content": "first comment!",
//       "image_id": 108,
//       "created_at": "2018-09-07T10:03:02.655Z",
//       "updated_at": "2018-09-07T10:03:02.655Z"
//     }


