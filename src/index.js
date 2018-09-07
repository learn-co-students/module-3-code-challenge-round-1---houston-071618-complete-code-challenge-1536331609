document.addEventListener('DOMContentLoaded', function() {

  const imageId = 132 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let like_count = 0

  // As a user, when the page loads I will see an image, any comments that image has, and the number of likes that image has.

  // Fetch works. Hooray!
  fetch('https://randopic.herokuapp.com/images/132')
    .then(resp => resp.json())
    .then(function(imageObject){
      insertImage(imageObject)
      insertLikes(imageObject)
      insertComment(imageObject)
    })

  //Can access imageObject and its contents. First attempt to get it on the page.
  // function insertImage(imageObject){
  //   const imagePlace = document.getElementById('image')
  //   const imageTemplate = `<img src="${imageObject.url}" id="132" data-id/>
  //   <h4 id="${imageObject.name}"></h4>
  //   <span>Likes:
  //     <span id="${imageObject.like_count}">${imageObject.like_count}</span>
  //   </span>
  //   <button id="like_button">Like</button>
  // <form id="comment_form">
  //   <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  //   <input type="submit" value="Submit"/>
  // </form>
  // <ul id="comments">
  //  <li>${imageObject.comments.content}</li>
  // </ul>`
  //   imagePlace.innerHTML = imageTemplate
  // }

  //Can access imageObject and its contents. Second attempt to get it on the page.

    function insertImage(imageObject){
      const imagePlace = document.getElementById('image')
      const imageTemplate = `<img src= "${imageObject.url}" id="image" data-id=132 />
      <h4 id="${imageObject.name}"></h4>`
      imagePlace.innerHTML = imageTemplate
    }

    function insertLikes(imageObject){
      const likePlace = document.getElementById('likes')
      const likeTemplate = `<span id="likes">${imageObject.like_count}</span>`
      likePlace.innerHTML = likeTemplate
    }

    function likeIncrementer(likes){
      const likeButton = document.getElementById('like_button')
      likeButton.addEventListener('click', function(event){
        ++like_count
      })
    }

    //got comment on page. Hooray!
    function insertComment(imageObject){
      const commentPlace = document.getElementById('comments')
      const commentTemplate = `
      <ul id="comments">
        <li>${imageObject.comments[0].content}</li>
      </ul>`
      commentPlace.innerHTML = commentTemplate
    }


});
