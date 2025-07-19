import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import Card from "../components/Card";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import api from "@/lib/api";

export default function GamePage() {
  const auth = useContext(AuthContext);
  const toastCtx = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const playGame = async () => {
    if (!auth?.user) {
      toastCtx?.addToast("You must be logged in to play the game", "error");
      return;
    };
    
    setLoading(true);
    try {
      const { data } = await api.post('/game/play') as any;
      auth.user.balance = data.newBalance;
      if (data.result === 1) {
        toastCtx?.addToast(`🎉 You won! Number ${data.generatedNumber} > 70. +50 points!`, 'success');
      } else {
        toastCtx?.addToast(`😞 You lost. Number ${data.generatedNumber} ≤ 70. -35 points.`, 'info');
      }
    } catch (err) {
      toastCtx?.addToast('Error playing the game. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-xl mx-auto py-8">
        <Card>
          <h1 className="text-2xl font-bold text-center mb-4">TrueNumber Game</h1>
          <p className="text-lg mb-6">🎫 Current Balance: <span className="font-semibold">{auth?.user?.balance}</span> points</p>
          <Button onClick={playGame} disabled={loading} className="w-full">
            {loading ? "Playing..." : "🎲 Generate Number"}
          </Button>
        </Card>
      </main>
    </div>
  );
}
