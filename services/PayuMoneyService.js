const payUMoney = require("payumoney_nodejs");
const request = require("request");
const sha512 = require("js-sha512");

// const router = new express.Router();
class PaymentService {

  constructor() {
    // Set you MERCHANT_KEY, MERCHANT_SALT_KEY, PAYUMONEY_AUTHORIZATION_HEADER
    // for both Production and Sandox Account
    payUMoney.isProdMode(true);
    payUMoney.setProdKeys(
      "BzEd4Y8c",
      "ajQOmuM0rO",
      "vXGRbhioUVMBB9RlbWLWBflPwd4mPaCWG55xXQo0Vhs="
    );
    payUMoney.setSandboxKeys(
      "BzEd4Y8c",
      "ajQOmuM0rO",
      "vXGRbhioUVMBB9RlbWLWBflPwd4mPaCWG55xXQo0Vhs="
    );
    payUMoney.isProdMode(true);
  }


  async makePayment(paymentBody, callback) {
    let payment = {
      email: "",
      txnid: paymentBody.orderId,
      amount: paymentBody.amount,
      productinfo: "Sophia Academy",
      firstname: paymentBody.name,
      phone: paymentBody.phoneNumber,
      surl: 'https://www.appsophia.com/edu/api/user/paymentSuccess',
      furl: 'https://www.appsophia.com/edu/api/user/paymentFailure'
      // surl: 'localhost:3000/payment/success',
      // furl: 'localhost:3000/payment/failure'

    }
    payUMoney.pay(payment, (error, response) => {
      if (error) {
        // console.log('Code Execution Reached Here,error')
        console.error("makePayment error : " + error);
      } else {
        // console.log('Code Execution Reached Here,success')
        console.log("Payment Redirection link " + response);
        callback(error, { url: response });
      }
    });
  }


  // async makePayment(paymentBody, callback) {
  //   console.log("PayU: ", paymentBody);
  //   // await OrderService.createOrder(paymentBody)
  //   //   .then((createdOrder) => {
  //       // if (createdOrder) {
  //         let totalGrand = paymentBody.amount;

  //         let payUmoneyURL = "https://secure.payu.in/_payment";
  //         // let payUmoneyURL = "https://sandboxsecure.payu.in/_payment";

  //         let headers = {
  //           authorization: "Y2zBh0LKU+jxSG9mepF8szu3taBfB1LE9WWkEUfHri0=",
  //         };

  //         let credentails = {
  //           key: "UewQeELm",
  //           salt: "wwuGOQehED",
  //         };

  //         let sophiaCredentails = {
  //           key: "BzEd4Y8c",
  //           salt: "ajQOmuM0rO",
  //         };
  //         let sophiaPayment = {
  //           email: "",
  //           txnid: paymentBody.orderId,
  //           amount: totalGrand,
  //           productinfo: "Sophia Academy",
  //           firstname: paymentBody.name,
  //           phone: paymentBody.phoneNumber,
  //           surl: "https://www.appsophia.com/edu/api/user/success",
  //           furl: "https://www.appsophia.com/edu/api/user/failure",
  //           key: sophiaCredentails.key,
  //           payUmoneyURL: payUmoneyURL,
  //         };

  //         var sophiaHashData = {
  //           hashSequence:
  //             sophiaCredentails.key +
  //             "|" +
  //             sophiaPayment.txnid +
  //             "|" +
  //             sophiaPayment.amount +
  //             "|" +
  //             sophiaPayment.productinfo +
  //             "|" +
  //             sophiaPayment.firstname +
  //             "|" +
  //             sophiaPayment.email +
  //             "|||||||||||" +
  //             sophiaCredentails.salt,
  //         };

  //         var sophiaHash = sha512(sophiaHashData.hashSequence);
  //         sophiaPayment.hash = sophiaHash;

  //         callback({ payuParams: sophiaPayment });
  //       // } else callback(null, { status: "Payment Failed" });
  //     // })
  //     // .catch((err) => callback(err));
  // }

  async paymentSuccess(paymentSuccessBody, callback) {
    console.log("Payment Success");
    console.log("Payment Details : " + JSON.stringify(paymentSuccessBody));


    let paymentModal = JSON.stringify(paymentSuccessBody);
    console.log("paymentModal", paymentSuccessBody);

    // You can Update your user payment Success status here
    callback(null, { status: "Payment Success" });
  }

  async paymentFailure(paymentFailureBody, callback) {
    console.log("Payment Failure");
    console.log("Payment Details : " + JSON.stringify(paymentFailureBody));
    // You can Update your user payment Failure status here
    callback(null, { status: "Payment Failed" });
  }
}

Object.seal(PaymentService);

module.exports = new PaymentService();
