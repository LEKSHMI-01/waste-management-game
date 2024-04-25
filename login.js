const firebaseConfig = {
  apiKey: "AIzaSyCEj68XIeUMvlpEMCCV99Dun-0JqVxxV9M",
  authDomain: "waste-management-9400f.firebaseapp.com",
  projectId: "waste-management-9400f",
  storageBucket: "waste-management-9400f.appspot.com",
  messagingSenderId: "472181040401",
  appId: "1:472181040401:web:de64ba1caa3911181f98b0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


  // Initialize variables
     const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is not valid')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false ) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now(),
        password:password,
        level:0
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
      localStorage.setItem("token",user.uid)

      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is not valid')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
      .then(function () {
        // Declare user variable
        var user = auth.currentUser
  
        // Add this user to Firebase Database
        var database_ref = database.ref()
  
        // Create User data
        var user_data = {
          last_login: Date.now()
        }
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data)
  
      localStorage.setItem("token",user.uid)

        // Redirect to choose level.html
        window.location.href = 'choose level.html';
  
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
  
        alert(error_message)
      })
  }
  
  function checkLevel(){
    const firebaseConfig = {
      apiKey: "AIzaSyCEj68XIeUMvlpEMCCV99Dun-0JqVxxV9M",
      authDomain: "waste-management-9400f.firebaseapp.com",
      projectId: "waste-management-9400f",
      storageBucket: "waste-management-9400f.appspot.com",
      messagingSenderId: "472181040401",
      appId: "1:472181040401:web:de64ba1caa3911181f98b0"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    
      // Initialize variables
      const database = firebase.database()
      
     // Change 'users' to your actual node name
console.log("000")
     database.ref('users/' + localStorage.getItem("token")).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            const docData = snapshot.val();
            console.log("Document data:", docData);
           return docData
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.error("Error getting document:", error);
    })  
  }
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }


