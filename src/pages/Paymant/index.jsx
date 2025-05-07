import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { ProgressSpinner } from "primereact/progressspinner";
import DownloadTicketButton from "../../components/DownloadTicketButton";
import useNoty from "../../hooks/useNoty";
import { useNavigate } from "react-router-dom";


const Paymant = () => {
  const noty = useNoty();
  const [isPaymentFinished, setIsPaymentFinished] = useState(false);
  const [paymentButtonDisabled, setPaymentButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  const planos = [
    {
      nome: "Bronze",
      nivel: "Bronze",
      beneficios: [
        "Gestão de Estoque",
        "Cadastro de Itens",
        "Relatórios Simples",
        "Suporte por E-mail",
        "Acesso para 1 Usuário",
      ],
      classeBotao: "btn1",
    },
    {
      nome: "Prata",
      nivel: "Prata",
      beneficios: [
        "Todos os benefícios do Plano Bronze",
        "Gestão de Múltiplos Estoques",
        "Alertas de Estoque Mínimo",
        "Relatórios Personalizados",
        "Suporte prioritário",
        "Acesso para até 3 Usuários",
      ],
      classeBotao: "btn2",
    },
    {
      nome: "Gold",
      nivel: "Ouro",
      beneficios: [
        "Todos os benefícios do Plano Prata",
        "Análise preditiva de estoque",
        "Integração com outras plataformas",
        "Relatórios avançados e gráficos",
        "Suporte 24/7",
        "Acesso para usuários ilimitados",
      ],
      classeBotao: "btn3",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("@Auth:user")) {
      setSignedIn(true);
    }
  }, []);

  useEffect(() => {
    // Se o pagamento foi finalizado, desativa os botões
    if (isPaymentFinished) {
      setPaymentButtonDisabled(true);
    }
  }, [isPaymentFinished]);

  if (signedIn && !isPaymentFinished) {
    navigate("/home");
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

      noty.success(
        "Pagamento efetuado com sucesso! Seu boleto está disponivel para download."
      );
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
      {isPaymentFinished && <DownloadTicketButton redirect={true} route="/" />}
      <div
        className="loading-payment"
        style={{ display: loadingPayment ? "flex" : "none" }}
      >
        <ProgressSpinner
          style={{ width: "60px", height: "60px", color: "#fff" }}
        />
      </div>
      <header className="header-payment">
        <h1 className="header-payment__title">Escolha o seu plano</h1>
      </header>
      <main className="main-payment">
        {planos.map((plano) => (
          <article
            key={plano.nivel}
            className={`main-payment__flat ${plano.nivel.toLowerCase()}`}
          >
            <h3 className="main-payment__flat__title">{plano.nome}</h3>
            <ul className="main-payment__flat__list">
              {plano.beneficios.map((beneficio, index) => (
                <li
                  key={`${plano.nivel}-${index}`}
                  className="main-payment__flat__list__item"
                >
                  {beneficio}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                handleClick(plano.nivel);
              }}
              className={`main-payment__flat__button ${plano.classeBotao}`}
              disabled={paymentButtonDisabled}
            >
              Efetuar Pagamento
            </button>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Paymant;