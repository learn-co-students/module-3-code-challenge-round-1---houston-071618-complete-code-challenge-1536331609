document.addEventListener('DOMContentLoaded', function() {

  const imageId = 133 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch (imageURL)
    .then( response => response.json() )
    .then ( img => renderImage(img) )


let imageCard = document.querySelector('#image_card')
let numberOfLikes =document.querySelector('#likes')
let likeButton = document.querySelector('#like_button')

likebutton.addEventListener('click', function(e){
  console.log('click')
})
 // render image
function renderImage(img){
  let imageName = img.name

  let renderedImage = document.querySelector('#image')
  imageCard.innerHTML +=
  `<div>
      <img src="${img.url}" id="image" data-id/>
      <h4 id="name">${imageName}</h4>

</div>`
}


    // Use the data from the API response to append the information to the DOM. You will need to add:
    //
    // - the image url
    // - the image name
    // - the number of likes
    // - any comments in an unordered list
    // let imageName = document.querySelector('#name')
    // let numberOfLikes =document.querySelector('#likes')
    // let likeButton = document.querySelector('#like_button')
    // let comments= document.querySelector('#comment_input').value

})
