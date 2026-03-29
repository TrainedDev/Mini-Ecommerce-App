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

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { boolVal, setBoolVal } = useContext(BooleanContext);
  const { setUser } = useContext(UserContext);
  const api = import.meta.env.VITE_SERVER_URL;
  // console.log("i am here", data);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(`${api}/auth/login`, data);
      console.log(response.data, "triggred");

      const token = localStorage.setItem(
        "token",
        JSON.stringify(response.data),
      );
      setBoolVal((prev) => ({ ...prev, authCard: false }));
      setUser(token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card
      className={`w-full max-w-md h-[60vh] flex flex-col justify-evenly bg-black/15 ${boolVal.registerCard ? "hidden" : "visible"}`}
    >
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
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
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email-login"
                type="email"
                value={data.email}
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
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
