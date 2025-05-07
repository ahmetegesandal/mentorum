import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Account = ({ imagePreview, setImagePreview, file, setFile }) => {
    const { t } = useTranslation();
    
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [organization, setOrganization] = useState("Pixinvent");
    const [phoneNumber, setPhoneNumber] = useState("555 123 4547");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("California");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("");
    const [timezone, setTimezone] = useState("");
    const [currency, setCurrency] = useState("");

 const handleReset = () => {
  setFirstName("");
  setLastName("");
  setEmail("");
  setOrganization("");
  setPhoneNumber("");
  setAddress("");
  setState("");
  setZipCode("");
  setCountry("");
  setLanguage("");
  setTimezone("");
  setCurrency("");
  setImagePreview("/img/avatars/1.png"); // ✅ Artık Settings içinde tanımlandığı için hata vermez.
  setFile(null); // ✅ Dosyayı sıfırla
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted in Settings.js");
  };
  
const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImagePreview(objectURL);
      setFile(selectedFile);
    }
  };

  const handleUploadClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log("Upload successful:", result);

        if (result.filePath) {
          setImagePreview(result.filePath); 
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <div className="d-flex align-items-start align-items-sm-center gap-6">
        <Image
          src={imagePreview}
          alt="user-avatar"
          width={100}
          height={100}
          className="rounded"
        />
        <div className="button-wrapper">
          <label htmlFor="upload" className="btn btn-primary me-3 mb-4">
          {t("accountNewPhoto") }  
         <input
              type="file"
              id="upload"
              className="d-none"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="button"
            className="btn btn-outline-secondary mb-4"
            onClick={handleUploadClick}
          >
            {t("accountimg") }
          </button>
          <p className="text-muted mb-0">{t("allowedFormats") }
          </p>
        </div>
      </div>

      <div className="card-body pt-4">
                            <form id="formAccountSettings" onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="firstName" className="form-label">{t("firstName") }
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    autoFocus
                                  />
                                </div>
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="lastName" className="form-label">{t("lastName") }
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                  />
                                </div>
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="email" className="form-label">{t("accounteMail") }
                                  </label>
                                  <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john.doe@example.com"
                                  />
                                </div>
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="organization" className="form-label">{t("organization") }
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="organization"
                                    name="organization"
                                    value={organization}
                                    onChange={(e) => setOrganization(e.target.value)}
                                  />
                                </div>
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="phoneNumber" className="form-label">{t("phoneNumber") }
                                  </label>
                                  <div className="input-group input-group-merge">
                                    <span className="input-group-text">TR (+90)</span>
                                    <input
                                      type="text"
                                      id="phoneNumber"
                                      name="phoneNumber"
                                      className="form-control"
                                      value={phoneNumber}
                                      onChange={(e) => setPhoneNumber(e.target.value)}
                                      placeholder="555 123 4567"
                                    />
                                  </div>
                                </div>
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="address" className="form-label">{t("address") }
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="state" className="form-label">{t("state") }
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    name="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="California"
                                  />
                                </div>
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="zipCode" className="form-label">{t("zipCode") }
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="zipCode"
                                    name="zipCode"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="12345"
                                    maxLength="6"
                                  />
                                </div>
                                <div className="mb-4 col-md-6">
                                  <label htmlFor="country" className="form-label">{t("country") }
                                  </label>
                                  <select
                                                                  id="country"
                                                                  name="country"
                                                                  className="form-control"
                                                                  value={country}
                                                                  onChange={(e) => setCountry(e.target.value)}
                                                                >
                                                                  <option value="">Select Country</option>
                                                                  <option value="USA">United States</option>
                                                                  <option value="Canada">Canada</option>
                                                                  <option value="UK">United Kingdom</option>
                                                                  {/* Diğer ülkeler buraya eklenebilir */}
                                                                </select>
                                                              </div>
                                                              <div className="mb-4 col-md-6">
                                                                <label htmlFor="language" className="form-label">{t("language") }
                                                                </label>
                                                                <select
                                                                  id="language"
                                                                  name="language"
                                                                  className="form-control"
                                                                  value={language}
                                                                  onChange={(e) => setLanguage(e.target.value)}
                                                                >
                                                                  <option value="">Select Language</option>
                                                                  <option value="en">English</option>
                                                                  <option value="fr">French</option>
                                                                  <option value="de">German</option>
                                                                  {/* Diğer diller buraya eklenebilir */}
                                                                </select>
                                                              </div>
                                                              <div className="mb-4 col-md-6">
                                                                <label htmlFor="timezone" className="form-label">{t("timezone") }
                                                                </label>
                                                                <select
                                                                  id="timezone"
                                                                  name="timezone"
                                                                  className="form-control"
                                                                  value={timezone}
                                                                  onChange={(e) => setTimezone(e.target.value)}
                                                                >
                                                                  <option value="">Select Timezone</option>
                                                                  <option value="PST">Pacific Standard Time</option>
                                                                  <option value="EST">Eastern Standard Time</option>
                                                                  <option value="CST">Central Standard Time</option>
                                                                  {/* Diğer zaman dilimleri buraya eklenebilir */}
                                                                </select>
                                                              </div>
                                                              <div className="mb-4 col-md-6">
                                                                <label htmlFor="currency" className="form-label">{t("currency") }
                                                                </label>
                                                                <select
                                                                  id="currency"
                                                                  name="currency"
                                                                  className="form-control"
                                                                  value={currency}
                                                                  onChange={(e) => setCurrency(e.target.value)}
                                                                >
                                                                  <option value="">Select Currency</option>
                                                                  <option value="USD">US Dollar (USD)</option>
                                                                  <option value="EUR">Euro (EUR)</option>
                                                                  <option value="GBP">British Pound (GBP)</option>
                                                                </select>
                                                              </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                              <button type="submit" className="btn btn-primary">{t("saveChanges") }
                                                              </button>
                                                              <button
                                                               type="button" 
                                                               className="btn btn-outline-secondary"
                                                               onClick={handleReset} 
                                                              >
                                                                   {t("reset") }

                                                              </button>                                    
                                                           </div>
                                                          </form>
                                                        </div>
    </div>
  );
};

export default Account;
