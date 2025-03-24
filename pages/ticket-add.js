// ticket-add.js
import { useState, useContext } from "react";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const TicketsCreate = () => {
  const router = useRouter();
  const userData = useContext(UserContext);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tickets", {
        subject,
        description,
        user_id: userData.id,
      });
      Swal.fire("Başarılı", "Destek talebiniz oluşturuldu.", "success").then(
        () => {
          router.push("/tickets");
        }
      );
    } catch (error) {
      Swal.fire("Hata", "Talep oluşturulurken hata oluştu.", "error");
    }
  };

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row g-4">
              <div className="col-lg-8 mx-auto">
                <div className="card shadow-lg rounded-3">
                  <div className="card-body">
                    <h3 className="mb-4 text-primary text-center">
                      Destek Talebi Oluştur
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        {/* Konu Başlığı */}
                        <div className="col-md-12">
                          <label
                            htmlFor="subject"
                            className="form-label fw-semibold"
                          >
                            Konu
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-2"
                            id="subject"
                            placeholder="Konu başlığını girin"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </div>

                        {/* Açıklama */}
                        <div className="col-md-12">
                          <label
                            htmlFor="description"
                            className="form-label fw-semibold"
                          >
                            Açıklama
                          </label>
                          <textarea
                            className="form-control rounded-2"
                            id="description"
                            placeholder="Açıklamanızı yazın..."
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Butonlar */}
                      <div className="d-flex justify-content-end mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary px-4 me-2"
                        >
                          Gönder
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-4"
                          onClick={() => router.push("/tickets-list")}
                        >
                          İptal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Alt Bilgi */}
                <p className="text-center mt-3 text-muted">
                  Destek taleplerinizi <span className="fw-bold">hızlı</span> ve{" "}
                  <span className="fw-bold">kolay</span> bir şekilde
                  oluşturabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketsCreate;
