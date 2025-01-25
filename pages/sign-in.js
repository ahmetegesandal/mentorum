import Link from "next/link";
import { useState } from "react";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // API çağrısı burada yapılabilir
  };

  return (
      <div>
        <div className="container-xxl">
          <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner py-6">
              {/* Login Card */}
              <div className="card">
                <div className="card-body">
                  {/* Logo */}
                  <div className="app-brand justify-content-center mb-6">
                    <Link href="/" className="app-brand-link">
                  <span className="app-brand-logo demo">
                    <svg
                        width="32"
                        height="22"
                        viewBox="0 0 32 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                          fill="#7367F0"
                      />
                      <path
                          opacity="0.06"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                          fill="#161616"
                      />
                      <path
                          opacity="0.06"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                          fill="#161616"
                      />
                      <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                          fill="#7367F0"
                      />
                    </svg>
                  </span>
                      <span className="app-brand-text demo text-heading fw-bold">Vuexy</span>
                    </Link>
                  </div>
                  {/* /Logo */}
                  <h4 className="mb-1">Welcome to Vuexy! 👋</h4>
                  <p className="mb-6">Please sign-in to your account and start the adventure</p>

                  <form id="formAuthentication" className="mb-4" onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="email" className="form-label">
                        Email or Username
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter your email or username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoFocus
                      />
                    </div>
                    <div className="mb-6 form-password-toggle">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <div className="input-group input-group-merge">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="input-group-text cursor-pointer">
                      <i className="ti ti-eye-off"></i>
                    </span>
                      </div>
                    </div>
                    <div className="my-8 d-flex justify-content-between">
                      <div className="form-check mb-0">
                        <input className="form-check-input" type="checkbox" id="remember-me"/>
                        <label className="form-check-label ms-2" htmlFor="remember-me">
                          Remember Me
                        </label>
                      </div>
                      <Link href="/forgot-password">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="mb-6">
                      <button className="btn btn-primary d-grid w-100" type="submit">
                        Login
                      </button>
                    </div>
                  </form>

                  <p className="text-center">
                    <span>New on our platform?</span>{" "}
                    <Link href="/register">
                      Create an account
                    </Link>
                  </p>


                </div>
              </div>
              {/* /Login Card */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
