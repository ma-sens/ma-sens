import Script from "next/script";

export const GTM_ID = "GTM-56X7F9VS";

export function GoogleTagManagerHead() {
  return (
    <>
      {/* 1. Google Consent Mode v2 Default Initialization */}
      <script
        id="gtm-consent-default"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Consent Mode inline initialization
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            var storedConsent = null;
            try {
              var raw = localStorage.getItem('masens_cookie_consent_v1');
              if (raw) { storedConsent = JSON.parse(raw); }
            } catch(e) {}

            if (storedConsent && typeof storedConsent.analytics === 'boolean') {
              gtag('consent', 'default', {
                'analytics_storage': storedConsent.analytics ? 'granted' : 'denied',
                'ad_storage': storedConsent.marketing ? 'granted' : 'denied',
                'ad_user_data': storedConsent.marketing ? 'granted' : 'denied',
                'ad_personalization': storedConsent.marketing ? 'granted' : 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
            } else {
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
            }
          `,
        }}
      />

      {/* 2. Google Tag Manager Main Script */}
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: standard Google Tag Manager loader script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
