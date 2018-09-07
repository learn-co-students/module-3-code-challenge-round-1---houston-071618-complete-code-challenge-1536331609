class Comment {
  //ID, CONTENT, IMAGE_ID, CREATE_AT, UPDATED_AT

  constructor(id, content, image_id, created_at, updated_at){
    this.id = id;
    this.content = content;
    this.imageID = image_id;
    this.createdAt = created_at; // well technically if we're building these it's now'ish
    this.updatedAt = updated_at;
  }//constructor
}//class Comment
