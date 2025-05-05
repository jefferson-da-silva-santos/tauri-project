import React, {useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { ProgressSpinner } from "primereact/progressspinner";
import DownloadTicketButton from "../../components/DownloadTicketButton";
import useNoty from "../../hooks/useNoty";
import { useNavigate } from "react-router-dom";
const Paymant = () => {
  const noty = useNoty();
  const [isPaymentFinished, setIsPaymentFinished] = useState(false);
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('@Auth:user')) {
      setSignedIn(true);
    }
  });

  if (signedIn) {
    navigate('/home');
  }

  const { loading: loadingPayment, requestAPI: requestAPIPayment } = useApi(
    null,
    "POST"
  );

  const {
    data: dataLogin,
    loading: loadingLogin,
    requestAPI: requestAPILogin,
  } = useApi(null, "POST");

  const handleClick = async (selectedPlano) => {
    try {
      const url = `/Pay/confirm-payment-plan?Id=${localStorage.getItem(
        "@Auth:idUser"
      )}&level=${selectedPlano}`;

      const response = await requestAPIPayment(null, url);

      if (!response) {
        noty.error("Erro ao efetuar pagamento!");
        return;
      }

      const dataLogin = {
        email: localStorage.getItem("@Auth:email"),
        password: localStorage.getItem("@Auth:password"),
      };

      const responseLogin = await requestAPILogin(dataLogin, "/Auth/login");

      if (!responseLogin) {
        noty.error("Erro ao efetuar pagamento!");
        return;
      }

  
      // Removendo dados do localstorage
      localStorage.removeItem("@Auth:email");
      localStorage.removeItem("@Auth:idUser");
      localStorage.removeItem("@Auth:password");
      localStorage.removeItem("@Confirm:tokenEmailConfirm");
      // Adicionando dados do localstorage
      localStorage.setItem("@Auth:token", responseLogin.token);
      localStorage.setItem("@Auth:user", JSON.stringify(responseLogin.user));
      localStorage.setItem("@Auth:roles", JSON.stringify(responseLogin.roles));
      localStorage.setItem(
        "@Auth:TokenExpiration",
        new Date().getTime() + 60 * 60 * 1000
      );

      noty.success("Pagamento efetuado com sucesso! Seu boleto está disponivel para download.");
      setIsPaymentFinished(true);
      // navigate("/");

    } catch (error) {
      // Tratamento de erros
      if (error && (error.status === 400 || error.status === 404)) {
        noty.error("Houve um erro ao efetuar o pagamento.");
      }
      if (error && error.status === 500) {
        noty.error("Houve um erro inesperado, tente novamente mais tarde");
      }
    }
  };

  return (
    <div className="container-payment">
      {isPaymentFinished && (
        <DownloadTicketButton redirect={true} route="/"/>
      )}
      <div
        className="loading-payment"
        style={{ display: loadingPayment ? "flex" : "none" }}
      >
        <ProgressSpinner
          style={{ width: "60px", height: "60px", color: "#fff" }}
        />
      </div>
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
              handleClick("Bronze");
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
              handleClick("Prata");
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
            <li className="main-payment__flat__list__item">
              Relatórios Personalizados
            </li>
          </ul>
          <button
            onClick={() => {
              handleClick("Ouro");
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
