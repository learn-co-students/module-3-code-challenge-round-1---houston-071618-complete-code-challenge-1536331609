document.addEventListener('DOMContentLoaded', function() {
  const imageId = 115;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/${imageId}`;

  fetchImage();

  function showImage(image) {
    console.log(image);

    //picture
    let picture = document.getElementById('image');
    picture.src = image.url;

    let pictureName = document.getElementById('name');
    pictureName.innerHTML = `${image.name}`;

    //likes
    let likes = document.getElementById('likes');
    let likesCounter = image.like_count;
    likes.innerHTML = likesCounter;
    let likeButton = document.getElementById('like_button');
    likeButton.addEventListener('click', () => clickLike(image));

    //comments
    let comments = document.getElementById('comments');

    let commentForm = document.getElementById('comment_form');
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addComment(image);
      // image.comments[0].content = commentForm.
      showImage(image);
    });

    let comment = document.createElement('li');
    comment.innerHTML = `
      ${image.comments[0].content}`;
    comments.append(firstComment);
  }

  function clickLike(image) {
    console.log('Like clicked');
    likesCounter++;
    fetch(imageURL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    });
  }

  function addComment(image) {
    console.log('Comment added');
    comment.innerHTML = commentForm.innerHTML;
    fetch(imageURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    });
  }

  function fetchImage() {
    fetch(imageURL)
      .then((resp) => resp.json())
      .then((image) => showImage(image));
  }
});
