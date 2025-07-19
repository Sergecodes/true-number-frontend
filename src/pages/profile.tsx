import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  // Protect route (redirect to login if not authenticated)
  useEffect(() => {
    if (!auth?.user) {
      router.push("/login");
    }
  }, [auth]);

  if (!auth?.user) {
    return null;
  }

  const { username, email, phone, role, balance } = auth.user;
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-lg mx-auto py-8">
        <Card>
          <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>
          <ul className="space-y-2 text-lg">
            <li><strong>Username:</strong> {username}</li>
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Phone:</strong> {phone}</li>
            <li><strong>Role:</strong> {role}</li>
            <li><strong>Current Balance:</strong> {balance} points</li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
