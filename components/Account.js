import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Account = ({ imagePreview, setImagePreview, file, setFile, userData, loading }) => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.name || "");
      setLastName(userData.surname || "");
      setEmail(userData.email || "");
      setImagePreview(`/img/avatars/${userData.photo || "1.png"}`);
    }
  }, [userData]);

  if (loading || !userData) return <div className="text-center py-5">Yükleniyor...</div>;

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
            {t("accountNewPhoto")}
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
            {t("accountimg")}
          </button>
          <p className="text-muted mb-0">{t("allowedFormats")}</p>
        </div>
      </div>

      <div className="card-body pt-4">
        <form id="formAccountSettings" onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-4 col-md-6">
              <label htmlFor="firstName" className="form-label">
                {t("firstName")}
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
              <label htmlFor="lastName" className="form-label">
                {t("lastName")}
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
              <label htmlFor="email" className="form-label">
                {t("accounteMail")}
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
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {t("saveChanges")}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
