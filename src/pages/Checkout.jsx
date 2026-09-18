import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Building2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { courses } from "../data/courses.js";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = useMemo(
    () =>
      courses.find(
        (item) => String(item.id) === String(id)
      ),
    [id]
  );

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const [upiId, setUpiId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!course) {
    return (
      <main className="not-found">
        <div>
          <span>404</span>
          <h1>Course Not Found</h1>
          <p>We couldn't find this course.</p>

          <Link
            to="/courses"
            className="primary-btn"
          >
            Browse Courses
          </Link>
        </div>
      </main>
    );
  }

  const price = Number(course.price) || 0;
  const oldPrice = Number(course.oldPrice) || price;

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  const formatCardNumber = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 16);

    return numbers.replace(
      /(.{4})/g,
      "$1 "
    ).trim();
  };

  const formatExpiry = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (numbers.length > 2) {
      return `${numbers.slice(
        0,
        2
      )}/${numbers.slice(2)}`;
    }

    return numbers;
  };

  const validatePayment = () => {
    if (paymentMethod === "card") {
      const cleanCard = cardNumber.replace(
        /\s/g,
        ""
      );

      if (cleanCard.length !== 16) {
        return "Please enter a valid 16-digit card number.";
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        return "Please enter a valid expiry date.";
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        return "Please enter a valid CVV.";
      }

      if (name.trim().length < 2) {
        return "Please enter the name on your card.";
      }
    }

    if (paymentMethod === "upi") {
      if (
        !/^[\w.-]+@[\w.-]+$/.test(
          upiId.trim()
        )
      ) {
        return "Please enter a valid UPI ID.";
      }
    }

    return "";
  };

  const handlePayment = (event) => {
    event.preventDefault();

    setError("");

    const validationError =
      validatePayment();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const existing = JSON.parse(
          localStorage.getItem(
            "learnify-enrolled"
          ) || "[]"
        );

        const updated = Array.from(
          new Set([
            ...existing,
            Number(course.id),
          ])
        );

        localStorage.setItem(
          "learnify-enrolled",
          JSON.stringify(updated)
        );

        localStorage.setItem(
          "learnify-payment",
          JSON.stringify({
            courseId: Number(course.id),
            courseTitle: course.title,
            amount: price,
            method: paymentMethod,
            date: new Date().toISOString(),
            status: "success",
          })
        );

        localStorage.setItem(
          "learnify-last-course",
          String(course.id)
        );

        navigate(
          `/payment-success/${course.id}`
        );
      } catch {
        setError(
          "Something went wrong. Please try again."
        );
        setLoading(false);
      }
    }, 1400);
  };

  return (
    <main className="checkout-page">

      {/* HEADER */}
      <header className="checkout-header">
        <div className="checkout-header-inner">

          <Link
            to={`/course/${course.id}`}
            className="checkout-back"
          >
            <ArrowLeft size={18} />
            Back to course
          </Link>

          <div className="checkout-secure">
            <Lock size={15} />
            Secure Checkout
          </div>

        </div>
      </header>

      <div className="checkout-container">

        {/* PAGE TITLE */}
        <div className="checkout-heading">

          <div>
            <span>LEARNIFY CHECKOUT</span>
            <h1>Complete your enrollment</h1>
            <p>
              You're one step away from starting
              your learning journey.
            </p>
          </div>

          <div className="checkout-steps">
            <div className="checkout-step active">
              <span>1</span>
              Details
            </div>

            <ChevronRight size={16} />

            <div className="checkout-step active">
              <span>2</span>
              Payment
            </div>

            <ChevronRight size={16} />

            <div className="checkout-step">
              <span>3</span>
              Complete
            </div>
          </div>

        </div>

        <div className="checkout-grid">

          {/* LEFT */}
          <section className="checkout-payment-card">

            <div className="checkout-card-heading">
              <div>
                <span className="checkout-label">
                  PAYMENT METHOD
                </span>
                <h2>Choose how you'd like to pay</h2>
              </div>

              <ShieldCheck size={22} />
            </div>

            {/* METHODS */}
            <div className="payment-methods">

              <button
                type="button"
                className={`payment-method ${
                  paymentMethod === "card"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("card")
                }
              >
                <span className="payment-method-icon">
                  <CreditCard size={20} />
                </span>

                <span>
                  <strong>Card</strong>
                  <small>
                    Credit or debit card
                  </small>
                </span>

                <span className="payment-radio">
                  {paymentMethod === "card" && (
                    <Check size={13} />
                  )}
                </span>
              </button>

              <button
                type="button"
                className={`payment-method ${
                  paymentMethod === "upi"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >
                <span className="payment-method-icon">
                  <Smartphone size={20} />
                </span>

                <span>
                  <strong>UPI</strong>
                  <small>
                    Google Pay, PhonePe, etc.
                  </small>
                </span>

                <span className="payment-radio">
                  {paymentMethod === "upi" && (
                    <Check size={13} />
                  )}
                </span>
              </button>

              <button
                type="button"
                className={`payment-method ${
                  paymentMethod === "netbanking"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "netbanking"
                  )
                }
              >
                <span className="payment-method-icon">
                  <Building2 size={20} />
                </span>

                <span>
                  <strong>
                    Net Banking
                  </strong>
                  <small>
                    Pay using your bank
                  </small>
                </span>

                <span className="payment-radio">
                  {paymentMethod ===
                    "netbanking" && (
                    <Check size={13} />
                  )}
                </span>
              </button>

            </div>

            <form
              className="payment-form"
              onSubmit={handlePayment}
            >

              {paymentMethod === "card" && (
                <>
                  <div className="form-field full">
                    <label>
                      Name on card
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value
                        )
                      }
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-field full">
                    <label>
                      Card number
                    </label>

                    <div className="input-with-icon">
                      <CreditCard
                        size={17}
                      />

                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(event) =>
                          setCardNumber(
                            formatCardNumber(
                              event.target.value
                            )
                          )
                        }
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>

                  <div className="payment-two-fields">

                    <div className="form-field">
                      <label>
                        Expiry date
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        value={expiry}
                        onChange={(event) =>
                          setExpiry(
                            formatExpiry(
                              event.target.value
                            )
                          )
                        }
                        placeholder="MM/YY"
                      />
                    </div>

                    <div className="form-field">
                      <label>CVV</label>

                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={cvv}
                        onChange={(event) =>
                          setCvv(
                            event.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="•••"
                      />
                    </div>

                  </div>
                </>
              )}

              {paymentMethod === "upi" && (
                <div className="form-field full">
                  <label>
                    UPI ID
                  </label>

                  <div className="input-with-icon">
                    <Smartphone
                      size={17}
                    />

                    <input
                      type="text"
                      value={upiId}
                      onChange={(event) =>
                        setUpiId(
                          event.target.value
                        )
                      }
                      placeholder="yourname@upi"
                    />
                  </div>

                  <small className="field-help">
                    Enter your UPI ID to continue.
                  </small>
                </div>
              )}

              {paymentMethod ===
                "netbanking" && (
                <div className="bank-demo-box">
                  <Building2 size={24} />

                  <div>
                    <strong>
                      Net Banking
                    </strong>

                    <p>
                      Select your bank on the
                      secure payment screen.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="payment-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="pay-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="payment-spinner" />
                    Processing payment...
                  </>
                ) : (
                  <>
                    <Lock size={17} />
                    Pay ${price.toFixed(2)} & Enroll
                  </>
                )}
              </button>

              <div className="secure-payment-note">
                <Lock size={14} />
                Your payment information is
                encrypted and secure.
              </div>

            </form>

          </section>

          {/* RIGHT ORDER SUMMARY */}
          <aside className="checkout-summary">

            <div className="summary-top">
              <span className="checkout-label">
                ORDER SUMMARY
              </span>

              <h2>Your course</h2>
            </div>

            <div className="checkout-course">

              <img
                src={course.image}
                alt={course.title}
              />

              <div>
                <span>
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <p>
                  By {course.instructor}
                </p>
              </div>

            </div>

            <div className="summary-details">

              <div>
                <span>Course price</span>
                <strong>
                  ${price.toFixed(2)}
                </strong>
              </div>

              {discount > 0 && (
                <div>
                  <span>Discount</span>
                  <strong className="discount-text">
                    -{discount}%
                  </strong>
                </div>
              )}

              <div>
                <span>Platform fee</span>
                <strong>Included</strong>
              </div>

            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>
                ${price.toFixed(2)}
              </strong>
            </div>

            <div className="checkout-benefits">

              <div>
                <Check size={16} />
                Lifetime course access
              </div>

              <div>
                <Check size={16} />
                Certificate of completion
              </div>

              <div>
                <Check size={16} />
                Learn at your own pace
              </div>

              <div>
                <Check size={16} />
                30-day money-back guarantee
              </div>

            </div>

            <div className="checkout-trust">

              <ShieldCheck size={20} />

              <div>
                <strong>
                  Secure payment
                </strong>

                <span>
                  Your information is protected
                  with secure encryption.
                </span>
              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
   );
}

export default Checkout;