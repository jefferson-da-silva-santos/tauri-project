import React, { useContext, useEffect, useState } from "react";
import rosto from "../../assets/image/rosto.png";
import itemImg from "../../assets/image/item.png";
import circulo from "../../assets/image/circulo.png";
import bannerGraph from "../../assets/image/banner-graph.png";
import useApi from "../../hooks/useApi";
import { NavLink, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import ProductCard from "../../components/ProductCard";
import NotyContext from "../../context/NotyContext";

const planosEstilos = {
  ouro: {
    backgroundColor: "#f8edba",
    color: "#ffcc00",
  },
  prata: {
    backgroundColor: "#d9d9d9",
    color: "#808080",
  },
  bronze: {
    backgroundColor: "#a78151",
    color: "#613e0f",
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const noty = useContext(NotyContext);

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
    error: errorItems,
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
  }

  return (
    <div className="container-home">
      <nav className="nav-home">
        <ul className="nav-home__list">
          <NavLink to="/">
            <li id="house" className="nav-home__list__item">
              <i className="bx bxs-home"></i>
            </li>
          </NavLink>
          <NavLink to="/registerItem">
            <li className="nav-home__list__item">
              <i className="bx bx-add-to-queue"></i>
            </li>
          </NavLink>
          <NavLink to="/editItem">
            <li className="nav-home__list__item">
              <i className="bx bxs-edit-alt"></i>
            </li>
          </NavLink>
          <li className="nav-home__list__item">
            <i className="bx bxs-report"></i>
          </li>
          <a onClick={e => {
            e.preventDefault();
            logout();
          }}>
            <li className="nav-home__list__item">
              <i className="bx bx-exit bx-rotate-180"></i>
            </li>
          </a>
        </ul>
      </nav>

      <header className="header-home">
        <h1 className="header-home__title">
          Bem Vindo, <span>{dataUser.userName}!</span>
        </h1>
        <div className="header-home__group">
          <button className="header-home__button">
            <i className="bx bx-cart-alt" style={{ color: "#333333" }}></i>
          </button>
          <div className="header-home__user">
            <img className="header-home__img" src={rosto} alt="" />
            <span className="header-home__name">{dataUser.userName}</span>
          </div>
        </div>
      </header>

      <main className="main-home">
        <section className="main-home--products">
          <h2 className="main-home--products__title">Produtos</h2>
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
              dataItems.map((item) => (
                <ProductCard
                  key={item.id}
                  itemImg={itemImg}
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

        <section className="main-home--graph">
          <img className="main-home--graph__img-1" src={circulo} />
          <img className="main-home--graph__img-2" src={bannerGraph} />
        </section>
        <section
          className="main-home--flat"
          style={
            plano === "Ouro"
              ? planosEstilos.ouro
              : plano === "Prata"
              ? planosEstilos.prata
              : planosEstilos.bronze
          }
          
        >
          <p className="main-home--flat__text">
            Você é {plano ? plano : "Desconhecido"}!
          </p>
        </section>
        <section className="main-home--total">
          <p className="main-home--total__text">
            Total de itens: {dataItems ? dataItems.length : 0} itens
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
