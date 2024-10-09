import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { login, register } from "../api/authService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

function AuthPage() {
  const navigate = useNavigate();
  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);

  const registerEmailRef = useRef(null);
  const registerUserNameRef = useRef(null);
  const registerFullNameRef = useRef(null);
  const registerPasswordRef = useRef(null);

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const registerMutation = useMutation({
    mutationFn: register,
  });

  const loginState = useUserStore((state) => state.login);

  const handleLogin = async () => {
    const loginPromise = loginMutation.mutateAsync({
      email: loginEmailRef.current?.value,
      password: loginPasswordRef.current?.value,
    });

    toast.promise(loginPromise, {
      loading: () => {
        return "Logging in...";
      },
      success: (data) => {
        navigate("/home");
        console.log("loginData", data);
        const { userName, isAdmin, accessToken, refreshToken } = data.data.data;
        loginState(userName, isAdmin, accessToken, refreshToken);
        return data.message || "Successfully logged in!";
      },
      error: (error) => {
        console.log(error);
        return error.response?.data?.message || error.message;
      },
    });
  };

  const handleRegister = async () => {
    const registerPromise = registerMutation.mutateAsync({
      userName: registerUserNameRef.current?.value,
      fullName: registerFullNameRef.current?.value,
      email: registerEmailRef.current?.value,
      password: registerPasswordRef.current?.value,
    });

    toast.promise(registerPromise, {
      loading: "Registering user...",
      success: (data) => {
        navigate("/home");
        console.log("registerData", data);
        const { userName, isAdmin, accessToken, refreshToken } = data.data.data;
        loginState(userName, isAdmin, accessToken, refreshToken);
        return data.message || "Successfully registered!";
      },
      error: (error) => {
        console.log(error);
        return error.response?.data?.message || error.message;
      },
    });
  };
  return (
    <div className="flex items-center justify-between w-full h-lvh bg-teal-600 px-20">
      <Toaster />
      <div className="flex flex-col justify-center h-full">
        <div className="flex justify-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            MED - VAULT
          </h1>
        </div>

        <blockquote className="mt-4 pl-6 italic">
          Where convenience meets care—manage your medicine records with ease
          and confidence.
        </blockquote>
      </div>

      <div className="flex flex-col items-end">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create a new account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    ref={registerFullNameRef}
                    id="fullName"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="userName">Username</Label>
                  <Input
                    ref={registerUserNameRef}
                    id="userName"
                    placeholder="Enter your user name"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    ref={registerEmailRef}
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    ref={registerPasswordRef}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleRegister}
                  disabled={registerMutation.isPending}
                >
                  Register
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter valid credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input ref={loginEmailRef} id="email" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input ref={loginPasswordRef} id="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleLogin}
                  disabled={loginMutation.isPending}
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
