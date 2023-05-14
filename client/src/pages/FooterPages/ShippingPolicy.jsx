import { useEffect } from "react";
import styles from "./footerpages.module.css";

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={`${styles.policyTextContaier}  w100 d-flex-center mtop`}>
        <div
          className={`${styles.policyTexts} ${styles.marginforP}  d-flex-center pdl fd-col gapl `}
        >
          <b>Shipping Policy:</b>
            <p>
              At QSearch, we understand that timely delivery of your order is
              crucial. That's why we offer fast and reliable shipping options
              for college students. The minimum delivery time for our standard
              shipping option is 1 day, and it can take up to 7 days depending
              on your location and the shipping option you choose.
            </p>
            <p>
              Once your order has been printed, we will process and ship it
              within 1 business day. You will receive a tracking number via
              email so you can track your package's progress.
            </p>
            <p>
              If you need your order to be delivered faster than our standard
              shipping option, we offer expedited shipping options for an
              additional fee. Please contact our customer service team for more
              information.
            </p>
            <b> Return Policy:</b>
            <p>
              At QSearch, we strive to provide high-quality printing services
              and customer satisfaction. If you are not satisfied with your
              order, please contact our customer service team within 5 business
              days of receiving your order.
            </p>
            <p>
              We will work with you to resolve any issues and, if necessary,
              provide a refund or reprint of your order. Please note that we do
              not accept returns of printed materials unless there is a defect
              or error in the printing.
            </p>
            <p>
              If you need to return your order, please contact our customer
              service team for instructions on how to proceed.
            </p>
            <p>
              Please note that we are not responsible for any delays in shipping
              due to weather, natural disasters, or other unforeseen
              circumstances beyond our control. We will do our best to keep you
              informed of any such delays and work with you to resolve any
              issues that may arise.
            </p>
            <p>
              We hope that our shipping and return policy provides you with the
              confidence to order from QSearch with ease. If you have any
              questions or concerns, please do not hesitate to contact our
              customer service team.
            </p>

        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
