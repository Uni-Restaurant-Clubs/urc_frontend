import { IonButton} from '@ionic/react';
import React, { Component } from 'react';
import './index.css';
declare global {
    interface Window {
        FB:any;
    }
}

class FacebookLoginButton extends Component {
  
  async signIn(): Promise<void> {
    window.FB.login(function(response:any) {
      console.log("auth response", response);
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         window.FB.api('/me', function(response:any) {
           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'email', 
        return_scopes: true
    });
  }

  render() {
    return (
        <IonButton className="login-button" onClick={() => this.signIn()} expand="full" fill="solid" color="primary">
        Login with Facebook
      </IonButton>
    )
  }
}
export default FacebookLoginButton;