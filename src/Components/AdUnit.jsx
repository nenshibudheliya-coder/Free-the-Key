{/* Google Ads */ }

import { useEffect, useRef, useState } from "react";

const AdUnit = ({ slot, style }) => {
    const adRef = useRef(null);

    useEffect(() => {
        try {
            if (window.adsbygoogle && adRef.current) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.log("Ad error:", e);
        }
    }, [slot]); // Re-run if slot changes

    return (
        <ins
            className="adsbygoogle"
            style={style || { display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
            ref={adRef}
        ></ins>
    );
};

export default AdUnit;