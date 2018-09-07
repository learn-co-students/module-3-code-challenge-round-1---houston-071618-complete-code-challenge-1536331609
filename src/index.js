document.addEventListener('DOMContentLoaded', function() {

  const imageId = 102 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageField = document.querySelector('#image_content')



getImage()

//likeButton.addEventListener('click', increaseLikes)

 function getImage(){
 	fetch(imageURL)
 	.then(resp => resp.json())
 	.then(putImageOnPage)
 }	


 function putImageOnPage(data){

	console.log(imageField)

	//debugger
	imageField.innerHTML += 
	`      
	<div class="card col-md-4"></div>
      <div id="image_card" class="card col-md-4">
          <img src="${data.url}" id="image" data-id= ${data.id}/>
          <h4 id="${data.name}"></h4>
          <span>Likes:
            <span id="likes">${data.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
            ${inputComments(data)}
          </ul>
      </div>
      <div class="card col-md-4"></div>
    `

    const likeButton = document.querySelector('#like_button')

  	const commentForm = document.querySelector('#comment_form')

    likeButton.addEventListener('click', increaseLikes)
    commentForm.addEventListener('submit', addComment)

   // debugger

}


function increaseLikes(e){
	

	let like = e.target.parentElement.children[2].innerText.split(' ')[1]

	like = parseInt(like)+1

		fetch(likeURL, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
				//"Access-Control-Allow-Origin: *"
			},
			body: JSON.stringify({
				image_id: imageId
				
			})

		})//end of fetch
	//debugger
	e.target.parentElement.children[2].innerText = `Likes: ${like} `
	//debugger
}



function addComment(e){
	debugger
	e.preventDefault()

	let comment = document.querySelector("#comment_input")

	e.target.parentElement.lastElementChild.innerHTML += `<li>${comment.value}</li>`


		fetch(commentsURL, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
				//"Access-Control-Allow-Origin: *"
			},
			body: JSON.stringify({
				image_id: imageId,
				content: comment.value
				
			})

		})

	comment.value = ''
}

function inputComments(data){
	return data.comments.map(function(comment){
		return `<li>${comment.content}</li>`
	}).join('')
}


})

