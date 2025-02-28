import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"; // Next.js yönlendirme için
import Logo from "../components/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Router kullanımı

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Giriş başarısız!");
      }

      // Token'i sakla
      localStorage.setItem("token", data.token);
      console.log("Giriş başarılı! Token:", data.token);

      // Yönlendirme (Next.js Router ile)
      router.replace("/main"); // replace kullanarak yönlendir
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                    <Logo />
                  </Link>
                </div>
                {/* /Logo */}
                <h4 className="mb-1">Welcome to Vuexy! 👋</h4>
                <p className="mb-6">
                  Please sign-in to your account and start the adventure
                </p>

                <form
                  id="formAuthentication"
                  className="mb-4"
                  onSubmit={handleSubmit}
                >
                  {error && <p className="text-danger">{error}</p>}

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

                  <div className="mb-6">
                    <button
                      className="btn btn-primary d-grid w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>

                <p className="text-center">
                  <span>New on our platform?</span>{" "}
                  <Link href="/register">Create an account</Link>
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
