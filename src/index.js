document.addEventListener('DOMContentLoaded', function() {
  const imageId = 134 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/${imageId}`

  const commentsURL = `https://randopic.herokuapp.com/comments/${imageId}`


let allComments =[]
 fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(function(resp){
    return resp.json()
  }).then(resp =>putPhotoOnPage(resp))



  function putPhotoOnPage(photoData){
    // console.log(photoData)
     const imageCard = document.getElementById('image_card')
     imageCard.innerHTML = `
        <img src="${photoData.url}" id="image" data-id/>
        <h4 id="name">${photoData.name}</h4>
        <span>Likes:
          <span id="likes">${photoData.like_count}</span>
        </span>
        <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments"><h2>Comments:</h2>
        
        </ul>
    </div>
    `
  }//end function(photoData)

  function getPhotoComments(photoData){
    debugge
    photoData.comments.forEach(function(comment){
      console.log(comment.Content)
    })

    // const commentUL = getElementById('comments')
    // const addEachComment = createElement('ul')
    // addEachComment.innerHTML += `
    //   <li>${comment.content}</li>`
  }


}) //END DOMCONTENTLOADED
