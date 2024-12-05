"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@/components/Container";

interface PaymentMethod {
  id: string;
  name: string;
  accountNumber: string;
  logo: string;
}

interface PricingPlan {
  type: string;
  price: number;
  benefits: string[];
}

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Dummy pricing data
  const pricingPlans: PricingPlan[] = [
    {
      type: "Basic",
      price: 99000,
      benefits: [
        "Access to basic recipes",
        "Community forum access",
        "Monthly newsletter",
      ]
    },
    {
      type: "Premium",
      price: 199000,
      benefits: [
        "All Basic features",
        "Premium recipes access",
        "Video tutorials",
        "Priority support",
      ]
    },
    {
      type: "VIP",
      price: 299000,
      benefits: [
        "All Premium features",
        "Exclusive cooking events",
        "1-on-1 cooking consultation",
        "Custom meal planning",
        "24/7 support"
      ]
    }
  ];

  // Dummy payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "bca",
      name: "BCA",
      accountNumber: "1234-5678-9012",
      logo: "/images/bca.png"
    },
    {
      id: "mandiri",
      name: "Mandiri",
      accountNumber: "9876-5432-1098",
      logo: "/images/mandiri.png"
    },
    {
      id: "bni",
      name: "BNI",
      accountNumber: "4567-8901-2345",
      logo: "/images/bni.png"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/payments", {
        plan: selectedPlan,
        paymentMethod,
        amount: pricingPlans.find(plan => plan.type === selectedPlan)?.price
      });
      
      // Redirect to success page or show success message
      alert("Payment successfully processed!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Choose Your Plan
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Select a membership plan that suits your needs
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan) => (
          <div
            key={plan.type}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 
              ${selectedPlan === plan.type 
                ? 'border-indigo-500' 
                : 'border-transparent'}`}
            onClick={() => setSelectedPlan(plan.type)}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {plan.type}
            </h3>
            <p className="mt-4 text-4xl font-bold text-indigo-600">
              Rp {plan.price.toLocaleString()}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">/month</p>
            <ul className="space-y-3">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Payment Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selected Plan
              </label>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white">
                  {selectedPlan} - Rp {pricingPlans.find(plan => plan.type === selectedPlan)?.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer
                      ${paymentMethod === method.id 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900' 
                        : 'border-gray-200 dark:border-gray-700'}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="h-8 object-contain mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {method.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {method.accountNumber}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!paymentMethod || isLoading}
              className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition
                disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </button>
          </form>
        </div>
      )}
    </Container>
  );
}