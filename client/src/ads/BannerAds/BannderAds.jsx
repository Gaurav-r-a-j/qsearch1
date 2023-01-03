import React from 'react';

const BannerAds = () => {
    return (
        <div className="banner-ad">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-YOUR_AD_CLIENT_ID"
                data-ad-slot="YOUR_AD_SLOT_ID"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}

export default BannerAds;
