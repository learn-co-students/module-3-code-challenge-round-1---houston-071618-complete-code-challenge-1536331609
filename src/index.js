document.addEventListener('DOMContentLoaded', function() {

  const imageId = 131

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const parsedJSON = resp => resp.json()

  fetch(imageURL)
  	.then(parsedJSON)
  	.then(addImageData)

  function addImageData(data) {
  	const imgDiv = document.querySelector('#image_card')

  		imgDiv.innerHTML += `
  			<img src="${data.url}" data-id/>
  			<h4 id="name">${data.name}</h4>
  			<span>Likes:
            	<span id="likes">${data.like_count}</span>
          	</span>
          	<button id="like_button">Like</button>
          	<form id="comment_form">
            	<input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            	<input type="submit" value="Submit"/>
          	</form>
          	<ul id="comments">
          	</ul>
  		`


  	const commentsDiv = document.getElementById('comments')

  		commentsDiv.innerHTML += `
  			<li>${data.comments.content}</li>
  		`

  	const likeBtn = document.querySelector('#like_button')
  	// const likeBtnState = false

  	likeBtn.addEventListener('click', addLikes)

  	function addLikes(event) {

  		current_count = data.like_count
  		new_count = current_count+1
		// likeBtnState = !likeBtnState

  		document.querySelector('#likes').innerHTML = `
  			${new_count}
  		`

  		fetch(imageURL, {
  			Method: 'POST',
  			Headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
			},
			Body: JSON.stringify({
  				"image_id": "${data.id}"
			})
  		})
  	}
  }

})

