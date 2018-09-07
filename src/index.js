document.addEventListener('DOMContentLoaded', function() {

  const imageId = 116 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById('image_card')
  const imageLocation = imageCard.children[0]
  const nameLocation = imageCard.children[1]
  const likesLocation = imageCard.children[2].children[0]
  const commentsLocation = imageCard.children[5]
  const likeButton = document.getElementById('like_button')
  const likeCountSpan = document.querySelector('span span')
  const commentInput = document.getElementById('comment_input')
  const commentSubmitButton = document.querySelector('#comment_form').children[1]
  const commentsSection = document.querySelector('ul#comments')

  likeButton.addEventListener('click', increaseLikeCount)
  commentSubmitButton.addEventListener('click', addComment)
  // commentsSection.addEventListener('click', deleteComment)

  // function deleteComment() {
  //   event.preventDefault()
  // }

  function addComment() {
    event.preventDefault()
    let newLi = document.createElement('li')
    newLi.innerText = commentInput.value
    let deleteBtn = document.createElement('button')
    deleteBtn.id = 'delete-comment'
    deleteBtn.innerText = 'X'
    newLi.append(deleteBtn)
    commentsSection.append(newLi)
    addCommentToDB()

    commentInput.value = ""
  }

  function addCommentToDB() {
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentInput.value
      })
    })
  }

  function increaseLikeCount() {
    event.preventDefault()
    likeCountSpan.innerText = parseInt(likeCountSpan.innerText) + 1
    increaseDBLikeCount()
  }

  function increaseDBLikeCount() {
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  }

  function fetchImageInfo() {
    fetch(imageURL)
      .then(resp => resp.json())
      .then(resp => populatePage(resp))
  }

  function populatePage(resp) {
    generateTemplate(resp)
  }

  function generateTemplate(resp) {
    let url = resp.url
    let name = resp.name
    let likes = resp.like_count
    let comments = resp.comments

    imageLocation.src = url
    nameLocation.innerText = name
    likesLocation.innerText = likes

    let newComments = generateCommentsTemplate(comments)

  }

  function generateCommentsTemplate(comments) {
    for (let i = 0; i < comments.length; i++) {
      let newLi = document.createElement('li')
      newLi.innerText = comments[i].content
      document.getElementById('image_card').children[5].append(newLi)
    }
  }

  fetchImageInfo()

})
