document.addEventListener('DOMContentLoaded', function() {

  const imageId = 135 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageDiv = document.querySelector('#image')
  const likesDiv = document.querySelector('#likes')
  const commentsDiv = document.querySelector('#comments')
  const likeButton = document.querySelector('#like_button')
  const submitButton = document.querySelector('#comment_form')

  fetch(imageURL)
    .then(res => res.json())
    .then(addEverythingToPage)

  function addEverythingToPage(image){
    imageDiv.src = image.url
    likesDiv.innerText = `${image.like_count}`
    const commentsArray = image.comments.map(comment => {
      return comment.content
    })
    commentsArray.forEach(comment => {
      comments.innerHTML += `
      <li>${comment}
      <button id=${comment}>X</button></li>`
    })
  }

  likeButton.addEventListener('click', e => {
    let likesagain = document.querySelector('#likes')
    const newLikes = parseInt(e.target.parentElement.children[2].innerText.split(" ")[1]) + 1
    // debugger
    likesagain.innerHTML = `${newLikes}`

    fetch(likeURL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"},
      body: JSON.stringify({
        "image_id": 135,
        "like_count": `${newLikes}`
      })
    })
      .then(res => res.json())
      .then(dat => console.log(dat))
  })


  submitButton.addEventListener('submit', e => {
    e.preventDefault()
    const inputComment = e.target.children[0].value
    document.querySelector('#comments').innerHTML += `<li>${inputComment}</li>`
    fetch(commentsURL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"},
      body: JSON.stringify({
        "image_id": 135,
        "content": `${inputComment}`
      })
    })
  })

  commentsDiv.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.innerText === "X") {
      e.target.parentElement.remove()
      //then need to post
      fetch(commentsURL, {method: "DELETE"})
    }
  })





})
