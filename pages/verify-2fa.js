import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

const Verify2FA = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const inputsRef = useRef([]);
  const [token, setToken] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const t = sessionStorage.getItem("tempToken");
    if (!t) setError("Geçici token bulunamadı.");
    else setToken(t);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("resendCooldown");
    if (saved && !isNaN(+saved)) {
      setResendCooldown(+saved);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          const next = prev - 1;
          sessionStorage.setItem("resendCooldown", String(next));
          if (next <= 0) {
            clearInterval(timer);
            sessionStorage.removeItem("resendCooldown");
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = code.split("");
      newCode[index] = value;
      const updated = newCode.join("");
      setCode(updated);
      if (value && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }

      // Auto submit when all digits entered
      if (updated.length === 6 && updated.replace(/\D/g, "").length === 6) {
        handleVerify(null, updated);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && inputsRef.current[index - 1]) {
      const newCode = code.split("");
      newCode[index - 1] = "";
      setCode(newCode.join(""));
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = async (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");

    if (!/^\d{6}$/.test(paste))
      return setError("Lütfen 6 haneli bir kod yapıştırın.");

    setCode(paste);
    paste.split("").forEach((num, idx) => {
      if (inputsRef.current[idx]) {
        inputsRef.current[idx].value = num;
      }
    });
    if (inputsRef.current[5]) inputsRef.current[5].focus();

    // Auto submit
    handleVerify(null, paste);
  };

  const handleVerify = async (e, overrideCode = null) => {
    if (e) e.preventDefault();
    const verifyCode = overrideCode || code;
    setError(null);

    if (verifyCode.length !== 6) {
      setError("6 haneli kodu eksiksiz giriniz.");
      return;
    }

    const res = await fetch("/api/verify-2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, code: verifyCode }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    sessionStorage.setItem("2fa-verified", "true");

    await new Promise((res) => setTimeout(res, 100));
    router.replace("/main");
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      const res = await fetch("/api/resend-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResendCooldown(60);
      sessionStorage.setItem("resendCooldown", "60");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner py-6">
          <div className="card">
            <div className="card-body">
              <h4 className="mb-1">Two Step Verification 💬</h4>
              <p className="text-start mb-6">
                E-posta adresinize doğrulama kodu gönderildi.
                <span className="fw-medium d-block mt-1 text-heading">
                  ******@email
                </span>
              </p>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={(e) => handleVerify(e)}>
                <div className="mb-6">
                  <div className="auth-input-wrapper d-flex align-items-center justify-content-between numeral-mask-wrapper">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputsRef.current[i] = el)}
                        type="tel"
                        className="form-control auth-input h-px-50 text-center numeral-mask mx-sm-1 my-2"
                        maxLength="1"
                        value={code[i] || ""}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        onPaste={handlePaste}
                      />
                    ))}
                  </div>
                  <input type="hidden" name="otp" value={code} />
                </div>
                <button
                  className="btn btn-primary d-grid w-100 mb-6"
                  type="submit"
                >
                  Verify my account
                </button>
                <div className="text-center">
                  Kod gelmedi mi?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleResend();
                    }}
                    className={resendCooldown > 0 ? "text-muted" : ""}
                  >
                    {resendCooldown > 0
                      ? `Tekrar gönder (${resendCooldown})`
                      : "Tekrar Gönder"}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify2FA;
