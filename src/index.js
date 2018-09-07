document.addEventListener('DOMContentLoaded', function() {

  const imageId = 130 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const parseJSON = resp => resp.json()
  const image = document.getElementById('image_card')
  // const likeBtn = document.getElementById('like_button')

  function getImage(imageId) {
    return fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(parseJSON)
    .then(displayImage)
  }
  getImage(130)

  // function updateLike(){
  //   return fetch() {
  //     method: 'PATCH',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         likes :likes
  // }
    

  function displayImage(imageURL) {
    const imageTag = document.createElement('img')
    image.innerHTML = `
    <img id="image" src="http://blog.flatironschool.com/wp-content/uploads/2017/02/Campus_Normal-352x200.png" data-id/>
    <h4 id="name"></h4>
          <span>Likes:
            <span id="likes">${imageURL.like_count}</span>
          </span>
          <button id="like_button" >Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">

          </ul>
    `
    image.prepend(imageTag)
  }

  image.addEventListener('click', function(event) {
    const likeIsClicked = event.target.id === 'like_button'

    if (likeIsClicked) {
      onClick()
      // console.log('hello')
    }
})
  let likes = 0
  function onClick() {
    likes += 1;
    document.getElementById("likes").innerHTML = likes;
  }

  
  
})
