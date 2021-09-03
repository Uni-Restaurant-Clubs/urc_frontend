import GoogleLoginButton from "./googleLoginButton";
import "./index.css"

const SocialLoginButtons: React.FC = () => {
  return (
    <>
    <GoogleLoginButton/>
    <br/>
    <p className="socialButtonsText">or connect with email...</p>
    </>
  );
};

export default SocialLoginButtons;
