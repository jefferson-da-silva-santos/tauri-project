import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import ongoldClient1 from "../../assets/image/ongold-cli.png";
import ongoldClient2 from "../../assets/image/ongold-cli2.png";
import PrimeReactCalendar from "../../components/PrimeReactCalendar";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { formatDataRegister } from "../../utils/formatt/formatDataRegister";
import { shemaRegister } from "../../utils/validate/shemaRegister";
import { ProgressSpinner } from "primereact/progressspinner";
import useNoty from "../../hooks/useNoty";
import { requestRegister } from "../../api/apiRequests";

const Register = () => {
  const noty = useNoty();
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
  const initialValues = {
    nome: "",
    email: "",
    password: "",
    telefone: "",
    cpf: "",
    dataNascimento: null, 
  };
  const validationSchema = shemaRegister;
  const {
    loading: registerLoading,
    requestAPI: registerRequestAPI,
  } = useApi("/Auth/register", "POST");
  const handleSubmit = (values) => {
    const data = formatDataRegister(values);
    requestRegister(data, navigate, noty, registerRequestAPI);
  };

  return (
    <div className="container-register">
      <header className="header-register">
        <h1 className="header-register__title">ERP Ongold</h1>
        <button
          className="header-register__button"
          onClick={() => navigate("/login")}
        >
          Já tenho conta
        </button>
      </header>
      <main className="main-register">
        <section className="main-register--primary">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="main-register--primary__form" method="post">
              <h2 className="main-register--primary__form--title">
                Abra sua conta
              </h2>
              <p className="main-register--primary__form--text">
                Informe seu e-mail e defina uma senha para começar a abertura da
                sua conta.
              </p>
              <div className="group">
                <label htmlFor="nome">Nome</label>
                <Field type="text" id="nome" name="nome" />
                <ErrorMessage name="nome" component="div" className="error" />
              </div>

              <div className="group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="group">
                <label htmlFor="password">Senha</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="group">
                <label htmlFor="telefone">Telefone</label>
                <Field type="text" id="telefone" name="telefone" />
                <ErrorMessage
                  name="telefone"
                  component="div"
                  className="error"
                />
              </div>

              <div className="group">
                <label htmlFor="cpf">CPF</label>
                <Field type="text" id="cpf" name="cpf" />
                <ErrorMessage name="cpf" component="div" className="error" />
              </div>

              <PrimeReactCalendar
                label="Data de Nascimento"
                id="data-nascimento"
                name="dataNascimento"
              />

              <button
                className="main-register--primary__form--button"
                type="submit"
                disabled={registerLoading}
              >
                {registerLoading ? (
                  <ProgressSpinner
                    style={{ width: "20px", height: "20px", color: "#fff" }}
                  />
                ) : (
                  "Cadastrar"
                )}
              </button>
            </Form>
          </Formik>
        </section>
        <section className="main-register--secondary">
          <h2 className="main-register--secondary__title">
            Cadastre-se em menos de 5 minutos!
          </h2>
          <p className="main-register--secondary__text">
            Abra sua conta e tenha a tranquilidade de contar com uma solução
            completa e segura para emissão de cobranças e serviços financeiros.
            Protegemos seus dados e transações com a mais alta tecnologia,
            garantindo a segurança do seu patrimônio.
          </p>
          <div className="main-register--secondary__images">
            <img
              className="main-register--secondary__images--img-1"
              src={ongoldClient1}
              alt=""
            />
            <img
              className="main-register--secondary__images--img-2"
              src={ongoldClient2}
              alt=""
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
