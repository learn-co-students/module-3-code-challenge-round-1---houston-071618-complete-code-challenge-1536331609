document.addEventListener('DOMContentLoaded', function() {

  const imageId = 112 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector('#image_card')
  
  const likeButton = document.querySelector('#like_button')

  const form = document.querySelector('#comment_form')


  fetch("https://randopic.herokuapp.com/images/112")
    .then(res => res.json())
    .then(parseImage)

  function parseImage(image) {
 
    const template = `
    <img src="${image.url}" id="image" data-id="">
    <h4 id="name"></h4>
    <span>Likes:
    <span id="likes">0</span>
    </span>
    <button class="like" id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    <li> ${image.comments[0].content} </li>
    `
    imageCard.innerHTML = template

  }

  imageCard.addEventListener('click', like)
  
    function like(event) {
      event.preventDefault()
      if (event.target.className === "like") {
  
        let liked = event.target.previousElementSibling;
        let totalLikes = parseInt(event.target.previousElementSibling.children[0].innerText);
        liked.innerHTML = `Likes: ${++totalLikes}`
        debugger
        
        fetch(`https://randopic.herokuapp.com/likes/112`, {
          			method: "POST",
          			body: JSON.stringify({
                  likes_count: totalLikes,
                  image_id: 112
          			}),
          			headers: {
                  'Accept': 'application/json',
          				"Content-Type": "application/json"
          			}
          		})
          		}
      }

  
   form.addEventListener('submit', addComment)

   function addComment(event) {
     console.log("hello")
  
    event.preventDefault()
      if (event.target.id === "comments") {
        
        const commentTemplate = `
        <li>  </li>
        `


      }

   }
      
      
  
      
    


})

// function like(event) {

// 	if (event.target.className === "like-btn") {
// 		// console.log("clicked", event.target);
    
// 		let id = event.target.id;
// 		let liked = event.target.previousElementSibling;
// 		let totalLikes = parseInt(event.target.previousElementSibling.innerText);
// 		liked.innerHTML = `${++totalLikes} likes`

// 		//save likes to db
// 		fetch(`http://localhost:3000/toys/${id}`, {
// 			method: "PATCH",
// 			body: JSON.stringify({
// 				likes: totalLikes
// 			}),
// 			headers: {
// 				"Content-Type": "application/json"
// 			}
// 		})
// 		}
// }
