const db = firebase.firestore();
console.log(window.location.pathname);
/*
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (window.location.pathname === "/login") {
      window.location = "/user";
    } else {
      return null;
    }
  } else {
    if (window.location.pathname !== "/login") {
      window.location = "/login";
    } else {
      return null;
    }
  }
});
*/
const handleViewChange = () => {
  const signInView = document.querySelector(".login");
  const signUpView = document.querySelector(".signup");
  const goToSignup = document.querySelector(".goToSignup");
  const goToSignin = document.querySelector(".goToSignin");
  goToSignin.addEventListener("click", (e) => {
    signInView.style.display = "flex";
    signUpView.style.display = "none";
  });
  goToSignup.addEventListener("click", (e) => {
    signInView.style.display = "none";
    signUpView.style.display = "flex";
  });
};

handleViewChange();

firebase.auth().onAuthStateChanged(function (user) {});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location = "/user";
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
      window.location = "/";
    })
    .catch((error) => {});
}

function signup() {
  const email = document.getElementById("signin_email").value;
  const password = document.getElementById("signin_password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userUid = user.uid;
      console.log(userUid);
      db.collection("users")
        .doc(userUid)
        .set({})
        .then(() => {
          window.location = "/user";
        });
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

firebase
  .auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;

      const userUid = result.user.uid;
      console.log(userUid);
      db.collection("users")
        .doc(userUid)
        .set({}, { merge: true })
        .then(() => {
          window.location = "/user";
        });
    }
    // The signed-in user info.
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
