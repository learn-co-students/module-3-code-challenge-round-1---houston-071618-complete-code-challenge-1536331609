console.log("DOM loaded");

	const imageId = 117 //Enter your assigned imageId here
	const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
	const likeURL = `https://randopic.herokuapp.com/likes/`
	const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener("click", like);

fetch (`${imageURL}`)
	.then(resp => resp.json())
	.then(addPicToPage)

function addPicToPage(pic) {
	let image = document.getElementById("image");
	image.innerHTML = `
		<div id="image_card" class="card col-md-4">
			<img id="image" src="${pic.url}" data-id/>
			<h4 id="${pic.name}"></h4>
			<span>Likes:
			<span id="${pic.likes}">0</span>
			</span>
		<button id="like_button">Like</button>
	`
	image.append()
}

function like(event) {
	if (event.target.id === "like_button") {
	event.preventDefault();
	let totalLikes=parseInt(event.target)

	fetch(`{likeURL}`, {
		method: "PATCH",
		body: JSON.stringify({ 
			Likes: totalLikes
		}),
		headers: {
			"Content-Type": "application/json"
		}
		.then(resp => resp.json())
		.then(console.log)
	})
}}

function newComment(event) {
	let comment = document.getElementById("comment_input").value;
	event.preventDefault();
	fetch(`${commentsURL}`, {
		method: "POST", 
		body: JSON.stringify({
			comment: comment
		}),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(resp => resp.json())
	.then(console.log)
}









