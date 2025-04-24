import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ongoldClient3 from "../../assets/image/ongold-cli3.png";
import useApi from "../../hooks/useApi";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import NotyContext from "../../context/NotyContext";
import * as Yup from "yup";

const LoginEmail = () => {
  const navigate = useNavigate();
  const noty = useContext(NotyContext);

  const initialValues = {
    email: "",
  };

  const shemaEmailConfim = Yup.object().shape({
    email: Yup.string().required("O email é obrigatório"),
  });

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
    requestAPI, // Renomeei para ficar mais genérico
  } = useApi(
    `/Auth/confirm-email` // Apenas o caminho base
  );

  const handleSubmit = async (values) => {
    const emailFormat = values.email + "@gmail.com";
    const userId = localStorage.getItem("@Auth:idUser");
    const token = localStorage.getItem("@Confirm:tokenEmailConfirm");

    if (userId && token) {
      const fullEndpoint = `/Auth/confirm-email?userId=${userId}&token=${token}`;
      try {
        const response = await requestAPI(fullEndpoint); // Passe a URL completa aqui
        console.log(response);
        // Lógica de sucesso aqui (ex: navigate para outra página, mostrar notificação)
      } catch (error) {
        console.log(error);
        // Lógica de erro aqui (ex: mostrar notificação de erro)
      }
    } else {
      console.error("UserId ou Token não encontrados no localStorage.");
      // Lidar com o caso em que userId ou token não estão disponíveis
      noty.show({ severity: 'error', summary: 'Erro', detail: 'UserId ou Token não encontrados.', life: 3000 });
    }
  };

  return (
    <div className="container-login">
      <header
        className="header-login"
        style={{
          justifyContent: "center",
        }}
      >
        <h1 className="header-login__title">ERP Ongold</h1>
      </header>
      <main
        className="main-login"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section className="main-login--primary">
          <Formik
            initialValues={initialValues}
            validationSchema={shemaEmailConfim}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="main-login--primary__form" method="post">
                <h2 className="main-login--primary__form--title">
                  Confirme seu email para continuar
                </h2>
                <p className="main-login--primary__form--text">
                  A verificação de email é importante pois garante que algo
                  realmente aconteça
                </p>

                <div className="group" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1rem 1rem'
                }}>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className="main-login--primary__form--input"
                      style={{
                        backgroundColor: "#DDDDDD",
                        height: "30px",
                        width: "180px",
                        borderRadius: "3px",
                        marginRight: "0px",
                        fontSize: "1.3rem",
                        transition: "all 0.5s ease",
                        marginBottom: "0",
                      }}
                    />
                    <span
                      className="text-email"
                      style={{
                        color: "#0042FF",
                        fontSize: "1.3rem",
                        textDecoration: "underline",
                        fontWeight: "600",
                      }}
                    >
                      @gmail.com
                    </span>
                  <ErrorMessage name="email" style={{ bottom: "-9px" }} component="div" className="error"/>
                </div>

                <button
                  className="main-login--primary__form--button"
                  type="submit"
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {loginLoading ? (
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px", color: "#fff" }}
                    />
                  ) : (
                    "Verificar"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </div>
  );
};

export default LoginEmail;
