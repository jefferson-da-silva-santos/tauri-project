import React from "react";
import { formatarParaBRL } from "../../utils/formatt/formatCurrencyBR";

const ProductCard = ({
  itemImg,
  itemTitle,
  itemDesc,
  itemCategory,
  itemPrice,
}) => {
  return (
    <div className="main-home--products__list__item">
      <div className="main-home--products__list__item--primary">
        <img
          className="main-home--products__list__item--primary__img"
          src={itemImg}
          alt=""
        />
      </div>

      <div className="main-home--products__list__item--secundary">
        <h3 className="main-home--products__list__item--secundary__title">
          {itemTitle}
        </h3>
        <div className="main-home--products__list__item--secundary__group">
          <p className="main-home--products__list__item--secundary__description">
            {itemDesc}
          </p>
          <span className="main-home--products__list__item--secundary__category">
            <p>{itemCategory}</p>
          </span>
        </div>
      </div>

      <div className="main-home--products__list__item--tertiary">
        <p className="main-home--products__list__item--tertiary__price">
          {formatarParaBRL(itemPrice)}
        </p>

        <div className="main-home--products__list__item--tertiary__group">
          <div className="main-home--products__list__item--tertiary__group__buttons">
            <button className="main-home--products__list__item--tertiary__group__buttons__minus">
              -
            </button>
            <div className="main-home--products__list__item--tertiary__group__buttons__number">
              0
            </div>
            <button className="main-home--products__list__item--tertiary__group__buttons__plus">
              +
            </button>
          </div>

          <button className="main-home--products__list__item--tertiary__group__button">
            <i className="bx bxs-shopping-bag"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
