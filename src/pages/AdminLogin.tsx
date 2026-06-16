import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/New Greenway Trust Logo.jpg";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminLogin = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    setIsLoading(true);
    const res = await api.post(`${API_BASE}/admins/login`, loginForm);

    // Store token & profile immediately
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("adminEmail", res.data.profile.email);
    localStorage.setItem("adminProfile", JSON.stringify(res.data.profile)); // store full profile

    toast.success("Login successful");
    navigate("/admin/home"); // navigate immediately
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="GreenWay Trust" className="h-16 w-16" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">GreenWay Trust</h1>
          <p className="text-muted-foreground mt-2">Admin Dashboard Login</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email ID"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={isLoading || !loginForm.email || !loginForm.password}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;