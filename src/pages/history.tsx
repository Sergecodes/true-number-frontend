import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import api from "@/lib/api";

interface GameRecord {
  _id: string;
  createdAt: string;
  generatedNumber: number;
  result: 1 | 0;
  balanceChange: number;
  newBalance: number;
}

export default function HistoryPage() {
  const auth = useContext(AuthContext);
  const [history, setHistory] = useState<GameRecord[]>([]);

  useEffect(() => {
    /** Fetch personal game history */
    async function fetchHistory() {
      try {
        const { data } = await api.get('/history') as any;
        setHistory(data);
      } catch (err) {
        console.error('Failed to load history', err);
      }
    }

    if (!auth?.token) return;
    fetchHistory();
  }, [auth?.token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-2xl mx-auto py-8">
        <Card>
          <h1 className="text-2xl font-bold mb-4 text-center">My Game History</h1>
          <table className="w-full text-left">
            <thead className="border-b-2">
              <tr>
                <th className="pb-2">Date</th>
                <th className="pb-2">Number</th>
                <th className="pb-2">Result</th>
                <th className="pb-2">Change</th>
                <th className="pb-2">Balance After</th>
              </tr>
            </thead>
            <tbody>
              {history.map(record => (
                <tr key={record._id} className="border-b last:border-0">
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
              {history.length === 0 && (
                <tr><td colSpan={5} className="py-2 text-center text-gray-500">No games played yet.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
