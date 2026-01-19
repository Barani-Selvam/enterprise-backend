import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      login(res.data.token, res.data.username, res.data.role);

      navigate("/", { state: { loginSuccess: true } });
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      if (err.response) {
        // API responded (401, 400, etc.)
        setError(err.response.data?.message || "Invalid email or password");
      } else {
        // Network / server issue
        setError("Unable to connect to server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-3 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={submit} autoComplete="on">
        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          type="email"
          name="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
