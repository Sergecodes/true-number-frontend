import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { ToastContext } from "../context/ToastContext";

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const toastCtx = useContext(ToastContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    
    try {
      await auth.login(email, password);
      // On success, auth.login will redirect to /
    } catch (err: any) {
      toastCtx?.addToast("Login failed: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl text-center text-cerulean font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email" required placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password" required placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          New user?{" "}
          <a href="/register" className="text-cerulean hover:underline">Create an account</a>
        </p>
      </Card>
    </div>
  );
}
