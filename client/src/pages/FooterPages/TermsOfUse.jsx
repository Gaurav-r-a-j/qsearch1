import { useEffect } from "react";
import styles from "./footerpages.module.css";

const TermsofUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={`${styles.policyTextContaier}  w100 d-flex-center mtop`}>
        <div
          className={`${styles.policyTexts}  d-flex-center pdl fd-col gapl `}
        >
          <p>
            Welcome to QSearch! We are glad you have chosen to use our online
            printing services. The following terms of use ("Terms") govern your
            use of our website and services. By using our website or services,
            you agree to be bound by these Terms. If you do not agree with these
            Terms, please do not use our website or services.
          </p>
          <b> Services Offered:</b>
          <p>
            QSearch offers online printing services for college students. Our
            services include printing and binding of various materials such as
            assignments, projects, thesis, and other documents. We also offer
            binding and laminating services.{" "}
          </p>
          <b>Registration and Account Creation:</b>
          <p>
            In order to use our services, you may need to register and create an
            account with us. You are responsible for maintaining the
            confidentiality of your account information and passwords. You agree
            to provide accurate and complete information during the registration
            process and to update your information as necessary.
          </p>
          <b>Use of Our Services:</b>
          <p>
            You agree to use our services only for lawful purposes and in
            compliance with all applicable laws, regulations, and these Terms.
            You may not use our services to upload, transmit, or distribute any
            content that is illegal, harmful, fraudulent, defamatory, or
            infringes upon the rights of others.
          </p>
          <b>Intellectual Property:</b>
          <p>
            All content on our website, including text, graphics, logos, images,
            and software, is the property of QSearch or its affiliates and is
            protected by copyright and other intellectual property laws. You may
            not copy, reproduce, or distribute any content from our website
            without our prior written consent.
          </p>
          <b>Payment:</b>
          <p>
            You agree to pay for all services ordered through our website.
            Prices are subject to change without notice. We accept various
            payment methods, including credit card, PayPal, and other online
            payment methods.
          </p>
          <b>Shipping:</b>
          <p>
            We will ship your order to the shipping address you provide during
            the checkout process. We are not responsible for any delays or
            damages that occur during shipping. Shipping fees are calculated
            based on the shipping method you choose and the destination.
          </p>
          <b>Refunds:</b>
          <p>
            Refunds may be issued in the event of an error or defect in the
            printing process or if we are unable to fulfill your order. Refunds
            will be issued to the original payment method used for the order.
          </p>
          <b>Limitation of Liability:</b>
          <p>
            In no event shall QSearch be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in
            connection with your use of our website or services. QSearch's
            liability for any claim arising out of these Terms shall be limited
            to the amount paid by you for the services ordered.
          </p>
          <b>Termination:</b>
          <p>
            We may terminate your account and access to our services at any time
            for any reason, including without limitation, if you violate these
            Terms.
          </p>
          <b>Governing Law:</b>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the state in which QSearch is headquartered. Any legal
            action arising out of these Terms shall be brought in the courts
            located in that state.
          </p>
          <b>Modification of Terms:</b>
          <p>
            We reserve the right to modify these Terms at any time without
            notice. Your continued use of our website or services after any
            changes to these Terms constitutes your acceptance of the changes.
            If you have any questions or concerns about these Terms, please
            contact our customer service team.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsofUse;
