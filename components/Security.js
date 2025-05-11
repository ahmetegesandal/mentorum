import { useState } from "react";
import { useTranslation } from "next-i18next";
import axios from "axios";

const Security = () => {
  const { t } = useTranslation("common");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    setErrors({ currentPassword: '', newPassword: '', confirmPassword: '' });

    let hasError = false;

    if (newPassword.length < 8) {
      setErrors((prev) => ({ ...prev, newPassword: '*Password must be at least 8 characters long!' }));
      hasError = true;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '*Passwords do not match!' }));
      hasError = true;
    }

    if (hasError) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.status === 200 ? "Password changed successfully!" : "Error changing password!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing the password.");
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/two-factor",
        { enable: !twoFactorEnabled },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setTwoFactorEnabled(!twoFactorEnabled);
        alert(!twoFactorEnabled ? "Two-factor authentication enabled." : "Two-factor authentication disabled.");
      }
    } catch (error) {
      alert("Failed to toggle two-factor authentication.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-8">

          {/* Change Password Section */}
          <div className="card mb-4">
            <div className="card-header fw-bold">{t("Change Password")}</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">{t("Current Password")}</label>
                  <div className="input-group">
                    <input type={showCurrentPassword ? "text" : "password"} className="form-control" name="currentPassword" id="currentPassword" />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                      <i className={showCurrentPassword ? "ti ti-eye" : "ti ti-eye-off"}></i>
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">{t("New Password")}</label>
                  <div className="input-group">
                    <input type={showNewPassword ? "text" : "password"} className="form-control" name="newPassword" id="newPassword" />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowNewPassword(!showNewPassword)}>
                      <i className={showNewPassword ? "ti ti-eye" : "ti ti-eye-off"}></i>
                    </button>
                  </div>
                  {errors.newPassword && <div className="form-text text-danger">{errors.newPassword}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">{t("Confirm New Password")}</label>
                  <div className="input-group">
                    <input type={showConfirmPassword ? "text" : "password"} className="form-control" name="confirmPassword" id="confirmPassword" />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <i className={showConfirmPassword ? "ti ti-eye" : "ti ti-eye-off"}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="form-text text-danger">{errors.confirmPassword}</div>}
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">{t("Save changes")}</button>
                  <button type="reset" className="btn btn-secondary">{t("Reset")}</button>
                </div>
              </form>
            </div>
          </div>

          {/* Two-Factor Section */}
          <div className="card">
            <div className="card-header fw-bold">Two-Factor Authentication</div>
            <div className="card-body">
              <p>{twoFactorEnabled ? "Two-factor authentication is enabled." : "Two-factor authentication is not enabled yet."}</p>
              <button className="btn btn-outline-primary" onClick={handleTwoFactorToggle}>
                {twoFactorEnabled ? "Disable" : "Enable"} Two-Factor Authentication
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Security;