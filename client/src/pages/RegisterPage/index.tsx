import AuthForm from "../../components/AuthForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import register from "../../api/register";
import toast from "react-hot-toast";
import type { AuthFormData } from "../../types";

function RegisterPage() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      toast.success("Register successful");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Register failed");
    },
  });

  const onSubmit = (data: AuthFormData) => {
    mutation.mutateAsync(data);
  };

  return <AuthForm title="Register" status="register" onSubmit={onSubmit} />;
}
export default RegisterPage;
