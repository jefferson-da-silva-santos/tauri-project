import React, { useEffect, useState } from "react";
import { formatarParaBRL } from "../../utils/formatt/formatCurrencyBR";
import useNoty from "../../hooks/useNoty";
import { useTheme } from "../../hooks/useTheme";
import { temaEstilos } from "../../utils/styles/themeStyles";
import useCart from "../../hooks/useCart";

const ProductCard = ({
  products,
  itemId,
  index,
  itemImg,
  itemImg2,
  itemTitle,
  itemDesc,
  itemCategory,
  itemPrice,
}) => {
  const [isCopy, setIsCopy] = useState(false);
  const noty = useNoty();
  const { darkMode, setDarkMode } = useTheme();
  const {cart, setCart} = useCart();
  const tema = darkMode ? temaEstilos.escuro : temaEstilos.claro;

  if (!itemImg) {
    itemImg = itemImg2;
  }

  const [quantProducts, setQuantProducts] = useState(
    new Array(products.length).fill(0)
  );
  
  const acrescntProduct = (id) => {
    const newQuantProducts = [...quantProducts];
    newQuantProducts[id] += 1;
    setQuantProducts(newQuantProducts);
  };

  const decrescentProduct = (id) => {
    if (quantProducts[id] === 0) {
      return;
    }
    const newQuantProducts = [...quantProducts];
    newQuantProducts[id] -= 1;
    setQuantProducts(newQuantProducts);
  };

  const addProductToCart = (id) => {
    if (quantProducts[id] === 0) {
      return;
    }
    const newQuantProducts = [...quantProducts];
    newQuantProducts[id] = 0;
    setQuantProducts(newQuantProducts);

    if (cart.some((item) => item.id === itemId)) {
      const newCart = [...cart];
      newCart.forEach((item) => {
        if (item.id === itemId) {
          item.quantity += quantProducts[id];
        }
      });
      setCart(newCart);
      noty.success("Produto aumentado no carrinho!");
      return;
    }

    const newCart = [...cart];
    newCart.push({
      id: itemId,
      quantity: quantProducts[id],
    })
    setCart(newCart);
    noty.success("Produto adicionado ao carrinho!");
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(itemId);
    setIsCopy(true);
    noty.success("Id copiado com sucesso!");
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };
  return (
    <div
      style={{ borderBottom: tema.border }}
      className="main-home--products__list__item"
    >
      <div className="main-home--products__list__item--primary">
        <img
          className="main-home--products__list__item--primary__img"
          src={darkMode ? itemImg2 : itemImg}
          alt=""
        />
      </div>

      <div className="main-home--products__list__item--secundary">
        <h3
          style={{ color: tema.textColor }}
          className="main-home--products__list__item--secundary__title"
        >
          {itemTitle}
        </h3>
        <div className="main-home--products__list__item--secundary__group">
          <p className="main-home--products__list__item--secundary__description">
            {itemDesc}
          </p>
          <span
            style={{ backgroundColor: tema.backgroundColorPrimaria }}
            className="main-home--products__list__item--secundary__category"
          >
            <p>{itemCategory}</p>
          </span>
        </div>
      </div>

      <div className="main-home--products__list__item--tertiary">
        <p className="main-home--products__list__item--tertiary__price">
          {formatarParaBRL(itemPrice)}
        </p>

        <div className="main-home--products__list__item--tertiary__group">
          <div
            className="main-home--products__list__item--tertiary__group__buttons"
            style={{
              backgroundColor: tema.backgroundColorSecundaria,
              boxShadow: tema.boxShadow,
            }}
          >
            <button
              className="main-home--products__list__item--tertiary__group__buttons__minus"
              style={{ color: tema.textColor }}
              onClick={() => decrescentProduct(index)}
            >
              -
            </button>
            <div
              className="main-home--products__list__item--tertiary__group__buttons__number"
              style={{ color: tema.textColor }}
            >
              {quantProducts[index]}
            </div>
            <button
              className="main-home--products__list__item--tertiary__group__buttons__plus"
              style={{ color: tema.textColor }}
              onClick={() => acrescntProduct(index)}
            >
              +
            </button>
          </div>

          <button
          onClick={() => addProductToCart(index)}
            className="main-home--products__list__item--tertiary__group__button"
            style={{ boxShadow: tema.boxShadow }}
          >
            <i className="bx bxs-shopping-bag"></i>
          </button>

          <button
            onClick={handleCopyId}
            className="main-home--products__list__item--tertiary__group__copy"
            style={
              isCopy
                ? { backgroundColor: "green", boxShadow: tema.boxShadow }
                : {
                    backgroundColor: tema.backgroundColorSecundaria,
                    boxShadow: tema.boxShadow,
                  }
            }
          >
            {!isCopy ? (
              <i class="bx bx-copy" style={{ color: "gray" }}></i>
            ) : (
              <i class="bx bx-check" style={{ color: "#fbfbfb" }}></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
