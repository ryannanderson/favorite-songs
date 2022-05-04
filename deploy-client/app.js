console.log("here is a comment");

var songOptions = [];
var userOptions = [];

var addButton = document.querySelector("#addButton");
addButton.style.display = "flex";

var loginButton = document.querySelector("#loginButton");
// loginButton.style.display = "none";
var login = document.querySelector("#login");
login.style.display = "none";

var loginSignup = document.querySelector("#loginSignup");

var signUpSection = document.querySelector("#signUpSection");

var start = document.querySelector("#start");
start.style.display = "flex";

var signup = document.querySelector("#signup");
signup.style.display = "none";

var main = document.querySelector("main");
main.style.display = "block";

var signUpButton = document.querySelector("#signUpButton");

var saveButton = document.querySelector("#saveButton");
saveButton.style.display = "none";

var editCurrentId = 0;
var nameInput = document.querySelector("#new-name");
var artistInput = document.querySelector("#new-artist");
var albumInput = document.querySelector("#new-album");
var genreInput = document.querySelector("#new-genre");
var yearInput = document.querySelector("#new-year");

var firstName = document.querySelector("#firstName");
var lastName = document.querySelector("#lastName");
var email = document.querySelector("#email");
var password = document.querySelector("#password");

var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");

addButton.onclick = function () {
  createSongOnServer(
    nameInput.value,
    artistInput.value,
    albumInput.value,
    genreInput.value,
    yearInput.value
  );
};

function createSongOnServer(
  songName,
  songArtist,
  songAlbum,
  songGenre,
  songYear
) {
  var data = "name=" + encodeURIComponent(songName);
  data += "&artist=" + encodeURIComponent(songArtist);
  data += "&album=" + encodeURIComponent(songAlbum);
  data += "&genre=" + encodeURIComponent(songGenre);
  data += "&year=" + encodeURIComponent(songYear);
  fetch("https://my-favorite-songs.herokuapp.com/songs", {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    loadSongsFromServer();
  });
}

function deleteSongOnServer(songId) {
  fetch("https://my-favorite-songs.herokuapp.com/songs/" + songId, {
    method: "DELETE",
    credentials: "include",
  }).then(function (response) {
    console.log("delete is working");
    loadSongsFromServer();
  });
}

function updateSongOnServer(
  songName,
  songArtist,
  songAlbum,
  songGenre,
  songYear,
  editCurrentId
  // songId
) {
  var data = "name=" + encodeURIComponent(songName);
  data += "&artist=" + encodeURIComponent(songArtist);
  data += "&album=" + encodeURIComponent(songAlbum);
  data += "&genre=" + encodeURIComponent(songGenre);
  data += "&year=" + encodeURIComponent(songYear);
  fetch("https://my-favorite-songs.herokuapp.com/songs/" + editCurrentId, {
    method: "PUT",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("PUT is working");
    loadSongsFromServer();
  });
}

saveButton.onclick = function () {
  updateSongOnServer(
    nameInput.value,
    artistInput.value,
    albumInput.value,
    genreInput.value,
    yearInput.value,
    editCurrentId
  );
  nameInput.value = "";
  artistInput.value = "";
  albumInput.value = "";
  genreInput.value = "";
  yearInput.value = "";

  // console.log("");
  addButton.style.display = "flex";
  saveButton.style.display = "none";
};

function loadSongsFromServer() {
  fetch("https://my-favorite-songs.herokuapp.com/songs", {
    credentials: "include",
  }).then(function (response) {
    if (response.status == 200) {
    
    } else if (response.status == 401) {
      login.style.display = "flex";
      signup.style.display = "none";
      start.style.display = "none";
      main.style.display = "none";
      return;
      
    }
    
    response.json().then(function (dataFromServer) {
      songOptions = dataFromServer;
      var songsList = document.querySelector("#song-options");

      songsList.innerHTML = "";

      songOptions.forEach(function (song) {
        var songItem = document.createElement("li");
        // songItem.innerHTML = song;
        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = song.name;
        nameDiv.classList.add("song-name");
        songItem.appendChild(nameDiv);

        var artistDiv = document.createElement("div");
        artistDiv.innerHTML = song.artist;
        artistDiv.classList.add("song-artist");
        songItem.appendChild(artistDiv);

        var albumDiv = document.createElement("div");
        albumDiv.innerHTML = song.album;
        albumDiv.classList.add("song-album");
        songItem.appendChild(albumDiv);

        var genreDiv = document.createElement("div");
        genreDiv.innerHTML = song.genre;
        genreDiv.classList.add("song-genre");
        songItem.appendChild(genreDiv);

        var yearDiv = document.createElement("div");
        yearDiv.innerHTML = song.year;
        yearDiv.classList.add("song-year");
        songItem.appendChild(yearDiv);

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = "delete";

        deleteButton.onclick = function () {
          console.log("please delete this", song.id);
          if (confirm("Are you sure you want to delete this?")) {
            deleteSongOnServer(song.id);
          }
        };
        songItem.appendChild(deleteButton);

        var editButton = document.createElement("button");
        editButton.innerHTML = "edit";
        editButton.classList.add("editButton");

        editButton.onclick = function () {
          saveButton.style.display = "flex";
          addButton.style.display = "none";

          editCurrentId = song.id;
          nameInput.value = song.name;
          artistInput.value = song.artist;
          albumInput.value = song.album;
          genreInput.value = song.genre;
          yearInput.value = song.year;
        };

        songItem.classList.add("songItem");
        songItem.appendChild(editButton);
        songsList.appendChild(songItem);
      });
    });
  });
}

function createUserOnServer(userFN, userLN, userEmail, userPass) {
  var data = "firstName=" + encodeURIComponent(userFN);
  data += "&lastName=" + encodeURIComponent(userLN);
  data += "&email=" + encodeURIComponent(userEmail);
  data += "&password=" + encodeURIComponent(userPass);
  fetch("https://my-favorite-songs.herokuapp.com/users", {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    if (response.status == 201) {
      console.log("registered");
      alert("success");
      createLoggedInUser(email.value, password.value);
      signup.style.display = "none";
      start.style.display = "flex";
      main.style.display = "block";
    } else if (response.status == 422) {
      var signUpFail = document.querySelector("#signupFailed");
      signUpFail.innerHTML = "Email already in use.";
      signUpFail.style.color = "red";
      console.log("failed");
      // alert("login failed. Email already in use");
    }
  });
}

signUpSection.onclick = function () {
  login.style.display = "none";
  signUpSection.style.display = "none";
  start.style.display = "none";
  signup.style.display = "flex";
  signUpButton.style.display = "flex";
  // addButton.style.display = "none";
  main.style.display = "none";
};

loginButton.onclick = function () {
  createLoggedInUser(loginEmail.value, loginPassword.value);
};

signUpButton.onclick = function () {
  createUserOnServer(
    firstName.value,
    lastName.value,
    email.value,
    password.value
  );
};

function createLoggedInUser(userEmail, userPass) {
  var data = "email=" + encodeURIComponent(userEmail);
  data += "&password=" + encodeURIComponent(userPass);
  fetch("https://my-favorite-songs.herokuapp.com/sessions", {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    if (response.status == 201) {
      console.log("this worked");
      alert("logged in");
      login.style.display = "none";
      main.style.display = "block";
      start.style.display = "flex";
      loadSongsFromServer();
    } else if (response.status == 401) {
      // alert("login failed");
      var loginFail = document.querySelector("#loginFailed");
      loginFail.innerHTML = "Something went wrong. Please try again";
      loginFail.style.color = "red";
    }
  });
}

loadSongsFromServer();
