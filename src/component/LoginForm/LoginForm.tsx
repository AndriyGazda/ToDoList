import { Button, Input } from "@/ui";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  onLogin: () => void;
}
type FormData = {
  username: string;
  password: string;
};

const LoginForm = ({onLogin}: LoginFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

const onSubmit = (data: FormData) => {
  console.log("Form submitted",data);
  onLogin();
}

  return (
    <div className={"loginWrapper"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <Input type="text" id="username" {...register("username")} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input type="password" id="password" {...register("password")} required />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
