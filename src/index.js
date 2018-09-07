const imageCard = document.getElementById('image_card')
const likeCountSpan = document.getElementById('likes')
const commentsUL = document.getElementById('comments')
const likeButton = document.getElementById('like_button')
const commentForm = document.getElementById('comment_form')

document.addEventListener('DOMContentLoaded', function() {
  const imageId = 101 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes`
  const commentsURL = `https://randopic.herokuapp.com/comments`
  const imageDiv = document.getElementById('image')

  fetch(imageURL)
    .then(res => res.json())
    .then(data => renderData(data))

  function renderData(data) {
    // debugger
    renderImage(data.url)
    renderName(data.name)
    renderLikes(data.like_count)
    renderComments(data.comments)
  }

  function renderImage(imageURL) {
    // imageDiv.src = imageURL
    imageCard.firstElementChild.src = imageURL
  }
  
  function renderName(imageName) {
    imageCard.children[1].innerText = imageName
  }
  
  function renderLikes(imageLikes) {
    likeCountSpan.innerText = imageLikes
  }
  
  function renderComments(imageCommentsArray) {
    imageCommentsArray.forEach(comment => {
      renderComment(comment.content, comment.id)
    })
  }
  
  function renderComment(comment, id=null) {  
    let newComment = document.createElement('li')
    newComment.innerHTML = `${comment}<button data-id=${id}>Delete</button>`
    newComment.addEventListener('click', e => deleteComment(e))
    commentsUL.append(newComment)
  }

  function addLike() {
    let currentLikes = likeCountSpan.innerText
    
    likeCountSpan.innerText = parseInt(currentLikes) + 1;
    
    (function updateLikeDatabase() {
      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: `${imageId}`
        })
      })
        .then(data => notifyOnFailure(data))
    })()
  }
  
  function addComment(e) {
    e.preventDefault()
    let commentText = e.target.firstElementChild.value
    
    renderComment(commentText);
    
    (function updateCommentDatabase() {
      fetch(commentsURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: `${imageId}`,
          content: `${commentText}`
        })
      })
        .then(data => notifyOnFailure(data))
    })()
  }
  
  function deleteComment(e) {
    let commentId = e.target.dataset.id
    let commentLi = e.target.parentElement

    commentLi.remove();
    
    (function deleteCommentInDatabase() {
      fetch(`${commentsURL}/${commentId}`, {
        method: "DELETE",
      })
    })()
  }
  
  function notifyOnFailure(data) {
    if (data.status !== 200) {
      window.alert("Could not connect to remove server!")
    }
  }
  
  likeButton.addEventListener('click', () => addLike())
  commentForm.addEventListener('submit', e => addComment(e))
})

