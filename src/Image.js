class Image {
  constructor({
    id,
    url,
    name,
    like_count = 0,
    comments = []
  } = {}) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.likeCount = like_count;
    this.comments = this.createComments(comments);
    Image.current.push(this);
  }

  createComments(comments) {
    return comments.map(comment => new Comment(comment));
  }

  attachToDom() {
    const containerForElement = document.getElementById('image_content');
    const newImageElement = this.render();
    containerForElement.innerHTML = newImageElement;
  }

  static likeImage() {
    let image = Image.current[0];
    image.likeCount++;
    image.attachToDom();
  }

  static addComment() {
    let image = Image.current[0];
    let commentInput = document.getElementById('comment_input');
    let newComment = new Comment({
      content: commentInput.value
    });
    image.comments.push(newComment);
    commentInput.value = '';
    image.attachToDom();
  }

  render() {
    let commentList = this.comments.map(comment => comment.render()).join('');
    return (`
    <div id="image_card" class="card col-md-4">
          <img id="image" src=${this.url} data-id-${this.id}/>
          <h4 id="name">${this.name}</h4>
          <span>Likes:
            <span id="likes">${this.likeCount}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input id="submit_button" type="submit" value="Submit"/>
          </form>
          <ul id="comments">
            ${commentList}
          </ul>
    `);
  }
}

Image.current = [];
