firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	$(".login-cover").hide();
	var dialog = document.querySelector('#login-dialog');
	  if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);	  
       } 
	   dialog.close();
	   //navigation userprofile
	   var user = firebase.auth().currentUser;
       var name, email, photoUrl, uid, emailVerified;
	   if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use this value to authenticate with your backend server, 
		                   // if you have one. Use User.getToken() instead.
		  $("#user-name").text(name);
		  $("#user-email").text(email);
		   		  
        }
	   
	   
	   
  } else {
    // No user is signed in.
	//alert("Sign In first");
	$(".login-cover").show();
	 var dialog = document.querySelector('#login-dialog');
	  if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);	  
       } 
	   dialog.showModal();
  }
});

  var databaseroot = firebase.database().ref("Complaint");
 databaseroot.on("child_added" , datasnap => {
	   var name = datasnap.child("name").val();
	   var complaintstr = datasnap.child("complaint").val();
	   $("#table-body").append("<tr><td>"+name+"</td><td>"+complaintstr+"</td><td><button>Remove</button></td></tr>");
	  
   });

// Sign 
$("#login-button").click(
function(){
   var email = $("#inputemail").val();
   var password = $("#inputpassword").val();
   if(email!="" && password!=""){
	 $("#login-progress").show();
	 $("#login-button").hide();
	 firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
	   $("#login-eror").show().text(errorMessage);
	   $("#login-progress").hide();
	   $("#login-button").show();
       // ...
     });
   }	
} 

);

// sign out method
$("#signout-button").click(
function(){
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
  alert(error.message);
});
}
);

$("#add-firebase-button").click(
function(){
	var username = $("#inputcomplaintname").val();
	var complaintstr = $("#inputcomplaint").val();
	var complaintsobj = new Complaint(username,complaintstr);
	var database = firebase.database().ref("Complaint");
	database.push().set(complaintsobj);
	//database.push().set("hh");
	$("#inputcomplaintname").value="";
	$("#inputcomplaint").text("");
	
}
);
function Complaint (name, complaintstr) {
    this.name = name;
	this.complaint = complaintstr;
}


$("#google-signin").click(
function(){
	
			var provider = new firebase.auth.GoogleAuthProvider();
			//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
			firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  //alert("hi"+user.email);
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
		//alert("google-signin");
}
);

































