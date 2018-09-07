document.addEventListener('DOMContentLoaded', function() {

  const imageId = 114

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const commentForm = document.querySelector('#comment_form');
  const likeButton = document.querySelector('#like_button');

  function getImage(){
    fetch(imageURL)
      .then(resp => resp.json())
      .then(card => addPictureCard(card))
  }

  getImage();

  function addPictureCard(card){
    const imageContent = document.querySelector('#image_content');
    //This is where to put image and info from image
    imageContent.innerHTML = '<img src="${card.url}" id="image" data-id="114"/>'
    //I should also update ths likes according to the number of likes in
    //the URL and put in span id of "likes".
  }

  function addComments(card){
    const commentContent = document.querySelectory('#comments');
    //Read comments in data array of hashes under comments.content
    //I know it should be an forEach loop but can't get page to load to
    //debug and get data format.
    commentContent.innerHTML = '<li>${card.comments.content}</li>';
  }

  function getCommentOnForm(){
    //Read value from form and update with POST on URL for comments.

  }

  commentForm.addEventListener("submit", addComment);
  likeButton.addEventListener('click', updateLikes);

  function addComment(event){
    console.log('Submit button clicked');
    //After addComment & getting values, then getCommentOnForm & POST.
  }

  function updateLikes(event){
    console.log('Like button clicked');
    //Update like_count for photo: ++like_count
  }


})//End addEventListener
