let $ = document;

let photoDiv = $.getElementById("photoDiv");
let myLike = false;

function loadPhoto() {
  spiner();
  fetch(
    "https://api.unsplash.com/photos/?client_id=dsmoN-2CMH79HH2y9RMNpbzeabCGGuSNwiyW7rSK0rU&per_page=30"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        renderImg(item);
      });
      let spinnerDiv = $.getElementById("spinner");
      spinnerDiv.remove();
    })
    .catch((error) => console.log(error));
}

function renderImg(photo) {
  photoDiv.insertAdjacentHTML(
    "beforeend",
    `
        <div class="card m-4" style="width: 20rem;">
            <img src="${photo.urls.small}"class="card-img-top"  alt="${photo.urls.small}">
            <div class="card-body" id="${photo.id}">
                <i class="far fa-heart" onclick="likeIt(this.id,${photo.likes})" id="${photo.id}"></i>
                 <span> ${photo.likes}</span> 
                <p class="card-text"><span class="name">${photo.user.first_name} : </span>${photo.user.bio}</p>
            </div>
        </div>
  `
  );
}
loadPhoto();

function likeIt(id) {
  myLike = !myLike;
  if (myLike) {
    $.getElementById(
      id
    ).innerHTML = `<i class="fas fa-heart" onclick="likeIt(this.id)" id="${id}"></i>`;
    console.log(myLike);
  } else if (!myLike) {
    $.getElementById(
      id
    ).innerHTML = `   <i class="far fa-heart" onclick="likeIt(this.id)" id="${id}"></i>`;
    console.log(myLike);
  }
}

function spiner() {
  photoDiv.insertAdjacentHTML(
    "afterend",
    `
      <div id="spinner">
      <div class="loadingio-eclipse">
        <div class="ldio-rpinwye8j0b">
          <div></div>
        </div>
      </div>
    </div>
  `
  );
}

window.onscroll = function (event) {
  if (window.innerHeight + window.scrollY >= $.body.offsetHeight) {
    loadPhoto();
    console.log("end ");
  }
};
