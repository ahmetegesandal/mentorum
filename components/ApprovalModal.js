import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext";

const ApprovalModal = () => {
  const userData = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState("");
  const [link, setLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (
      router?.pathname !== "/sign-in" &&
      router?.pathname !== "/forgot-password" &&
      router?.pathname !== "/register" &&
      router?.pathname !== "/" &&
      router?.pathname !== "/contact" &&
      router?.pathname !== "/verify-2fa" &&
      userData?.role === "teacher" &&
      userData?.is_approved === 0
    ) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [userData, router?.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend gönderimi burada yapılabilir
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    showModal && (
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ background: "rgba(0,0,0,0.5)" }}
        aria-labelledby="approvalModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="approvalModalLabel">
                Onay Bekleyen Hesap
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-3">
                Öğretmen olarak işlem yapabilmeniz için hesabınızın admin
                tarafından onaylanması gerekiyor.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Ad Soyad</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={`${userData?.name} ${userData?.surname}`}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">İletişim Numarası</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="05xx xxx xx xx"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bağlantı / Portfolyo</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://ornek.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Kapat
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ApprovalModal;
