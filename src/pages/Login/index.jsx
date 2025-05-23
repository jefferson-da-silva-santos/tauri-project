import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ongoldClient3 from '../../assets/image/ongold-cli3.png';
import useApi from '../../hooks/useApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate} from 'react-router-dom';
import { shemaLogin } from '../../utils/validate/shemaLogin';
import useNoty from '../../hooks/useNoty';


const Login = () => {
  const noty = useNoty();
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = React.useState(false);
  useEffect(() => {
    if (localStorage.getItem('@Auth:user')) {
      setSignedIn(true);
    }
  });

  if (signedIn) {
    navigate('/home');
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = shemaLogin;

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
    requestAPI: loginRequestAPI,
  } = useApi("/Auth/login", "POST");

  const requestLogin = async (values) => {
    try {
      const response = await loginRequestAPI(values);
      console.log(loginData);

      if (response.token) {
        localStorage.setItem('@Auth:token', response.token);
        localStorage.setItem('@Auth:user', JSON.stringify(response.user));
        localStorage.setItem('@Auth:roles', JSON.stringify(response.roles));
        localStorage.setItem('@Auth:TokenExpiration', new Date().getTime() + 60 * 60 * 1000);
        noty.success('Login realizado com sucesso');
        navigate('/home');
      }

      
    } catch (error) {
      if (error && error.status >= 400 && error.status < 500) {
        noty.error('E-mail ou senha inválidos');
        return;
      }

      if (error && error.status >= 500 && error.status < 600) {
        noty.error('Houve um erro inesperado, tente novamente mais tarde');
        return;
      }
    }
  };

  const handleSubmit = (values) => {
    requestLogin(values);
  };

  return (
    <div className="container-login">
      <header className="header-login">
        <h1 className="header-login__title">ERP Ongold</h1>
        <button className="header-login__button" onClick={() => navigate("/register")}>Ainda não tenho conta</button>
      </header>
      <main className="main-login">
        <section className="main-login--primary">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => ( 
              <Form className="main-login--primary__form" method="post">
                <h2 className="main-login--primary__form--title">
                  Faça login
                </h2>
                <p className="main-login--primary__form--text">
                  Informe seu e-mail e defina uma senha para entrar no seu painel
                </p>

                <div className="group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error" /> 
                </div>

                <div className="group">
                  <label htmlFor="password">Senha</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="error" /> 
                </div>

                <button
                  className="main-login--primary__form--button"
                  disabled={loginLoading}
                  type="submit"
                >
                  {loginLoading ? (
                     <ProgressSpinner style={{width: '20px', height: '20px', color: '#fff'}}/>
                  ) : (
                    "Entrar"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </section>
        <section className="main-login--secondary">
          <div>
            <h2 className="main-login--secondary__title">
              Continue sua experiencia agora mesmo!
            </h2>
            <p className="main-login--secondary__text">
              Abra sua conta e tenha a tranquilidade de contar com uma solucao
              completa e segura para emissao de cobrancas e servicos
              financeiros. Protegemos seus dados e transacoes com a mais alta
              tecnologia, garantindo a seguranca do seu patrimonio.
            </p>
          </div>
          <div className="main-login--secondary__images">
            <img
              className="main-login--secondary__images--img-1"
              src={ongoldClient3}
              alt=""
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;