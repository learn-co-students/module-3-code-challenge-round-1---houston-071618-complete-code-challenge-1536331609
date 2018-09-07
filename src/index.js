document.addEventListener('DOMContentLoaded', function () {

  const imageId = 190; //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  const bodyElement = document.body;

  bodyElement.addEventListener('click', e => addLike(e));

  let image;

  function createElements(data) {
    image = new Image(data);
    return image.attachToDom();
  }

  function addLike(e) {
    e.preventDefault();
    let targetId = e.target.id;
    if (targetId === 'like_button') {
      Image.likeImage();
      return sendLikeToBackEnd();
    } else if (targetId === 'submit_button') {
      Image.addComment();
      return sendCommentToBackEnd();
    }
  }

  function sendLikeToBackEnd() {
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    }).then(resp => resp.json()).then(console.log)
  }

  function sendCommentToBackEnd() {
    let content = image.comments[image.comments.length - 1].content;
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: content
      })
    }).then(resp => resp.json());
  }

  fetch(imageURL).then(resp => resp.json()).then(data => createElements(data));

});
