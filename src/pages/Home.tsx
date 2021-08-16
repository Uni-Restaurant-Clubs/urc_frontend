// import {
//   IonButton,
//   IonContent,
//   IonHeader,
//   IonPage,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
// import { Link } from "react-router-dom";
// import "./Home.css";
// import Header from "../components/Header";

// //import capacitor
// import "@codetrix-studio/capacitor-google-auth";
// import { Plugins } from '@capacitor/core'; 


// const signIn = () => {
//   // const { history } = this.props;
//   const result = Plugins.GoogleAuth.signIn();
//   console.info('result', result);
//   if (result) {
//     console.log("REsult =>", result);
//     // history.push({
//     //   pathname: '/home',
//     //   state: { name: result.name || result.displayName, image: result.imageUrl, email: result.email }
//     // });
//   }
// }

// const Home: React.FC = () => {

//   return (
//     <>
//       <IonPage>
//         <Header headertitle="Hello" />
//         <IonContent className="ion-padding bgImg ">
//           <div className="home-container">
//             <h2 className="main-title">Home Page</h2>
//             <IonContent fullscreen>
//               <div className="center">
//                 <Link to="/register">
//                   <IonButton>Register</IonButton>
//                 </Link>
//                 <Link to="/login">
//                   <IonButton>Login</IonButton>
//                 </Link>
//                 <IonButton color="primary" onClick={ () => 
//                   // console.log("Clicked")
//                   signIn() 
//                   }>Google Login</IonButton>
//               </div>
//             </IonContent>
//           </div>
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default Home;
import { Link } from "react-router-dom";
import "./Home.css";
import Header from "../components/Header";
import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { Plugins } from '@capacitor/core'; 
import "@codetrix-studio/capacitor-google-auth";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

//695551314101-bvlmfqjqn703td68db49rqre47qoilg2.apps.googleusercontent.com (android)

const INITIAL_STATE = {

};

class Home extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
    console.log("page loaded");
    GoogleAuth.init()
  }

  async signIn(): Promise<void> {
    try {
      console.log("Signin");
      const { history } = this.props;
      const result = await GoogleAuth.signIn();
      console.info('result', result);
      if (result) {
        console.log("res =>", result);
        // history.push({
        //   pathname: '/home',
        //   state: { name: result.name || result.displayName, image: result.imageUrl, email: result.email }
        // });
      }
    } catch (error) {
      console.log("error gpi =>", error);
    }
  }

   // Only needed when web
   public gooogleAuthInitWeb() {
     console.log("Google Auth in Web");
     try {
      //  GoogleAuth.init();
      // GoogleAuth.signIn()
     } catch (error) {
       console.log("err =>", error);
     }
  }

  render() {
    return (
          <IonPage>
        <Header headertitle="Hello" />
        <IonContent className="ion-padding bgImg ">
          <div className="home-container">
            <h2 className="main-title">Home Page</h2>
            <IonContent fullscreen>
              <div className="center">
                <Link to="/register">
                  <IonButton>Register</IonButton>
                </Link>
                <Link to="/login">
                  <IonButton>Login</IonButton>
                </Link>
                <IonButton color="primary" onClick={ () => 
                  this.signIn() 
                  }>Google Login</IonButton>
              </div>
            </IonContent>
          </div>
        </IonContent>
      </IonPage>
    )
  }
}

export default Home;
