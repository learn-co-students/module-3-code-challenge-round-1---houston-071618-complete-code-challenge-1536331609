let currentImage = null; // for storing a temp Image for viewing
let allComments = []// for storage and testing.

document.addEventListener('DOMContentLoaded', function() {

  const imageId = 103 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


/*
- As a user, when the page loads I will see an image, any comments that image has, and the number of likes that image has.
*/


function setUpVariables(e){
  //data looks like this:
  //{id: 103, url: "http://blog.flatironschool.com/wp-content/uploads/2017/02/Campus_Normal-352x200.png", name: "Lovelace Graffiti Wall", like_count: 0, comments: Array(1)}

  //comments look like this:
  //{id: 1128, content: "first comment!", image_id: 103, created_at: "2018-09-07T10:03:02.576Z", updated_at: "2018-09-07T10:03:02.576Z"}
  /* comments have an:
  ID, CONTENT, IMAGE_ID, CREATE_AT, UPDATED_AT
  */
// get the data for the picture
const pictureID = e.id;
const pictureURL = e.url;
const pictureName = e.name;
const pictureLikeCount = parseInt(e.like_count);
const pictureComments = e.comments; //is an array
//get the data for the comment(s)
const myImage = new Image(pictureID,pictureURL,pictureName,pictureLikeCount,pictureComments)

currentImage = myImage; // locall store the image

//=============================================================

tempArray = myImage.comments;
for(let comment of tempArray){

  const commentID = comment.id;
  const commentContent = comment.content;
  const commentImageID = comment.image_id;
  const commentCreatedAt = comment.created_at || "time now thing";
  const commentUpdatedAt = comment.updated_at || "time now thing";

  const myComment = new Comment(commentID,commentContent,commentImageID,commentCreatedAt,commentUpdatedAt)

  allComments.push(myComment); // locally store comment array


}//for comment getter

//=============================================================
// at this point we have our image and its comments stored
// locally with global scope nontheless! We can put them up to the View.

setUpView();
}//setUpView

function setUpView(){
  // We need to grab a shit ton of html elements to make this works
  // 1.) grab the thingie that holds the image
  //  a.) assign our image to the thingie
  // 2.) grab the other thingie that holds the comments
  //  a.) assign all our comments into that other thingie.
  // re-render() to update if necessary at all.
  const viewImage = document.getElementById('image');//might need to make template
  viewImage.dataId = currentImage.id;
  // const imageTemplate = makeImageTemplate(); // didn't need this in the end
  viewImage.src = currentImage.url;

  const nameField = document.getElementById('name');
  nameField.innerText = currentImage.name;

  const likeCount = document.getElementById('likes');
  likeCount.innerText = currentImage.likeCount

  let commentField = document.getElementById('comments');
  for(let c of allComments){
    //get the contents and put in a template

    let contents = `<li>${c.content}</li>`

    commentField.innerHTML += contents

  }//for (comment populator)
  //========== EVERYTHING IS POPULATED NOW LETS ADD ACTIONLISTENERS ===========
  const likeButton = document.getElementById('like_button');
  const commentForm = document.getElementById('comment_form');
  const commentFormField = document.getElementById('comment_input');

  likeButton.addEventListener("click",function(e){
    e.preventDefault()
    //add a like
    currentImage.likes += 1;
    likeCount=currentImage.likes;
  })
  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    if(commentFormField.value.length > 0){
      //id, content, image_id, created_at, updated_at
      comment = new Comment(allComments.length, commentFormField.value, currentImage.id, "time now thing", "updated now thing")//the date.now shit
      allComments.push(comment);

    }else {
      alert('comment form empty');
    }

  });

  // now that the stuff is good on the frontend we need to fetch to the database
  // and make sure this shit is lit.
   // refresh
  

}//setUpView()
function makeImageTemplate(){

}//makeImageTemplate()
function makeCommentTemplate(comment){
  return `<li>${comment}</li>` // for comments
}//makeCommentTemplate()

function pushToServer(/*args*/)
{
  //fetch with post
}
/*
- As a user, I can click to like an image, which will increase the number of likes that image has by one.

- As a user I can fill out an input fields and submit the form to add a comment to an image. I should see my new comment below any previous comments.

- As a user, when I refresh the page, any comments or likes I have added should be persisted to the backend API and I should see my changes on the page.
*/
//============ STARTS HERE!
fetch(imageURL)
.then(res => res.json())
.then(setUpVariables)
})//DOMContentLoaded
