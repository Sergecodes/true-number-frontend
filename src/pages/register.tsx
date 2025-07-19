import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Card from "../components/Card";
import Button from "../components/Button";
import { ToastContext } from "../context/ToastContext";
import { useContext } from "react";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const toastCtx = useContext(ToastContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/auth/register', JSON.stringify({ username, email, phone, password }));
      toastCtx?.addToast('Account created successfully! Please log in.', 'success');
      router.push('/login');
    } catch (err: any) {
      toastCtx?.addToast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl text-center text-cerulean font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" required placeholder="Username"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={username} onChange={e => setUsername(e.target.value)}
          />
          <input
            type="email" required placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input
            type="tel" required placeholder="Phone"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={phone} onChange={e => setPhone(e.target.value)}
          />
          <input
            type="password" required placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-cerulean hover:underline">Log in</a>
        </p>
      </Card>
    </div>
  );
}
