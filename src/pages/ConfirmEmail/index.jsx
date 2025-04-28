import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

  const userId = localStorage.getItem("@Auth:idUser");
  const token = localStorage.getItem("@Confirm:tokenEmailConfirm");
  const encodedToken = encodeURIComponent(token);

  const {
    data: confirmEmailData,
    error: confirmEmailError,
    loading: confirmEmailLoading,
    requestAPI: requestConfirmEmail, 
  } = useApi(`/Auth/confirm-email?userId=${userId}&token=${encodedToken}`);

  const handleSubmit = async (values) => {
    const email = values.email + "@gmail.com";
    try {
      const response = await requestConfirmEmail();

      if (confirmEmailError) {
        noty.error("Houve um erro ao confirmar o e-mail.");
        return;
      }

      if (email !== localStorage.getItem("@Auth:email")) {
        noty.error("Houve um erro ao confirmar o e-mail.");
        return;
      }

      if (String(response) === "E-mail confirmado com sucesso.") {
        noty.success(String(response));
        navigate("/payment");
        return;
      }

      noty.error("Houve um erro ao confirmar o e-mail.");

    } catch (error) {
      if (error && error.status === 400) {
        noty.error("Houve um erro ao confirmar o e-mail.");
      }
      if (error && error.status === 500) {
        noty.error("Houve um erro inesperado, tente novamente mais tarde");
      }
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

                <div
                  className="group"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1rem 1rem",
                  }}
                >
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
                  <ErrorMessage
                    name="email"
                    style={{ bottom: "-9px" }}
                    component="div"
                    className="error"
                  />
                </div>

                <button
                  className="main-login--primary__form--button"
                  type="submit"
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {confirmEmailLoading ? (
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
