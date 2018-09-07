class Comment {
  constructor({
    id = 0,
    content
  } = {}) {
    this.id = id;
    this.content = content;
  }

  render() {
    return (
      `<li id="${this.id}">${this.content}</li>`
    );
  }
}
