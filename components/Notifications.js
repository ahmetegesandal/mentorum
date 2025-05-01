import { useState } from "react";
import { useTranslation } from "next-i18next";

const Notifications = () => {
  const { t } = useTranslation("common");

  const [sendNotification, setSendNotification] = useState("Only when I'm online");
  
  const handleNotificationChange = (event) => {
    setSendNotification(event.target.value);
  };

  return (
    <div className="card shadow-none">
      <div className="card-body">
        <h5 className="mb-0">Recent Devices</h5>
        <span>
          We need permission from your browser to show notifications.
          <span className="notificationRequest">
            <span className="text-primary">Request Permission</span>
          </span>
        </span>
        <div className="error"></div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-nowrap">Type</th>
              <th className="text-nowrap text-center">Email</th>
              <th className="text-nowrap text-center">Browser</th>
              <th className="text-nowrap text-center">App</th>
            </tr>
          </thead>
          <tbody>
            {["New for you", "Account activity", "A new browser used to sign in", "A new device is linked"].map((type, index) => (
              <tr key={index}>
                <td className="text-nowrap text-heading">{type}</td>
                {[...Array(3)].map((_, i) => (
                  <td key={i}>
                    <div className="form-check d-flex justify-content-center">
                      <input className="form-check-input" type="checkbox" defaultChecked={index !== 3 || i !== 1} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-body">
        <h6 className="text-body mb-6">When should we send you notifications?</h6>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-sm-6">
              <select id="sendNotification" className="form-select" name="sendNotification" value={sendNotification} onChange={handleNotificationChange}>
                <option>Only when I'm online</option>
                <option>Anytime</option>
              </select>
            </div>
            <div className="mt-6">
              <button type="submit" className="btn btn-primary me-3">Save changes</button>
              <button type="reset" className="btn btn-label-secondary">Discard</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notifications;
