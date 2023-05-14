import { useEffect } from "react";
import styles from "./footerpages.module.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={`${styles.policyTextContaier}  w100 d-flex-center mtop`}>
        <div
          className={`${styles.policyTexts}  d-flex-center pdl fd-col gapl `}
        >
          <b>
            At QSearch, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy outlines how we
            collect, use, and protect the information you provide to us when you
            use our online printing services.
          </b>
          <b>Information We Collect:</b>
          We collect personal information from you when you register on our
          website, place an order, or communicate with us via email or live
          chat. This information may include your name, address, phone number,
          email address, and payment information.
          <b>How We Use Your Information:</b>
          <p>
            We use the information we collect from you to process your orders
            and provide you with high-quality printing services. We may also use
            your information to improve our website, customer service, and
            marketing efforts.
          </p>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as
            required by law or as necessary to provide our services to you. We
            may share your information with our trusted third-party service
            providers who assist us in operating our website, conducting our
            business, or servicing you.
          </p>
          <p>
            We use standard security measures to protect your personal
            information from unauthorized access, use, or disclosure. We also
            implement a variety of security measures to maintain the safety of
            your personal information when you place an order or enter, submit,
            or access your personal information.
          </p>
          <b>Cookies:</b>
          <p>
            We use cookies to enhance your browsing experience and to
            personalize our services for you. Cookies are small text files that
            are stored on your computer or mobile device when you visit our
            website. You may choose to disable cookies through your browser
            settings, but this may affect your ability to use certain features
            of our website.
          </p>
          <b>Third-Party Links:</b>
          <p>
            Our website may contain links to third-party websites that have
            their own privacy policies. We are not responsible for the privacy
            practices or content of these third-party websites.
          </p>
          <b>Changes to Our Privacy Policy:</b>
          <p>
            We reserve the right to modify this Privacy Policy at any time. If
            we make changes to our Privacy Policy, we will notify you by email
            or by posting the updated policy on our website.
          </p>
          <b>Contact Us:</b>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at support@qsearch.com. We are committed to
            protecting your privacy and will do our best to address any issues
            or concerns you may have.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
