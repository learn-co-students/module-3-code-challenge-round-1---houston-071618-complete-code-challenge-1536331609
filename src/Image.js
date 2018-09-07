class Image {

  constructor(pictureID,pictureURL,pictureName,pictureLikeCount = 0,pictureComments = []){
    this.id = pictureID;
    this.url = pictureURL;
    this.name = pictureName;
    this.likeCount = pictureLikeCount;
    this.comments= pictureComments;
  }//constructor
}//Image Class
