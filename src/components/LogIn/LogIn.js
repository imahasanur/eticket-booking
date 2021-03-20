import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './LogIn.css';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

const LogIn = () => {

  const [user, setUser] = useState({
    isSingedIn:false,
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(true)
  const [error, setError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const history = useHistory();
  const location = useLocation();

  let {from} = location.state || {from: {pathname: "/"}};

  const handleSubmit= (e) =>{

    // create user with email and password
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        setSignedUp(!signedUp);
        setSignInError("");
        setNewUser(!newUser);
        updateProfile(user.name);       
        console.log("created user",currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSignInError(errorMessage);
      });
    }

    // Sign is user with email and password
    if(!newUser && user.email && user.password){
      setSignedUp(false);
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        const newUserr = {...user};
        newUserr.isSignedIn = true;
        newUserr.name = currentUser.displayName;
        setLoggedInUser(newUserr);
        setUser(newUserr);
        setSignInError("");
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSignInError(errorMessage);
      });
    }
    
    e.preventDefault();
  }
  
  const handleBlur= (e) =>{
    let isFormValid =true;
    if(e.target.name === "email"){
      let email = e.target.value ;
      let reg = /\S+@\S+\.\S+/;
      if (! reg.test(email)){
        isFormValid = false;
        setError("Email format is not correct");
      }
      else{
        isFormValid = true;
        setError("");
      }
    }

    if(e.target.name === "confirmPassword"){
      let confirmPassword = e.target.value ;
      if(user.password === confirmPassword && user.password.length > 6){
        isFormValid =true;
        setError('');
      }
      else{
        isFormValid = false;
        setError("confirm password is not matched or password length should be greater than 6");
      }
    }
    
    if(isFormValid && !(e.target.value === "")){
      const newUser = {...user};
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSingIn = () =>{

    //sign in with google pop up
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      const token = credential.accessToken;
      const currentUser = result.user;
      const {displayName, email} =currentUser;
      let newUser = {...user};
      newUser.isSignedIn = true;
      newUser.name = displayName;
      newUser.email = email;
      setUser(newUser);
      setLoggedInUser(newUser);
      history.replace(from);

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
  });

  }

  // update  profile name
  const updateProfile = (name)=>{
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
      photoURL:""})
    .then(function() {})
    .catch(function(error) {
    });
  }

  return (
    <div className=" p-5">
      <form className="login-form ml-5" onSubmit={ handleSubmit}>
        {newUser && <div className="mb-3 row">
          <input type="text" name = "name" onBlur={handleBlur} className="offset-2 form-control col-8 col-sm-8 col-md-4"  placeholder="Name " required />
        </div>}
        <div className="mb-3 row">
          <input type="email" name="email" onBlur={handleBlur} className="offset-2 form-control col-8 col-sm-8 col-md-4"  placeholder="Email " required />
          {<p className="offset-2 col-8 col-sm-8 col-md-9">{user.email==="" && error}</p>}
        </div>
        <div className="mb-3 row">
          <input type="password" name="password" onBlur={handleBlur} className="offset-2 form-control col-8 col-sm-8 col-md-4"  placeholder="Password minimum length 7 .." required />
        </div>
        {newUser && <div className="mb-3 row">
          <input type="password" name="confirmPassword" onBlur={handleBlur}className="offset-2 form-control col-8 col-sm-8 col-md-4"  placeholder="Confirm password minimum length 7 .." required />
          {<p className="offset-2 col-8 col-sm-8 col-md-9">{user.password && error}</p>}
       </div>}
        {newUser && <div className="mb-3 row">
          {error === "" ? <input type="submit"  value="Create An Account" className="offset-2 form-control col-8 col-sm-8 col-md-4 btn btn-success" />:
            <h4 className="offset-2 col-8 col-sm-8 col-md-7" >Fix the problem</h4>}
            <p className="offset-2 col-8 col-sm-8 col-md-7" >Already have an Account? <span onClick={()=>setNewUser(!newUser)} style={{color:'green',textDecoration:'underline'}}>LogIn</span></p>

        </div>}
        {!newUser && <div className="mb-3 row">
          <input type="submit"  value="Log In" className="offset-2 form-control col-8 col-sm-8 col-md-4 btn btn-success" />
          <p className="offset-2 col-8 col-sm-8 col-md-7" >Don't have an Account? <span onClick={()=>setNewUser(!newUser)} style={{color:'green',textDecoration:'underline'}}>Create an Account</span></p>
        </div>}
        {signInError && <p className="offset-2 col-8 col-sm-8 col-md-7" ><span style={{color:'red'}}>{signInError}</span></p>}
        {user.isSingedIn && <p className="offset-2 col-8 col-sm-8 col-md-7" ><span style={{color:'green'}}>Logged In SuccessFully!!</span></p>}
        {signedUp && <p className="offset-2 col-8 col-sm-8 col-md-7" ><span style={{color:'green'}}>Sign Up SuccessFully!!</span></p>}

      </form>
      <div className ="row mb-3 ml-4">
          <button onClick = {handleGoogleSingIn} className =" offset-2 col-8 col-sm-8 col-md-4 form-control">Sing In with Google</button>
      </div>
  
    </div>
  );
};

export default LogIn;