document.addEventListener('DOMContentLoaded', () => {

  const imageId = 113

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function fetchData() {
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
      .then(res => res.json())
      .then(addPics)
  }

  function addPics(pics){
    pics.forEach(addPic)
  }

  function addPic(pic){
    entry.innerHTML = `
    ${pic.name}
    ${pic.like_count}
    ${pic.comment}
  `
  }

 fetchData()
})





