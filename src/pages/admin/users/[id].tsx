import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ToastContext } from "../../../context/ToastContext";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import api from "@/lib/api";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query; // Get user ID from URL parameters
  const auth = useContext(AuthContext);
  const toastCtx = useContext(ToastContext);

  const [userData, setUserData] = useState({ username: "", email: "", phone: "", role: "client" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!auth?.token || !id) return;
    
    api.get(`/users/${id}`)
      .then(res => res.data)
      .then((data: any) => {
        setUserData({ 
          username: data.username, 
          email: data.email, 
          phone: data.phone, 
          role: data.role 
        });
      })
      .catch(err => console.error("Failed to load user", err))
      .then(() => setLoading(false));
  }, [auth?.token, id]);

  const handleSave = async () => {
    if (!auth?.token || !id) return;
    setSaving(true);

    try {
      await api.put(`/users/${id}`, JSON.stringify(userData));
      setSaving(false);
      toastCtx?.addToast("User updated successfully", "success");
      router.push("/admin/users");
    } catch (err) {
      setSaving(false);
      toastCtx?.addToast("Failed to update user", "error");
    } 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-lg mx-auto py-8">
        <Card>
          <h1 className="text-2xl font-bold mb-4">Edit User {userData.username}</h1>
          {loading ? <p>Loading user data...</p> : (
            <div className="space-y-3">
              <input 
                type="text" placeholder="Username" 
                className="w-full border rounded px-3 py-1"
                value={userData.username}
                onChange={e => setUserData({ ...userData, username: e.target.value })}
              />
              <input 
                type="email" placeholder="Email" 
                className="w-full border rounded px-3 py-1"
                value={userData.email}
                onChange={e => setUserData({ ...userData, email: e.target.value })}
              />
              <input 
                type="tel" placeholder="Phone" 
                className="w-full border rounded px-3 py-1"
                value={userData.phone}
                onChange={e => setUserData({ ...userData, phone: e.target.value })}
              />
              <select 
                className="w-full border rounded px-3 py-1"
                value={userData.role}
                onChange={e => setUserData({ ...userData, role: e.target.value })}
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-between mt-4">
                <Button onClick={() => router.push("/admin/users")} className="bg-gray-300 text-black">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
