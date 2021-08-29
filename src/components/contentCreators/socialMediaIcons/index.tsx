import React from "react";
import "./index.css"

interface Creator {
  facebook_url: string,
  youtube_url: string,
  instagram_url: string,
  linkedin_url: string,
  website_url: string,
}

const SocialMediaIcons: React.FC<{creator: Creator}> = ({ creator }) => {

  return (
    <>
      { creator &&
        <div className="socialIcons">
          { creator?.instagram_url &&
            <div className="socialIcon">
              <a target="_blank" href={creator?.instagram_url}>
                <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/Instagram_icon.png" height="25"/>
              </a>
            </div>
          }
          { creator?.youtube_url &&
            <div className="socialIcon">
              <a target="_blank" href={creator?.youtube_url}>
                <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/youtube-icon.png" height="25"/>
              </a>
            </div>
          }
          { creator?.facebook_url &&
            <div className="socialIcon">
              <a target="_blank" href={creator?.facebook_url}>
                <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/facebook_logo.png" height="25"/>
              </a>
            </div>
          }
          { creator?.linkedin_url &&
            <div className="socialIcon">
              <a target="_blank" href={creator?.linkedin_url}>
                <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/linkedin-icon.png" height="25"/>
              </a>
            </div>
          }
          { creator?.website_url &&
            <div className="socialIcon">
              <a target="_blank" href={creator?.website_url}>
                <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/website-icon.png" height="25"/>
              </a>
            </div>
          }
        </div>
      }
    </>
  );
};

export default SocialMediaIcons;
