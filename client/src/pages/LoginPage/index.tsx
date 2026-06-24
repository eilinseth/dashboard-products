import AuthForm from "../../components/AuthForm";
import login from "../../api/login";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AuthFormData } from "../../types";
import {useNavigate} from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      toast.success("Login successful");
      navigate("/products");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Login failed");
    },
  });

  const onSubmit = (data: AuthFormData) => {
    mutation.mutateAsync(data);
  };

  return <AuthForm title="Login" status="login" onSubmit={onSubmit} />;
}

export default LoginPage;
