"use client";

import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Japan",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  return (
    <main className="min-h-screen bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {["Shipping", "Payment", "Confirmation"].map((label, idx) => (
            <div key={label} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === ["shipping", "payment", "confirmation"][idx]
                    ? "bg-primary text-primary-foreground"
                    : ["shipping", "payment", "confirmation"].indexOf(step) > idx
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-foreground"
                }`}
              >
                {idx + 1}
              </div>
              <span className="ml-2 font-medium text-foreground">{label}</span>
              {idx < 2 && <div className="flex-1 h-1 mx-2 bg-gray-300"></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="bg-card rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="+81 90-1234-5678"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Tokyo"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="100-0001"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Continue to Payment
                </Button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="bg-card rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Payment Information</h2>

                <div className="mb-6">
                  <div className="flex gap-4 mb-4">
                    {["Credit Card", "Bank Transfer", "Convenience Store"].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          defaultChecked
                          value={method}
                          className="mr-2"
                        />
                        <span className="text-foreground">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Demo Mode:</strong> This is a preview checkout. Complete integration
                    with payment providers (Stripe, PayPay, etc.) will be added in production.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    size="lg"
                    onClick={() => setStep("shipping")}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" size="lg">
                    Complete Order
                  </Button>
                </div>
              </form>
            )}

            {step === "confirmation" && (
              <div className="bg-card rounded-lg shadow p-8 text-center">
                <div className="text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
                <p className="text-muted-foreground mb-6">
                  Order #ORD-
                  {Math.random().toString().slice(2, 8).padStart(6, "0")}
                </p>
                <p className="text-muted-foreground mb-8">
                  A confirmation email has been sent to {formData.email}
                </p>
                <div className="flex gap-4">
                  <Button className="flex-1" size="lg" asChild>
                    <Link href={ROUTES.ORDERS}>View Order</Link>
                  </Button>
                  <Button variant="secondary" className="flex-1" size="lg" asChild>
                    <Link href={ROUTES.PRODUCTS()}>Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Basmati Rice (1kg) x2</span>
                  <span className="font-medium">¥9.98</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Red Chili Powder x1</span>
                  <span className="font-medium">¥3.49</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>¥13.47</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>¥10.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>¥1.35</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">¥24.82</span>
              </div>

              <div className="text-xs text-muted-foreground space-y-2">
                <p>✓ Free returns within 30 days</p>
                <p>✓ Secure checkout</p>
                <p>✓ Fast delivery to Japan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
