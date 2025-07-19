import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContext } from "../../context/ToastContext";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Link from "next/link";
import api from "@/lib/api";

interface UserEntry {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: "client" | "admin";
  balance: number;
}

export default function AdminUsersPage() {
  const auth = useContext(AuthContext);
  const toastCtx = useContext(ToastContext);
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ username: "", email: "", phone: "", password: "", role: "client" });
  const [adding, setAdding] = useState(false);

  // Fetch all users on load (admin-only action)
  useEffect(() => {
    if (!auth?.token) return;
    
    api.get("/users")
      .then(res => res.data)
      .then((data: any) => setUsers(data))
      .catch(err => console.error("Failed to fetch users", err))
      .then(() => setLoading(false));
  }, [auth?.token]);

  const handleDelete = async (userId: string) => {
    if (!auth?.token) return;
    if (!confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
      toastCtx?.addToast("User deleted successfully", "success");
    } catch (err) {
      toastCtx?.addToast("Failed to delete user", "error");
    }
  };

  const handleAddUser = async () => {
    if (!auth?.token) return;
    setAdding(true);

    try {
      const { data } = await api.post("/users", JSON.stringify(newUser)) as any;
      setAdding(false);
      setUsers([...users, data]);
      toastCtx?.addToast("New user created", "success");
      setNewUser({ username: "", email: "", phone: "", password: "", role: "client" });
    } catch (err) {
      setAdding(false);
      toastCtx?.addToast("Failed to create user", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 space-y-6">
        <Card>
          <h1 className="text-2xl font-bold mb-4">User Management</h1>

          {/* Add User Form */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Create New User</h2>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <input 
                type="text" placeholder="Username" required
                className="border rounded px-2 py-1"
                value={newUser.username} 
                onChange={e => setNewUser({ ...newUser, username: e.target.value })}
              />
              <input 
                type="email" placeholder="Email" required
                className="border rounded px-2 py-1"
                value={newUser.email} 
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input 
                type="tel" placeholder="Phone" required
                className="border rounded px-2 py-1"
                value={newUser.phone} 
                onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
              />
              <input 
                type="password" placeholder="Password" required
                className="border rounded px-2 py-1"
                value={newUser.password} 
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              />
              <select 
                value={newUser.role} 
                onChange={e => setNewUser({ ...newUser, role: e.target.value as "client"|"admin" })}
                className="border rounded px-2 py-1"
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button onClick={handleAddUser} disabled={adding}>
              {adding ? "Creating..." : "Add User"}
            </Button>
          </div>

          {/* Users List */}
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th className="py-1">Username</th>
                  <th className="py-1">Email</th>
                  <th className="py-1">Role</th>
                  <th className="py-1">Balance</th>
                  <th className="py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b last:border-0">
                    <td className="py-1">{u.username}</td>
                    <td className="py-1">{u.email}</td>
                    <td className="py-1">{u.role}</td>
                    <td className="py-1">{u.balance}</td>
                    <td className="py-1 space-x-2">
                      <Link href={`/admin/users/${u._id}`}>
                        <Button className="py-1 px-2 text-sm">Edit</Button>
                      </Link>
                      <Button onClick={() => handleDelete(u._id)} className="py-1 px-2 text-sm bg-red-600 hover:bg-red-700">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </main>
    </div>
  );
}
