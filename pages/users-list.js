import React, { Component } from "react";
import Swal from "sweetalert2";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { withRouter } from "next/router";
import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      onlineUsers: {},
      searchQuery: "",
      currentPage: 1,
      usersPerPage: 5,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchOnlineUsers();

    this.onlineCheckInterval = setInterval(this.fetchOnlineUsers, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.onlineCheckInterval);
  }

  // 📌 Kullanıcıları API'den çek
  fetchUsers = async () => {
    try {
      const response = await fetch("/api/users-list");
      const data = await response.json();
      this.setState({ users: data.users || [], loading: false });
    } catch (error) {
      console.error("Kullanıcıları çekerken hata oluştu:", error);
      this.setState({ loading: false });
    }
  };

  // 📌 Online kullanıcı bilgilerini API'den çek
  fetchOnlineUsers = async () => {
    try {
      const response = await fetch("/api/online-users");
      if (!response.ok) throw new Error("Online kullanıcı bilgisi alınamadı");

      const data = await response.json();
      const onlineStatusMap = {};
      data.forEach((user) => {
        onlineStatusMap[user.id] = user.is_online === 1;
      });

      this.setState({ onlineUsers: onlineStatusMap }); // ✅ Online kullanıcı bilgilerini güncelle
    } catch (error) {
      console.error("Online kullanıcı bilgisi alınırken hata oluştu:", error);
    }
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value, currentPage: 1 });
  };

  handleEdit = (id) => {
    this.props.router.push(`/edit-user/${id}`);
  };

  handleProfile = (username) => {
    this.props.router.push(`/profile/${username}`);
  };

  handleDelete = async (id) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu kullanıcıyı silmek istiyor musunuz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/deleteUser?id=${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            this.setState((prevState) => ({
              users: prevState.users.filter((user) => user.id !== id),
            }));
            Swal.fire("Silindi!", "Kullanıcı başarıyla silindi.", "success");
          } else {
            Swal.fire("Hata!", "Silme işlemi başarısız oldu.", "error");
          }
        } catch (error) {
          Swal.fire("Hata!", "Silme işlemi sırasında hata oluştu.", "error");
        }
      }
    });
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const {
      users,
      searchQuery,
      currentPage,
      usersPerPage,
      loading,
      onlineUsers,
    } = this.state;

    if (loading) {
      return <p className="text-center mt-5">Yükleniyor...</p>;
    }

    // 📌 Kullanıcıları filtrele (arama kutusuna göre)
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 📌 Pagination hesaplamaları
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <>
        <LayoutMenu />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Kullanıcılar</h5>
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Kullanıcı Ara..."
                    value={searchQuery}
                    onChange={this.handleSearch}
                  />
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fotoğraf</th>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Durum</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                              <a
                                target="__blank"
                                onClick={() =>
                                  this.handleProfile(user.username)
                                }
                                className="cursor-pointer"
                              >
                                <div
                                  className={`avatar ${
                                    onlineUsers[user.id]
                                      ? "avatar-online"
                                      : "avatar-offline"
                                  }`}
                                >
                                  <img
                                    src={
                                      user.photo
                                        ? `/img/avatars/${user.photo}`
                                        : "/img/avatars/default.png"
                                    }
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                  />
                                </div>
                              </a>
                            </td>

                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                              {onlineUsers[user.id] ? (
                                <span className="text-success">🟢 Online</span>
                              ) : (
                                <span className="text-danger">🔴 Offline</span>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => this.handleEdit(user.id)}
                              >
                                Düzenle
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.handleDelete(user.id)}
                              >
                                Sil
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            Kullanıcı bulunamadı.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Önceki
                  </button>
                  <span>
                    Sayfa {currentPage} / {totalPages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sonraki
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default withRouter(withTranslation("common")(UsersList));
