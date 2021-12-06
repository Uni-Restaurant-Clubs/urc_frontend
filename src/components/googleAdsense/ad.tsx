import React from 'react';
  declare global {
    interface Window {
      adsbygoogle:any;
    }
  }

export default class Ad extends React.Component {
  render() {
    return (
      <ins className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5330535476800778"
        data-ad-slot="1048728954"
        data-full-width-responsive="true"
        data-ad-format='auto' />
    );
  }
}
