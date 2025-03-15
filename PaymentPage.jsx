import React from "react";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          amount: 500,
          currency: "INR",
        }),
      });

      const order = await response.json();

      const options = {
        key: "rzp_test_qxy4J5QefmSVcQ",
        amount: order.amount,
        currency: order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Razorpay Payment</h1>
      <button
        onClick={handlePayment}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
