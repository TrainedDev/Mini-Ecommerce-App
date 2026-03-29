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
import { BooleanContext } from "@/State Management/Contexts/NewContexts";
import axios from "axios";
import { useContext, useState } from "react";

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { boolVal, setBoolVal } = useContext(BooleanContext);
  const api = import.meta.env.VITE_SERVER_URL;
  const handleSubmit = async () => {
    const response = await axios.post(`${api}/auth/register`, data);
    localStorage.setItem("token", response.data);
  };
  return (
    <Card
      className={`w-full max-w-md h-[60vh] flex flex-col justify-evenly bg-black/15 ${boolVal.registerCard ? "visible" : "hidden"}`}
    >
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>
          Enter your email below to Register to your account
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
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="john wick"
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
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, username: e.target.value }))
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
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Register
        </Button>
        {/* <Button variant="outline" className="w-full cursor-pointer">
          Signup
        </Button> */}
      </CardFooter>
    </Card>
  );
}

export default Register;
