import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BooleanContext,
  UserContext,
} from "@/State Management/Contexts/NewContexts";
import axios from "axios";
import { useContext, useState } from "react";

function Login({theme}) {
  const [data, setData] = useState({ email: "", password: "" });
  const { boolVal, setBoolVal } = useContext(BooleanContext);
  const { setUser, setAuthUser } = useContext(UserContext);
  const api = import.meta.env.VITE_SERVER_URL;
  

  const handleSubmit = async (e) => {
    try {
      
      e.preventDefault();

      const response = await axios.post(`${api}/auth/login`, data);

      const token = response.data.data;
      
       localStorage.setItem(
        "token", token,
      );
      
      setUser(token);
      setAuthUser(prev => ({ ...prev, authUser: true }))
      setBoolVal((prev) => ({ ...prev, authCard: false }));
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(boolVal.registerCard);
  
  return (
    <Card
      className={`w-full max-w-md h-[60vh] flex flex-col justify-evenly ${theme ? "bg-white/40": "bg-black/40"}  ${boolVal.registerCard ? "hidden" : "visible"} text-white`}
    >
      <CardHeader >
        <CardTitle className={`${theme ?"text-black": "text-white"}`}>Login to your account</CardTitle>
        <CardDescription className={`${theme ?"text-black/90": "text-white/90"}`}>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() =>
              setBoolVal((prev) => ({ ...prev, registerCard: true }))
            }
          >
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className={`${theme ?"text-black/90": "text-white/90"}`}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-10">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email-login"
                type="email"
                value={data.email}
                className={`${theme ?"border-black": "border-white"}`}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <p className=" underline cursor-pointer ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </p>
              </div>
              <Input
                id="password-login"
                type="password"
                className={`${theme ?"border-black": "border-white"}`}
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
          </div>
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
