import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { parseQuery } from "../utils/utils";
import { Plugins,registerWebPlugin } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from '@capacitor-community/facebook-login';

interface errorHandling {
  userNameError: null;
  passwordError: null;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const [email, setEmail] = useState(null);

  const [userNameError, setUserNameError] = useState<errorHandling | any>(null);
  const [passwordError, setPasswordError] = useState<errorHandling | any>(null);

  const [password, setPassword] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const signupLoading = useSelector((state: any) => state.signupLoading);
  const apiError = useSelector((state: any) => state.signInFail);
  

  
  useEffect(() => {
    let queryParams: any = parseQuery(window.location.search);
    if (queryParams.error) {
      setAlertMessage(queryParams.error);
      setShowAlert(true);
    } else if (queryParams.email_confirmed) {
      setAlertMessage("Email is now verified. You can now log in");
      setShowAlert(true);
    }
    
  }, []);

  const loginUser = async () => {
    let res = await dispatch(authActions.loginUser({ email, password }));
    if (res && res.length > 0) {
      window.location.reload();
      setEmail(null);
      setPassword(null);
      router.push("/main");
    } else if (apiError) {
    }
  };

  useEffect(() => {
    if (apiError) {
      if (Array.isArray(apiError.message)) {
        let outputError = apiError.message.map((errMsg: any) => {
          return `<li>${errMsg}</li>`;
        });

        setAlertMessage(
          `<ul class="errorMessageStyle">${outputError.join("")}</ul`
        );
        setShowAlert(true);
      } else {
        setAlertMessage(
          `<ul class="errorMessageStyle"><li>${apiError.message ||
          "Oops looks like something went wrong. Please try again soon"
          }</li></ul`
        );
        setShowAlert(true);
      }
    } else {
    }
  }, [apiError]);
  //login with facebook user
  const fbloginUser = async () => { 
     try {
      const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];
    
      const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
      var token =result.accessToken.token
      const response = await fetch(`https://graph.facebook.com/${result.accessToken.userId}?fields=id,name,gender,link,email,picture&type=large&access_token=${result.accessToken.token}`);
      const myJson = await response.json();
      let res = await dispatch(authActions.loginWithSocialUser('facebook',{ "token":token }));
      if (res && res.length > 0) {
        //setEmail(null);
        //setPassword(null);
        router.push("/main");
      }
     } catch (error) {
      
     }
   
    
   // alert(myJson)
    //console.log(myJson);
  };
//End fb login
  //login with google user
  const gmailLoginUser = async () => { 
   ;
  
 // const per = await Plugins.GoogleAuth.checkPermissions();
  //console.log(per);`
  //
  try {
    const result = await Plugins.GoogleAuth.signIn();
     
   
    var token=result.serverAuthCode
    
     let res = await dispatch(authActions.loginWithSocialUser('google',{ "authorization_code":token }));
     if (res && res.length > 0) {
       //setEmail(null);
       //setPassword(null);
       router.push("/main");
     }
  } catch (error) {
    await Plugins.GoogleAuth.init()
    setTimeout(async() => {
      const result = await Plugins.GoogleAuth.signIn();
     
   
    var token=result.serverAuthCode
    
     let res = await dispatch(authActions.loginWithSocialUser('google',{ "authorization_code":token }));
     if (res && res.length > 0) {
       //setEmail(null);
       //setPassword(null);
       router.push("/main");
     }
    }, 1000);
  }
    
    //alert("name : "+ result.displayName)
  };
  return (
    <div className=" ">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding bgImg ">
          <IonLoading
            spinner="bubbles"
            message="Please wait ..."
            duration={0}
            isOpen={signupLoading}
          />

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setShowAlert(false);
              setAlertMessage("");
            }}
            header={"Alert"}
            message={alertMessage}
            buttons={[
              {
                text: "Ok",
                cssClass: "confirmButtonStyle rightButton",
                handler: () => {
                  setAlertMessage("");
                },
              },
            ]}
          />

          <div className="main-container">
            <h2 className="main-title">Login</h2>
            <IonItem>
              <IonLabel
                color={userNameError ? "danger" : ""}
                position="floating"
              >
                Email
              </IonLabel>
              <IonInput
                placeholder="Email"
                required={true}
                onIonChange={(e: any) => setEmail(e.target.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel
                color={passwordError ? "danger" : ""}
                position="floating"
              >
                Password
              </IonLabel>
              <IonInput
                type="password"
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={loginUser}
              style={{ marginTop: "1rem" }}
            >
              Login
            </IonButton>
            
            <IonButton
              expand="block"
              onClick={fbloginUser }
              style={{ marginTop: "1rem" }}
            >
              Login With Facebook
            </IonButton>

            <IonButton
              expand="block"
              onClick={gmailLoginUser}
              style={{ marginTop: "1rem" }}
            >
              Login With Google
            </IonButton>
 


            <div className="center">
            {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
              <p>
                New here? <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </p>
              <p>
                <Link to="/emailConfirmation">Resend Confirmation mail ?</Link>
              </p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Login;
