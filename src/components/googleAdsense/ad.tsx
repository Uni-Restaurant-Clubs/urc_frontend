import React, { useEffect } from "react";
declare global {
   interface Window {
     adsbygoogle:any;
   }
}

const Ad = () => {
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle
        console.log({ adsbygoogle })
        adsbygoogle.push({})
      } catch (e) {
        console.error(e)
      }
    }

    let interval = setInterval(() => {
      // Check if Adsense script is loaded every 300ms
      if (window.adsbygoogle) {
        pushAd()
        // clear the interval once the ad is pushed so that function isn't called indefinitely
        clearInterval(interval)
      }
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ins className='adsbygoogle'
      style={{ display: 'block' }}
      data-ad-client="ca-pub-5330535476800778"
      data-ad-slot="1048728954"
      data-full-width-responsive="true"
      data-ad-format='auto'/>
  )
}
export default Ad;
