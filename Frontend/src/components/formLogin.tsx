import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { z } from "zod";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const registerCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Esse campo precisa ser preenchido." })
    .email({ message: "Endereço email inválido." }),
  senha: z.string().min(8, {
    message: "Sua senha precisa ter no mínimo 8 caracteres.",
  }),
});

type registerCredentialsSchema = z.infer<typeof registerCredentialsSchema>;

export default function Formulario() {
  const { register, handleSubmit } = useForm<registerCredentialsSchema>({
    resolver: zodResolver(registerCredentialsSchema),
  });

  function handleSubmitClick(data: registerCredentialsSchema) {
    api
      .post("/api/login", {
        email: data.email,
        senha: data.senha,
      })
      .then((response) => console.log(response));
  }

  return (
    <>
      <h1 className="text-3xl font-bold mt-4 text-zinc-950 text-center">
        Faça login
      </h1>

      <form
        onSubmit={handleSubmit(handleSubmitClick)}
        autoComplete="off"
        className="w-fit flex flex-col items-center"
      >
        <div className="wrapper m-2 px-4">
          <Label htmlFor="email" className="ml-3 font-medium text-lg">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Digite seu endereço email"
            className="bg-white rounded-xl h-12 w-72 text-lg"
            {...register("email")}
          />
        </div>

        <div className="wrapper m-2 px-4">
          <Label htmlFor="senha" className="ml-3 font-medium text-lg">
            Senha
          </Label>
          <Input
            id="senha"
            placeholder="Crie uma senha"
            className="bg-white rounded-xl h-12 w-72 text-lg"
            {...register("senha")}
            type="password"
          />
        </div>

        <Button
          type="submit"
          className="mt-5 mb-5 bg-zinc-600 hover:bg-zinc-800 w-72"
        >
          Entrar
        </Button>
      </form>
    </>
  );
}
