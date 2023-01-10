import React from "react";
import { useNavigate } from "react-router-dom";
import { loginPage } from "../../router/coordinator";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>ErrorPage</h1>
      <button onClick={() => loginPage(navigate)}> Voltar a Home </button>
    </div>
  );
}

export default ErrorPage;