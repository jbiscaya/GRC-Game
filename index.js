import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Home() {
  const [games] = useState([
    { name: "Risk Quiz", description: "Test your risk management skills!" },
    { name: "Compliance Challenge", description: "Solve compliance dilemmas." },
    { name: "Governance Simulator", description: "Make strategic governance decisions." },
    { name: "Cybersecurity Trivia", description: "Answer cybersecurity-related questions!" },
  ]);

  const [user, setUser] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (user.trim()) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">GRC Games Hub</h1>
        <p className="text-gray-700">Play, Learn & Master Governance, Risk, and Compliance</p>
      </header>

      <div className="flex flex-col items-center mb-6 space-y-4">
        <Input 
          type="text" 
          placeholder="Enter your username" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
          className="w-64" 
        />
        <Button className="bg-blue-500 text-white w-64" onClick={handleLogin}>Login</Button>
        <div className="flex flex-col space-y-2 w-64">
          <Button className="bg-red-500 text-white" onClick={() => signIn("google")}>
            Sign in with Google
          </Button>
          <Button className="bg-blue-700 text-white" onClick={() => signIn("linkedin")}>
            Sign in with LinkedIn
          </Button>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {games.map((game, index) => (
          <Card key={index} className="p-4 shadow-lg rounded-2xl">
            <CardContent>
              <h2 className="text-xl font-semibold">{game.name}</h2>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <Button className="bg-blue-500 text-white">Play Now</Button>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}