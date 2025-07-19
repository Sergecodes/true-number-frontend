import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import api from "@/lib/api";

interface GameRecordAdmin {
  _id: string;
  user: { _id: string, username?: string, email: string, phone: string } | null; // null if user deleted
  createdAt: string;
  generatedNumber: number;
  result: 1 | 0;
  balanceChange: number;
  newBalance: number;
}

export default function AdminHistoryPage() {
  const auth = useContext(AuthContext);
  const [history, setHistory] = useState<GameRecordAdmin[]>([]);

  useEffect(() => {
    /** Fetch all game history */
    async function fetchHistory() {
      try {
        const { data } = await api.get('/history/all') as any;
        setHistory(data);
      } catch (err) {
        console.error('Failed to load full history', err);
      }
    }

    if (!auth?.token) return;
    fetchHistory();
  }, [auth?.token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-3xl mx-auto py-8">
        <Card>
          <h1 className="text-2xl font-bold mb-4 text-center">All Game History</h1>
          <table className="w-full text-sm text-left">
            <thead className="border-b">
              <tr>
                <th className="py-1">User</th>
                <th className="py-1">Date</th>
                <th className="py-1">Number</th>
                <th className="py-1">Result</th>
                <th className="py-1">Change</th>
                <th className="py-1">Balance After</th>
              </tr>
            </thead>
            <tbody>
              {history.map(record => (
                <tr key={record._id} className="border-b last:border-0">
                  <td className="py-1">{record.user?.phone} ({record.user?.email ?? 'Deleted user'})</td>
                  <td className="py-1">{new Date(record.createdAt).toLocaleString()}</td>
                  <td className="py-1">{record.generatedNumber}</td>
                  <td className="py-1">
                    {record.result === 1 ? 
                      <span className="text-green-600 font-semibold">Win</span> :
                      <span className="text-red-600 font-semibold">Loss</span>}
                  </td>
                  <td className="py-1">
                    {record.balanceChange > 0 ? `+${record.balanceChange}` : record.balanceChange}
                  </td>
                  <td className="py-1">{record.newBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
