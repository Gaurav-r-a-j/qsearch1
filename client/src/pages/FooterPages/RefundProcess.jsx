import { useEffect } from "react";
import styles from "./footerpages.module.css";

const RefundProcess = () => {
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
            At QSearch, we strive to provide high-quality printing services and
            customer satisfaction. If you are not satisfied with your order, we
            offer a refund policy to ensure your peace of mind.
          </p>
          <p>
            Refunds will be processed through Razorpay, our payment gateway
            provider. The refund process may take up to 7 business days to
            reflect on your account, depending on your bank's policies.
          </p>
          <b>Refunds will be issued in the following cases:</b>
          <b>Order Cancellation: </b>
          <p>
            If you cancel your order before it is printed, you will receive a
            full refund to your original payment method.
          </p>
          <b> Printing Errors:</b>
          <p>
            will provide a full refund to your original payment method or
            reprint your order at no additional cost to you.
          </p>{" "}
          If there is an error in the printing process that is our fault, we
          <b>Damaged or Lost Orders:</b>
          <p>
            If your order is lost or damaged during shipping, we will either
            issue a full refund to your original payment method or reprint your
            order at no additional cost to you.
          </p>
          <b>Dissatisfaction:</b>
          <p>
            If you are not satisfied with the quality of our printing services,
            we will work with you to resolve any issues and, if necessary,
            provide a refund or reprint of your order.
          </p>
          <p>
            Please note that refunds will not be issued for orders that have
            already been printed and shipped. If you request a refund for an
            order that has already been printed and shipped, we will not be able
            to process your request.
          </p>
          <p>
            If you would like to request a refund, please contact our customer
            service team within 5 business days of receiving your order. We will
            work with you to resolve any issues and, if necessary, initiate the
            refund process.
          </p>
          We hope that our refund policy provides you with the confidence to
          order from QSearch with ease. If you have any questions or concerns,
          please do not hesitate to contact our customer service team.
        </div>
      </div>
    </>
  );
};

export default RefundProcess;
