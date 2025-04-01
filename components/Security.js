import { useState } from "react";
import { useTranslation } from "next-i18next";

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

    // Reset error states
    setErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    let hasError = false;

    // Validate password length
    if (newPassword.length < 8) {
      setErrors((prev) => ({ ...prev, newPassword: '*Password must be at least 8 characters long!' }));
      hasError = true;
    }

    // Validate if passwords match
    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '*Passwords do not match!' }));
      hasError = true;
    }

    if (hasError) {
      return; 
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        alert("Password changed successfully!");
      } else {
        alert("Error changing password!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing the password.");
    }
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(twoFactorEnabled ? "Two-factor authentication disabled." : "Two-factor authentication enabled.");
  };

  return (
    <div className="container">
      {/* Change Password Section */}
      <div className="card mb-4">
        <h5 className="card-header">{t("Change Password")}</h5>
        <div className="card-body">
          <form id="formAccountSettings" onSubmit={handleSubmit} className="security-form">
            <div className="mb-3">
              <label className="form-label" htmlFor="currentPassword">{t("Current Password")}</label>
              <div className="input-group-security">
                <input
                  className="password-input-security"
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  role="button"
                  aria-label={showCurrentPassword ? t("Hide password") : t("Show password")}
                >
                  <i className={showCurrentPassword ? "ti ti-eye" : "ti ti-eye-off"}></i>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="newPassword">{t("New Password")}</label>
              <div className="input-group-security">
                <input
                  className="password-input-security"
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  role="button"
                  aria-label={showNewPassword ? t("Hide password") : t("Show password")}
                >
                  <i className={showNewPassword ? "ti ti-eye" : "ti ti-eye-off"}></i>
                </span>
              </div>
              {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="confirmPassword">{t("Confirm New Password")}</label>
              <div className="input-group-security">
                <input
                  className="password-input-security"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  role="button"
                  aria-label={showConfirmPassword ? t("Hide password") : t("Show password")}
                >
                  <i className={showConfirmPassword ? "ti ti-eye" : "ti ti-eye-off"}></i>
                </span>
              </div>
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>

            {/* Button Container with flexbox */}
            <div className="button-container">
              <button type="submit" className="btn btn-primary">{t("Save changes")}</button>
              <button type="reset" className="btn btn-secondary">{t("Reset")}</button>
            </div>
          </form>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="card mb-4">
        <h5 className="card-header">Two-Steps Verification</h5>
        <div className="card-body">
          <p>{twoFactorEnabled ? "Two-factor authentication is enabled." : "Two-factor authentication is not enabled yet."}</p>
          <button className="btn btn-primary" onClick={handleTwoFactorToggle}>
            {twoFactorEnabled ? "Disable" : "Enable"} Two-Factor Authentication
          </button>
        </div>
      </div>

      {/* Recent Devices Section */}
      <div className="card mb-4">
        <h5 className="card-header">Recent Devices</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Browser</th>
                <th>Device</th>
                <th>Location</th>
                <th>Recent Activities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i className="ti ti-brand-windows me-2 text-info"></i>Chrome on Windows</td>
                <td>HP Spectre 360</td>
                <td>Switzerland</td>
                <td>10, July 2021 20:07</td>
              </tr>
              <tr>
                <td><i className="ti ti-device-mobile me-2 text-success"></i>Chrome on iPhone</td>
                <td>iPhone 12x</td>
                <td>Australia</td>
                <td>13, July 2021 10:10</td>
              </tr>
              <tr>
                <td><i className="ti ti-brand-android me-2 text-success"></i>Chrome on Android</td>
                <td>Oneplus 9 Pro</td>
                <td>Dubai</td>
                <td>14, July 2021 15:15</td>
              </tr>
              <tr>
                <td><i className="ti ti-brand-apple me-2"></i>Chrome on MacOS</td>
                <td>Apple iMac</td>
                <td>India</td>
                <td>16, July 2021 16:17</td>
              </tr>
              <tr>
                <td><i className="ti ti-brand-windows me-2 text-warning"></i>Chrome on Windows</td>
                <td>HP Spectre 360</td>
                <td>Switzerland</td>
                <td>20, July 2021 21:01</td>
              </tr>
              <tr>
                <td><i className="ti ti-brand-android me-2 text-success"></i>Chrome on Android</td>
                <td>Oneplus 9 Pro</td>
                <td>Dubai</td>
                <td>21, July 2021 12:22</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Security;
