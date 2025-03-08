import React, { Component } from "react";
import Swal from "sweetalert2";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";
import { withRouter } from "next/router";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchQuery: "",
      currentPage: 1,
      usersPerPage: 5,
      loading: true,
    };
  }

  handleEdit = (id) => {
    this.props.router.push(`/edit-user/${id}`);
  };

  handleProfile = (username) => {
    this.props.router.push(`/profile/${username}`);
  };

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await fetch("/api/users-list");
      const data = await response.json();
      this.setState({ users: data.users || [], loading: false });
    } catch (error) {
      console.error("Kullanıcıları çekerken hata oluştu:", error);
      this.setState({ loading: false });
    }
  }

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value, currentPage: 1 });
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
    const { users, searchQuery, currentPage, usersPerPage, loading } =
      this.state;

    if (loading) {
      return <p className="text-center mt-5">Yükleniyor...</p>;
    }

    const filteredUsers = (users || []).filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
                                <img
                                  src={
                                    `/img/avatars/${user.photo}` ||
                                    "/img/default-avatar.png"
                                  }
                                  alt="User Avatar"
                                  className="rounded-circle"
                                  width="40"
                                  height="40"
                                />
                              </a>
                            </td>

                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.is_online ? "Online" : "Offline"}</td>
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

export default withRouter(UsersList);
