import React from "react";
import { useNavigate } from "react-router-dom";
const RegisterItem = () => {
  const navigate = useNavigate();
  return (
    <div class="container-register-item">
      <button className="btn-back" onClick={() => navigate('/')}>
        <i class="bx bx-left-arrow-alt" style={{ color: "#FFFFFF" }}></i>
      </button>
    <div class="container-register-item__card-form">
      <h1 class="container-register-item__card-form--title">Cadastrar Item</h1>

     <form class="container-register-item__card-form--form">
      
      <div class="container-register-item__card-form--form__group">
        <label for="nome">Nome</label>
        <input type="text" id="nome" />
      </div>

      <div class="container-register-item__card-form--form__group">
        <label for="descricao">Descrição</label>
        <input type="text" id="descricao" />
      </div>

      <div class="container-register-item__card-form--form__group">
        <label for="categoria">Categoria</label>
        <select name="categoria" id="categoria">
          <option value="">Categoria 1</option>
          <option value="">Categoria 2</option>
          <option value="">Categoria 3</option>
          <option value="">Categoria 4</option>
        </select>
      </div>


      <div class="container-register-item__card-form--form__group">
        <label for="preco">Preço</label>
        <input type="number" id="preco" />
      </div>
      

      <div class="container-register-item__card-form--form__group">
        <label for="quantidade">Quantidade</label>
        <input type="number" id="quantidade" />
      </div>

      <div class="container-register-item__card-form--form__group">
        <label for="unidade">Unidade</label>
        <select name="unidade" id="unidade">
          <option value="">Unidade 1</option>
          <option value="">Unidade 2</option>
          <option value="">Unidade 3</option>
          <option value="">Unidade 4</option>
        </select>
      </div>

      <input class="container-register-item__card-form--form__button" type="submit" value="Cadastrar" />

     </form>

    </div>
  </div>
  );
};

export default RegisterItem;
