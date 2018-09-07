// URLS
const imageId = 180; //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

// UI Elements
const UIimage = document.querySelector("#image");
const UIheading = document.querySelector("#name");
const UIlikeCount = document.querySelector("#likes");
const UIcomments = document.querySelector("#comments");
const UIlikeBtn = document.querySelector("#like_button");
const commentForm = document.querySelector("#comment_form");
const commentInput = document.querySelector("#comment_input");

// Event Listeners
document.addEventListener("DOMContentLoaded", getImageData);
UIlikeBtn.addEventListener("click", addLike);
commentForm.addEventListener("submit", addComment);

function getImageData() {
	fetch(imageURL)
		.then(response => response.json())
		.then(imageData => displayImageData(imageData));
}

function displayImageData(imageData) {
	UIimage.src = imageData.url;
	UIheading.innerText = imageData.name;
	UIlikeCount.innerText = imageData.like_count;
	UIcomments.append(renderCommentsHTML(imageData));
}

function renderCommentsHTML(imageData) {
	let commentLi = document.createElement("li");

	imageData.comments.forEach(
		comment => (commentLi.innerText = `${comment.content}`)
	);
	return commentLi;
}

function addLike(imageData) {
	let likes = parseInt(UIlikeCount.innerText);
	likes++;
	UIlikeCount.innerText = String(likes);
	updateLikes(imageData);
}

function updateLikes(imageData) {
	fetch("https://randopic.herokuapp.com/likes", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(imageData)
	});
}

function addComment(e) {
	e.preventDefault();
	let commentLi = document.createElement("li");
	commentLi.innerText = commentInput.value;
	UIcomments.append(commentLi);
	updateComments();
}

function updateComments() { }
