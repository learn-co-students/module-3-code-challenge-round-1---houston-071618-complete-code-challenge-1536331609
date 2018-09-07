document.addEventListener('DOMContentLoaded', function() {

  imageId = 136 //Enter your assigned imageId here

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage();
  likeFeature();
  commentFeature();
  deleteFeature();
})

function fetchImage(){
  fetch(imageURL)
  .then(res=>res.json())
  .then(populateDom)
}

function populateDom(info){
  console.log(info)

  const imageEl = document.getElementById("image");
  imageEl.src = info.url

  const nameEl = document.getElementById("name");
  nameEl.innerText = info.name

  const likes = document.getElementById("likes");
  likes.innerText = info.like_count;

  const commentsUL = document.getElementById("comments");
  commentsUL.innerHTML ="";
  info.comments.forEach(singleComment)
}

function singleComment(comment){

  const commentsUL = document.getElementById("comments");
  const li = `<li id=${comment.id}>${comment.content}<button class="delete">Delete</button></li>`
  commentsUL.innerHTML += li

}

function likeFeature(){
  const likeBtn = document.getElementById("like_button");
  const likes = document.getElementById("likes");
  likeBtn.addEventListener("click", function(event){
    numLikes = parseInt(likes.innerText)
    numLikes ++;
    likes.innerText = numLikes;

    fetch(likeURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
           image_id: `${imageId}`
        }),
    })
  })
}

function commentFeature(){
  const commentForm = document.getElementById("comment_form");

  commentForm.addEventListener("submit", function(event){
    event.preventDefault();
    const commentInput = document.getElementById("comment_input");
    const comment = commentInput.value

    fetch(commentsURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
           image_id: `${imageId}`,
           content: `${comment}`
        }),
    }).then(fetchImage)

  })
}

function deleteFeature(){
  const commentsUL = document.getElementById("comments");
  commentsUL.addEventListener("click", function(event){

    if(event.target.classList[0] ==="delete"){
      const id = event.target.parentElement.id

      fetch(commentsURL+`/${id}`, {
          method: "DELETE"
      }).then(fetchImage)

    }
  })

}
