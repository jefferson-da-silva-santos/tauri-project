import React, { useEffect, useState } from "react";
import rosto from "../../assets/image/rosto.png";
import itemImg from "../../assets/image/item.png";
import itemImg2 from "../../assets/image/itemLight.png";
import circulo from "../../assets/image/circulo.png";
import bannerGraph from "../../assets/image/banner-graph.png";
import useApi from "../../hooks/useApi";
import { NavLink, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import ProductCard from "../../components/ProductCard";
import useReport from "../../hooks/useReport";
import useNoty from "../../hooks/useNoty";
import { InputSwitch } from "primereact/inputswitch";
import { useTheme } from "../../hooks/useTheme";
import { temaEstilos } from "../../utils/styles/themeStyles";
import useCart from "../../hooks/useCart";

const planosEstilos = {
  ouro: {
    escuro: {
      backgroundColor: "#ffcc00",
      color: "#8f7200",
    },
    claro: {
      backgroundColor: "#f8edba",
      color: "#ffcc00",
    },
  },
  prata: {
    escuro: {
      backgroundColor: "#808080",
      color: "#3f3f3f",
    },
    claro: {
      backgroundColor: "#d9d9d9",
      color: "#808080",
    },
  },
  bronze: {
    escuro: {
      backgroundColor: "#613e0f",
      color: "#41290a",
    },
    claro: {
      backgroundColor: "#a78151",
      color: "#613e0f",
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const noty = useNoty();
  const { darkMode, setDarkMode } = useTheme();
  const tema = darkMode ? temaEstilos.escuro : temaEstilos.claro;
  const {cart} = useCart();

  const { loading: loadingReport, requestReport } = useReport();

  if (!signedIn) {
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("@Auth:user")) {
      setSignedIn(true);
    }
  }, []);

  const [plano, setPlano] = useState("");
  const [dataUser, setDataUser] = useState({});
  const {
    data: dataItems,
    loading: loadingItems,
    requestAPI: requestAPIItems,
  } = useApi("/Products/GetAll");

  useEffect(() => {
    requestAPIItems();
    const roles = JSON.parse(localStorage.getItem("@Auth:roles")) ?? [];
    setPlano(roles[0]);
    setDataUser(JSON.parse(localStorage.getItem("@Auth:user")));
  }, []);

  const logout = async () => {
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("@Auth:roles");
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:TokenExpiration");
    noty.success("Sua sessão expirou!");
    navigate("/login");
    setSignedIn(false);
  };

  const planoAtualEstilos = plano
    ? planosEstilos[plano.toLowerCase()]?.[darkMode ? "escuro" : "claro"]
    : {};

  return (
    <div
      className="container-home"
      style={{ backgroundColor: tema.backgroundColorPrimaria }}
    >
      <nav
        className="nav-home"
        style={{
          backgroundColor: tema.backgroundColorSecundaria,
          boxShadow: tema.boxShadow,
        }}
      >
        <ul className="nav-home__list">
          <NavLink to="/">
            <li
              id="house"
              className="nav-home__list__item"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
            >
              <i style={{ color: tema.textColor }} className="bx bxs-home"></i>
            </li>
          </NavLink>
          <NavLink to="/registerItem">
            <li
              className="nav-home__list__item"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
            >
              <i
                style={{ color: tema.textColor }}
                className="bx bx-add-to-queue"
              ></i>
            </li>
          </NavLink>
          <NavLink to="/editItem">
            <li
              className="nav-home__list__item"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
            >
              <i
                style={{ color: tema.textColor }}
                className="bx bxs-edit-alt"
              ></i>
            </li>
          </NavLink>
          <li
            onClick={requestReport}
            className="nav-home__list__item"
            onMouseEnter={(e) =>
              e.currentTarget.classList.add(
                darkMode
                  ? "nav-home__list__item--hover-escuro"
                  : "nav-home__list__item--hover-claro"
              )
            }
            onMouseLeave={(e) =>
              e.currentTarget.classList.remove(
                darkMode
                  ? "nav-home__list__item--hover-escuro"
                  : "nav-home__list__item--hover-claro"
              )
            }
          >
            {loadingReport ? (
              <ProgressSpinner
                style={{
                  width: "50px",
                  height: "50px",
                  color: "#fff",
                  margin: "auto",
                }}
              />
            ) : (
              <i style={{ color: tema.textColor }} className="bx bxs-report"></i>
            )}
          </li>
          <a
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <li
              className="nav-home__list__item"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove(
                  darkMode
                    ? "nav-home__list__item--hover-escuro"
                    : "nav-home__list__item--hover-claro"
                )
              }
            >
              <i
                style={{ color: tema.textColor }}
                className="bx bx-exit bx-rotate-180"
              ></i>
            </li>
          </a>
        </ul>
      </nav>

      <header className="header-home">
        <h1 style={{ color: tema.textColor }} className="header-home__title">
          Bem Vindo, <span>{dataUser.userName}!</span>
        </h1>
        <div className="header-home__group">
          <InputSwitch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.value)}
          />
          <button
            style={{
              backgroundColor: tema.backgroundColorSecundaria,
              boxShadow: tema.boxShadow,
            }}
            className="header-home__button"
          >
            <i style={{ color: tema.textColor }} className="bx bx-cart-alt"></i>
            <div className="quantity">{cart.length}</div>
          </button>
          <div
            style={{
              backgroundColor: tema.backgroundColorSecundaria,
              boxShadow: tema.boxShadow,
            }}
            className="header-home__user"
          >
            <img className="header-home__img" src={rosto} alt="" />
            <span
              style={{ color: tema.textColor }}
              className="header-home__name"
            >
              {dataUser.userName}
            </span>
          </div>
        </div>
      </header>

      <main className="main-home">
        <section
          style={{
            backgroundColor: tema.backgroundColorSecundaria,
            boxShadow: tema.boxShadow,
          }}
          className="main-home--products"
        >
          <h2
            style={{ color: tema.textColor }}
            className="main-home--products__title"
          >
            Produtos
          </h2>
          <div className="main-home--products__list">
            {loadingItems ? (
              <ProgressSpinner
                style={{
                  width: "50px",
                  height: "50px",
                  color: "#fff",
                  margin: "auto",
                }}
              />
            ) : dataItems ? (
              dataItems
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <ProductCard
                    key={index}
                    products={dataItems}
                    itemId={item.id}
                    index={index}
                    itemImg={itemImg}
                    itemImg2={itemImg2}
                    itemTitle={item.name}
                    itemDesc={item.description}
                    itemCategory={item.category}
                    itemPrice={item.price}
                  />
                ))
            ) : (
              <div className="main-home--products__list__item--empty">
                <span className="main-home--products__list__item--empty__text">
                  Sem produtos cadastrados
                </span>
              </div>
            )}
          </div>
        </section>

        <section
          className="main-home--graph"
          style={{
            backgroundColor: tema.backgroundColorSecundaria,
            boxShadow: tema.boxShadow,
          }}
        >
          <img className="main-home--graph__img-1" src={circulo} alt="" />
          <img className="main-home--graph__img-2" src={bannerGraph} alt="" />
        </section>
        <section
          className="main-home--flat"
          style={{
            backgroundColor: planoAtualEstilos?.backgroundColor,
            boxShadow: tema.boxShadow,
          }}
        >
          <p
            className="main-home--flat__text"
            style={{ color: planoAtualEstilos?.color }}
          >
            Você é {plano ? plano : "Desconhecido"}!
          </p>
        </section>
        <section
          style={{
            backgroundColor: darkMode
              ? tema.backgroundColorSecundaria
              : "#c0e7ff",
            boxShadow: tema.boxShadow,
          }}
          className="main-home--total"
        >
          <p
            style={{ color: darkMode ? tema.textColor : "#63c3ff" }}
            className="main-home--total__text"
          >
            Total de itens: {dataItems ? dataItems.length : 0} itens
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;