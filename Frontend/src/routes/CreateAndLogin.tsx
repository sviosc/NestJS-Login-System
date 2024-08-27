import { useState } from "react";
import FormLogin from "../components/formLogin";
import FormRegister from "../components/formRegister";

export default function CreateAndLogin() {
  const [selectedFormType, setSelectedFormType] = useState("register");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFormType(e.target.value);
  };

  return (
    <div className="p-3 w-fit mx-auto space-y-4 bg-zinc-300 border-2 rounded-xl border-zinc-200">
      {selectedFormType == "register" ? <FormRegister /> : <FormLogin />}
      <div className="p-3 w-fit mx-auto space-y-4 rounded-xl">
        <label className="radioLabel rounded-xl">
          <input
            type="radio"
            name="choice"
            value="register"
            onChange={handleChange}
            className="radioInput"
          />
          Criar conta
        </label>
        <label className="radioLabel rounded-xl">
          <input
            type="radio"
            name="choice"
            value="login"
            onChange={handleChange}
            className="radioInput"
          />
          Entrar
        </label>
      </div>
    </div>
  );
}
