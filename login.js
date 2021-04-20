firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById("login_div").style.display = "none";
    document.getElementById("user_div").style.display = "flex";
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_details").innerHTML = "Email: " + email_id;
    }
  } else {
    document.getElementById("login_div").style.display = "flex";
    document.getElementById("user_div").style.display = "none";
  }
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.alert("Pomyślnie wylogowano");
    })
    .catch((error) => {});
}

function signin() {
  var email = document.getElementById("signin_email").value;
  var password = document.getElementById("signin_password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
}

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  console.log(provider);
  firebase.auth().signInWithRedirect(provider);
}
