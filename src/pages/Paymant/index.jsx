import React, { useContext, useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import NotyContext from "../../context/NotyContext";

const Paymant = () => {
  const [plano, setPlano] = useState("");
  const noty = useContext(NotyContext);
  const navigate = useContext(Navigator);

  const {
    data: dataPayment,
    error: errorPayment,
    loading: loadingPayment,
    requestAPI: requestAPIPayment,
  } = useApi(
    `/Pay/confirm-payment-plan?Id=${localStorage.getItem(
      "@Auth:idUser"
    )}&level=${plano}`,
    "POST"
  );

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
    requestAPI: loginRequestAPI,
  } = useApi("/Auth/login", "POST");

  const handleClick = async () => {
    try {
      const response = await requestAPIPayment();
      if (!response) {
        noty.error("Erro ao efetuar pagamento!");
        return;
      }
      const responseLogin = await loginRequestAPI({
        email: localStorage.getItem("@Auth:email"),
        password: localStorage.getItem("@Auth:password"),
      });
      if (!responseLogin) {
        noty.error("Erro ao efetuar login do usuário!");
        return;
      }
      // Removendo os dados do localStorage
      localStorage.removeItem('@Auth:idUser');
      localStorage.removeItem('@Auth:email');
      localStorage.removeItem('@Auth:password');
      localStorage.removeItem('@Auth:tokenEmailConfirm');
      // Adicionando novos dados retornados pelo login ao localStorage
      localStorage.setItem("@Auth:token", responseLogin.token);
      localStorage.setItem("@Auth:user", JSON.stringify(responseLogin.user));
      localStorage.setItem("@Auth:roles", JSON.stringify(responseLogin.roles));
      localStorage.setItem(
        "@Auth:TokenExpiration",
        new Date().getTime() + 60 * 60 * 1000
      );

      navigate('/');
    } catch (error) {}
  };

  return (
    <div className="container-payment">
      <header className="header-payment">
        <h1 className="header-payment__title">Esculha o seu plano</h1>
      </header>
      <main className="main-payment">
        <article className="main-payment__flat bronze">
          <h3 className="main-payment__flat__title">Plano Bronze</h3>
          <ul className="main-payment__flat__list">
            <li className="main-payment__flat__list__item">
              Gestão de Estoque
            </li>
            <li className="main-payment__flat__list__item">
              Cadastro de Itens
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Simples
            </li>
            <li className="main-payment__flat__list__item">
              Suporte por E-mail
            </li>
            <li className="main-payment__flat__list__item">
              Acesso para 1 Usuário
            </li>
          </ul>
          <button
            onClick={() => {
              setPlano("Bronze");
              handleClick();
            }}
            className="main-payment__flat__button btn1"
          >
            Efetuar Pagamento
          </button>
        </article>

        <article className="main-payment__flat prata">
          <h3 className="main-payment__flat__title">Plano Prata</h3>
          <ul className="main-payment__flat__list">
            <li className="main-payment__flat__list__item">
              Todos os benef. do Bronze.
            </li>
            <li className="main-payment__flat__list__item">
              Gestão de Múltiplos Estoque{" "}
            </li>
            <li className="main-payment__flat__list__item">
              Alertas de Estoque Mínimo
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
          </ul>
          <button
            onClick={() => {
              setPlano("Prata");
              handleClick();
            }}
            className="main-payment__flat__button btn2"
          >
            Efetuar Pagamento
          </button>
        </article>

        <article className="main-payment__flat">
          <h3 className="main-payment__flat__title">Plano Gold</h3>
          <ul className="main-payment__flat__list">
            <li className="main-payment__flat__list__item">
              Todos os benef. do Bronze.
            </li>
            <li className="main-payment__flat__list__item">
              Gestão de Múltiplos Estoque{" "}
            </li>
            <li className="main-payment__flat__list__item">
              Alertas de Estoque Mínimo
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
          </ul>
          <button
            onClick={() => {
              setPlano("Ouro");
              handleClick();
            }}
            className="main-payment__flat__button btn3"
          >
            Efetuar Pagamento
          </button>
        </article>
      </main>
    </div>
  );
};

export default Paymant;
