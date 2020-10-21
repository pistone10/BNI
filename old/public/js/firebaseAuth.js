function checkIflLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
        if ( user ) {
            console.log( 'User signed in' )
            console.log( user )
            // var photoURL = user.photoURL

            document.getElementById("google-displayName").innerHTML = user.displayName
            document.getElementById("google-email").innerHTML = user.email
            
            // document.getElementById('google-pic')
            //         .setAttribute('src', photoURL)            
            // do logged in stuff
            document.getElementById('google-signin')
            .setAttribute('style', 'display: none; visibility: hidden')                    
            document.getElementById('signout')
            .setAttribute('style', 'display: inline-block; visibility: visible')                
        } else {
            console.log( 'User not signed in.' )

            document.getElementById("google-displayName").innerHTML = ""
            document.getElementById("google-email").innerHTML = ""

            // do not logged in stuff
            document.getElementById('google-signin')
            .setAttribute('style', 'display: inline-block; visibility: visible')
            document.getElementById('signout')
            .setAttribute('style', 'display: none; visibility: hidden')                
        }
    })
}

window.onload = function() {
    checkIflLoggedIn()
}

function signOut(){
    firebase.auth().signOut()
    
    // document.getElementById('google-pic')
    // .setAttribute('src', '')
    
    checkIflLoggedIn()
}

async function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider()

    var auth 
    try {
        auth = await firebase.auth().signInWithPopup(googleAuthProvider)
    } catch (error) {
        console.log(error)
        checkIflLoggedIn()
    }
    // var photoURL = auth.additionalUserInfo.profile.picture

    var idToken = auth.credential.idToken
            
    // document.getElementById('google-pic').src = photoUR
    

    checkIflLoggedIn()
}