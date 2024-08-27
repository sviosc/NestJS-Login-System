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
  nome: z
    .string()
    .min(3, { message: "Seu nome precisa ter no mínimo 3 letras." })
    .max(20, {
      message: "Seu nome de usuário não pode ter mais do que 20 letras",
    }),
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
  const { register, handleSubmit, reset } = useForm<registerCredentialsSchema>({
    resolver: zodResolver(registerCredentialsSchema),
  });

  function handleSubmitClick(data: registerCredentialsSchema) {
    api
      .post("/api/register", {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      })
      .then((response) => console.log(response));
    reset();
  }

  return (
    <>
      <h1 className="text-3xl font-bold mt-4 text-zinc-950 text-center">
        Crie sua conta
      </h1>

      <form
        onSubmit={handleSubmit(handleSubmitClick)}
        autoComplete="off"
        className="w-fit flex flex-col items-center"
      >
        <div className="wrapper m-2 px-4">
          <Label htmlFor="nome" className="ml-3 font-medium text-lg">
            Nome de usuário
          </Label>
          <Input
            id="nome"
            placeholder="Crie um nome de usuário"
            className="bg-white rounded-xl h-12 w-72 text-lg"
            {...register("nome")}
          />
        </div>

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
          className="mt-5 mb-5 bg-lime-700 hover:bg-lime-900 w-72"
        >
          Criar conta
        </Button>
      </form>
    </>
  );
}
