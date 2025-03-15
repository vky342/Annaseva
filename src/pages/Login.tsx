
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface LoginProps {
  onLogin: (type: "restaurant" | "ngo") => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [userType, setUserType] = useState<"restaurant" | "ngo" | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For now, we'll just simulate a successful login
    if (userType) {
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${userType === "restaurant" ? "Restaurant" : "NGO"} user!`,
      });
      
      // Call the onLogin prop to update the app's state
      onLogin(userType);
      
      navigate(`/dashboard/${userType}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue making a difference
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-white/80 backdrop-blur-sm shadow-xl border-0 dark:bg-gray-800/80">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-gray-900 dark:text-white">I am a</Label>
              <Select
                value={userType || ""}
                onValueChange={(value) =>
                  setUserType(value as "restaurant" | "ngo")
                }
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900 dark:text-white">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600 text-white"
              disabled={!userType}
            >
              Sign in
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
