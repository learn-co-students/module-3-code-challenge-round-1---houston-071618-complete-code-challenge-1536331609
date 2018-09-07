document.addEventListener('DOMContentLoaded', function() {

  const imageId = 107

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  // ## Step 1 - Get the Image Data

  fetch (imageURL)
  .then(response => response.json())
  // .then (image => console.log(image))
  // .then (addComments)
  .then (placeImageinfo)
  


  const imageBox = document.getElementById("image")
  const nameBox = document.getElementById("name")
  const likesBox = document.getElementById("likes")
  const commentsBox = document.getElementById("comments")
  // console.log(imageBox)

  function placeImageinfo(imageData){
    // console.log(imageData)
      const imgId = imageData.id
      const img = imageData.url
  //  console.log(img)
  //  imageBox.dataset.id = imgId 
   imageBox.src =`${img}`
   imageBox.id = imgId

   nameBox.innerText = `${imageData.name}`

   likesBox.innerText= `${imageData.like_count}`

   commentsBox.innerHTML = imageData.comments.forEach(comment => comment.addEventListenercontent)
  //  console.log(addComments(imageData))
  }

  // function addComments(imageData){
  //   imageData.comments.forEach((comment) =>
  //   { return `<li>${comment.content}</li>`})
  // }

  

  
  // Use the data from the API response to append the information to the DOM. You will need to add:
  
  // - the image url
  // - the image name
  // - the number of likes
  // - any comments in an unordered list
  
  // Use the example html to guide you as to where this data should go.
  
  // (If you cannot get your fetch request to work correctly you can always use the example response above to append content to the DOM and work with for the subsequent steps)
  
  // ## Step 2 - Like Feature (Frontend)
  
  // The next feature to approach is the functionality to add likes to a picture. First get this working in the browser only without worrying about persistence.
  
  // Clicking the 'Like' button should increase the number of likes by one.
  
  // A user can like the same picture multiple times.
  
  // ## Step 3 - Like Feature (Backend)
  
  // This app will use what is called *optimistic rendering*. This means the DOM will be updated before the changes are added to the database.  When a user clicks the 'Like' button we will immediately update the DOM.  Next your job is to make a POST request to persist the new Like in the backend database.
  
  // #### API Docs
  // #### Endpoint to create a Like
  // ```
  // POST 'https://randopic.herokuapp.com/likes'
  
  // Required keys in the body of the request:
  // {
  //   image_id: <insert image id here>
  // }
  
  // Required Headers
  // {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // }
  
  // Example Response:
  // {
  //     "id": 112,
  //     "image_id": 8,
  //     "created_at": "2017-11-17T13:52:22.167Z",
  //     "updated_at": "2017-11-17T13:52:22.167Z"
  // }
  // ```
  
  // Since we are using optimistic rendering, you shouldn't have to do anything with the response.
  
  // To test your code you should be able to refresh the page and see the number of likes be the increased number.
  
  // ## Step 4 - Comment Feature (Frontend)
  
  // The next feature to approach is the functionality to add comments to a picture. First get this working in the browser only without worrying about persistence.
  
  // Filling out the input and clicking 'Submit' should append your new comment as an `<li>` to the comments unordered list element. You should also clear out the comment input, so it's an empty field for the next comment to be added.
  
  // ## Step 5 - Comment Feature (Backend)
  
  // As before, after optimistically rendering a comment we need to persist the comment to the database.
  
  // #### API Docs
  // #### Endpoint to create a Comment
  // ```
  // POST 'https://randopic.herokuapp.com/comments'
  
  // Required keys in the body of the request:
  // {
  //   image_id: <insert image id here>,
  //   content: <insert comment content here>
  // }
  
  // Required Headers
  // {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // }
  
  // Example Response (created comment):
  // {
  //   {
  //     "id": 2,
  //     "content": "first comment!",
  //     "created_at": "2017-09-27T18:18:05.623Z",
  //     "updated_at": "2017-09-27T18:18:05.623Z"
  //   }
  // }
  // ```
  
  // Since we are using optimistic rendering, you shouldn't have to do anything with the response.
  
  // To test your code you should be able to refresh the page and see any comments you added.
  
  // ## BONUS - NOT REQUIRED
  
  // ## Step 6 - Delete a comment feature
  
  // This feature is not required and you should only attempt if you have time.
  
  // When you display new comments add a button next to each comment to delete that comment.
  
  // Clicking the button should delete the comment from the DOM as well as deleting it from the database.
  
  // Take the same iterative approach as before.
  
  // #### API Docs
  // #### Endpoint to delete a Comment
  // ```
  // DELETE 'https://randopic.herokuapp.com/comments/:comment_id'
  
  // Example Response:
  // {
  //   message: 'Comment Successfully Destroyed'
  // }
  // ```
  
  // *(Hint: To get the comment's id you may have to think about changing the way you handle the response received from creating a comment)*
  

})

// - As a user, when the page loads I will see an image, any comments that image has, and the number of likes that image has.

//   - As a user, I can click to like an image, which will increase the number of likes that image has by one.

//   - As a user I can fill out an input fields and submit the form to add a comment to an image. I should see my new comment below any previous comments.

//   - As a user, when I refresh the page, any comments or likes I have added should be persisted to the backend API and I should see my changes on the page.