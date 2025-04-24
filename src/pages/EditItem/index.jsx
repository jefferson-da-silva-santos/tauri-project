import React from "react";
import { useNavigate } from "react-router-dom";
const EditItem = () => {
  const navigate = useNavigate();

  return (
    <div className="container-edit-item">
      <button className="btn-back" onClick={() => navigate("/")}>
        <i class="bx bx-left-arrow-alt" style={{ color: "#FFFFFF" }}></i>
      </button>

      <div className="container-edit-item__card-form">
        <h1 className="container-edit-item__card-form--title">Editar Item</h1>

        <form className="container-edit-item__card-form--form">
          <div className="container-edit-item__card-form--form__group group-id">
            <label for="id">Id</label>
            <input type="number" id="id" />
          </div>

          <div className="container-edit-item__card-form--form__group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" />
          </div>

          <div className="container-edit-item__card-form--form__group">
            <label for="descricao">Descrição</label>
            <input type="text" id="descricao" />
          </div>

          <div className="container-edit-item__card-form--form__group">
            <label for="categoria">Categoria</label>
            <select name="categoria" id="categoria">
              <option value="">Categoria 1</option>
              <option value="">Categoria 2</option>
              <option value="">Categoria 3</option>
              <option value="">Categoria 4</option>
            </select>
          </div>

          <div className="container-edit-item__card-form--form__group">
            <label for="preco">Preço</label>
            <input type="number" id="preco" />
          </div>

          <div className="container-edit-item__card-form--form__group">
            <label for="quantidade">Quantidade</label>
            <input type="number" id="quantidade" />
          </div>

          <div className="container-edit-item__card-form--form__group">
            <label for="unidade">Unidade</label>
            <select name="unidade" id="unidade">
              <option value="">Unidade 1</option>
              <option value="">Unidade 2</option>
              <option value="">Unidade 3</option>
              <option value="">Unidade 4</option>
            </select>
          </div>

          <div className="group-buttons">
            <input
              className="container-edit-item__card-form--form__button"
              type="submit"
              value="Cadastrar"
            />
            <button className="container-edit-item__card-form--form__button btn-rm">
              Deletar Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
