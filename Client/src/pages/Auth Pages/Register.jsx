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

function Register({theme}) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { boolVal, setBoolVal } = useContext(BooleanContext);
  const api = import.meta.env.VITE_SERVER_URL;
  const { setUser, setAuthUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api}/auth/register`, data);
      const token = response.data.data;
      localStorage.setItem("token", token);

      setUser(token);
      setAuthUser((prev) => ({ ...prev, authUser: true }));
      setBoolVal((prev) => ({ ...prev, authCard: false }));
      alert("successfully registered");
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <Card
      className={`w-full max-w-md h-[60vh] flex flex-col justify-evenly ${theme ? "bg-white/40": "bg-black/40"}  ${boolVal.registerCard ? "visible" : "hidden"} text-white`}
    >
      <CardHeader>
         <CardTitle className={`${theme ?"text-black": "text-white"}`}>Register to your account</CardTitle>
        <CardDescription className={`${theme ?"text-black/90": "text-white/90"}`}>
          Enter your details below to Register to your account
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() =>
              setBoolVal((prev) => ({ ...prev, registerCard: false }))
            }
          >
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className={`${theme ?"text-black/90": "text-white/90"}`}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="john wick"
                     className={`${theme ?"border-black": "border-white"}`}
                value={data.username}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, username: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                     className={`${theme ?"border-black": "border-white"}`}
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
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
              Register
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Register;
