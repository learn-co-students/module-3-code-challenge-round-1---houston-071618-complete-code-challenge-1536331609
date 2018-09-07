document.addEventListener("DOMContentLoaded", function() {
  const imageId = 104; //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  const imageContainer = document.getElementById("image_content");

  const likes = document.getElementById("likes");
  const likeBtn = document.getElementById("like_button");

  const getImageURL = () => {
    return fetch(imageURL).then(res => res.json());
  };

  function loadImage() {
    getImageURL().then(img => {
      // debugger;
      imageContainer.innerHTML += render(img);

      imageContainer.addEventListener("click", handleLikes);
    });
  }

  loadImage();

  function handleLikes(e) {
    debugger;
    console.log(e.toElement.textContent);
  }

  function render(img) {
    return `
    <img src="${img.url}" id="${img.id}" data-${img.id}/>`;
  }
});
// document.addEventListener("DOMContentLoaded", () => {
//   // const BASE_URL = "http://localhost:3000";
//   let dogContainer = document.getElementById("table-body");
//   let dogForm = document.getElementById("dog-form");
//   const DOGS_URL = "http://localhost:3000/dogs";

//   const fetchDogs = () => {
//     return fetch(DOGS_URL).then(res => res.json());
//   };

//   function getDogs() {
//     return fetchDogs().then(dogs => {
//       dogs.forEach(dog => {
//         dogContainer.innerHTML += renderDogs(dog);
//         dogContainer.addEventListener("click", handleEdit);
//         dogForm.addEventListener("click", handleUpdate);
//       });
//     });
//   }

//   getDogs();

//   function handleEdit(e) {
//     const el = e.target.parentElement.parentElement;
//     // debugger;
//     console.log(e.target);

//     if (e.target.outerText === "Edit") {
//       dogForm.name.value = el.getElementsByTagName("td")[0].innerHTML;
//       dogForm.breed.value = el.getElementsByTagName("td")[1].innerHTML;
//       dogForm.sex.value = el.getElementsByTagName("td")[2].innerHTML;
//       dogForm.dataset.id = el.dataset.id;
//     }
//   }

//   function handleUpdate(e) {
//     e.preventDefault();
//     dog_id = parseInt(dogForm.dataset.id);
//     dogName = dogForm.name.value;
//     dogBreed = dogForm.breed.value;
//     dogSex = dogForm.sex.value;

//     console.log(dog_id);

//     if (e.target.value === "Submit") {
//       const url = `http://localhost:3000/dogs/${dog_id}`;
//       const options = {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: dogName,
//           breed: dogBreed,
//           sex: dogSex
//         })
//       };
//       return fetch(url, options)
//         .then(r => r.json())
//         .then(function() {
//           dogContainer.innerHTML = "";
//           return getDogs();
//         });
//     }
//   }

//   function renderDogs(dog) {
//     return `
//     <tr data-id="${dog.id}">
//       <td>${dog.name}</td>
//       <td>${dog.breed}</td>
//       <td>${dog.sex}</td>
//       <td>

//         <button data-id="${dog.id}">Edit</button>
//       </td>
//     </tr>`;
//   }
// });
