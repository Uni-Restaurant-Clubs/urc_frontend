import GoogleLoginButton from "./googleLoginButton";
import FacebookLoginButton from "./facebookLoginButton";
import "./index.css"

const SocialLoginButtons: React.FC = () => {
  return (
    <>
    <GoogleLoginButton/>
    <br/>
    <FacebookLoginButton/>
    <br/>
    <p className="socialButtonsText">or connect with email...</p>
    </>
  );
};

export default SocialLoginButtons;
