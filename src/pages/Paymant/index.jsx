import React, { useContext } from "react";
import useApi from "../../hooks/useApi";
import NotyContext from "../../context/NotyContext";
import { useNavigate } from "react-router-dom";

const Paymant = () => {
  const noty = useContext(NotyContext);
  const navigate = useNavigate();

  const { loading: loadingPayment, requestAPI: requestAPIPayment } = useApi(
    null,
    "POST"
  );

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
      noty.success("Pagamento efetuado com sucesso!");
      navigate("/");
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
