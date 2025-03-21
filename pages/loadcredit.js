// pages/payment.js
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "next-i18next";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const { t } = useTranslation("common");
  const userData = useContext(UserContext);

  const [cardNumber, setCardNumber] = useState("1234 5678 1234 5678");
  const [expiryDate, setExpiryDate] = useState("12/29");
  const [cvv, setCvv] = useState("123");
  const [cardHolder, setCardHolder] = useState("Mentorum");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id,
          amount: parseFloat(amount),
        }),
      });

      if (!res.ok) throw new Error("API error");

      setAmount("");

      await Swal.fire({
        icon: "success",
        title: "✔️",
        text: "Ödeme başarılı!",
        confirmButtonText: "Tamam",
      });
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Bir hata oluştu.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="container my-5">
          <h1 className="text-center mb-4">{t("paymentTitle")}</h1>
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  <i className="ti ti-currency-dollar me-2"></i> {t("amount")}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  id="amount"
                  className="form-control"
                  placeholder="100.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  <i className="ti ti-credit-card me-2"></i> {t("cardNumber")}
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="form-control"
                  placeholder="1234 5678 1234 5678"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">
                  <i className="ti ti-calendar me-2"></i> {t("expiryDate")}
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  className="form-control"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  <i className="ti ti-lock me-2"></i> {t("cvv")}
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="form-control"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cardHolder" className="form-label">
                  <i className="ti ti-user me-2"></i> {t("cardHolder")}
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  className="form-control"
                  placeholder="Card Holder Name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-100 ${
                  isProcessing ? "disabled" : ""
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? t("processing") : t("payNow")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default PaymentPage;
