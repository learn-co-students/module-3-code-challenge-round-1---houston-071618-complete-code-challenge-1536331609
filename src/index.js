document.addEventListener('DOMContentLoaded', fetchAndDisplayImage)

const imageId = 109; //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

//Declare UI Variables
const imageCard = document.getElementById('image_card');
// const imageTag = document.getElementById('image')
const likeSpan = document.getElementById('likes'); //where you increment
const likeBtn = document.getElementById('like_button');
const commentForm = document.getElementById('comment_form')

let commentText = document.getElementsByName("name")[0]

const parseJSON = resp => resp.json()

//------------- event listener
// loadEventListeners();
//
// function loadEventListeners() {
//   // add new comment
//   // debugger
//   // likeBtn.addEventListener('click', handleClickOfButton);
// }


function fetchAndDisplayImage(){
  fetch(imageURL)
    .then(parseJSON)
    .then(image => addImageToPage(image))
    .then(image => addEventsToButtons(image))
}

function addImageToPage(image) {
  // debugger

  // debugger
  const imageTemplate = `
  <img src="${image.url}" name="${image.name}" data-imageId="${image.id}" data-imageLikes="${image.like_count}">
  `
  likeBtn.id = image.id;

  //adding image
  // imageTag.innerHTML = image.name
  // imageTag.dataset.imageId = image.id

  // imageCard.children[0].innerHTML += imageTemplate
  imageCard.innerHTML += imageTemplate
}

function addEventsToButtons() {
  container = document.querySelector('.container')
  container.addEventListener('click', handleClickOfButton)

  commentForm.addEventListener('submit', addComment);
}

function handleClickOfButton(e) {
  // debugger
  if(e.target.innerText === "Like") {

    addLikeToImage(e.target.parentElement.children[6].dataset.imageid
, e)
  }
  // e.preventDefault;

}

function addLikeToImage(imageId, e) {
  // debugger
  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: imageId})
  })
    .then(res => res.json())
    .then(like => addLikeToPage(like, imageId, e))
}

function addLikeToPage(like, imageId, e) {
  // debugger
  let likes = document.getElementById('likes')
  let likeCount = parseInt(document.getElementById('likes').innerText)
  likes.innerText = `${++likeCount}`
}

function addComment(e) {
  debugger
  e.preventDefault();

  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: e.target.parentElement.children[6].dataset.imageid,
      content: commentText.value
    })
  })
    .then(res => res.json())
    .then(comment => addCommentToPage(comment, e))

  // console.log("hello")
}

function addCommentToPage(comment, e) {
  // not done :(
}
