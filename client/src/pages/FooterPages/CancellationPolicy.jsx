import { useEffect } from "react";
import styles from "./footerpages.module.css";

const CancellationPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={`${styles.policyTextContaier}  w100 d-flex-center mtop`}>
        <div
          className={`${styles.policyTexts} ${styles.marginforP}  d-flex-center pdl fd-col gapl `}
        >
          <b>Cancellation Policy </b>
          <p>
            At QSearch, we understand that sometimes situations arise where you
            may need to cancel your order. However, please note that once your
            order has been printed, it cannot be canceled and no refund will be
            provided. We recommend that you carefully review your order before
            placing it to avoid any issues.
          </p>

          <p>
            If you wish to cancel your order, please do so before the printing
            process has begun. Once the printing process has started, your order
            cannot be canceled or refunded.
          </p>

          <p>
            If you need to cancel your order, please contact our customer
            service team as soon as possible via email or phone. We will do our
            best to accommodate your request if it is made before the printing
            process has begun.
          </p>

          <p>
            Please note that we reserve the right to cancel any order at our
            discretion. In the event that we need to cancel your order, we will
            notify you as soon as possible and provide a full refund.
          </p>

          <p>
            We take our customer satisfaction seriously and will work with you
            to resolve any issues or concerns you may have. If you have any
            questions about our cancellation policy, please don't hesitate to
            contact us.
          </p>
        </div>
      </div>
    </>
  );
};

export default CancellationPolicy;
