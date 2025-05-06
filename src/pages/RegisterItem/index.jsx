import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { formatDataItemRegister } from "../../utils/formatt/dataFormatItemRegister";
import api from "../../api/api";
import useNoty from "../../hooks/useNoty";
import { handleOnKeyDown } from "../../utils/inputValue/handleOnKeyDown";
import { useTheme } from "../../hooks/useTheme";
import { temaEstilos } from "../../utils/styles/themeStyles";

const RegisterItem = () => {
  const navigate = useNavigate();
  const noty = useNoty();
  const { darkMode } = useTheme();
  const tema = darkMode ? temaEstilos.escuro : temaEstilos.claro;
  const inputStyle = darkMode ? { boxShadow: temaEstilos.escuro.boxShadow, backgroundColor: temaEstilos.escuro.backgroundColorSecundaria, color: temaEstilos.escuro.textColor, borderColor: temaEstilos.escuro.border.split(' ')[2] } : {};
  const dropdownStyle = darkMode ? { backgroundColor: temaEstilos.escuro.backgroundColorSecundaria, color: temaEstilos.escuro.textColor, borderColor: temaEstilos.escuro.border.split(' ')[2] } : {};

  const categoryOptions = [
    { label: "Alimentos", value: "Alimentos" },
    { label: "Eletrônico", value: "Eletrônico" },
    { label: "Vestuario", value: "Vestuario" },
    { label: "Mobiliário", value: "Mobiliário" },
    { label: "Outros", value: "Outros" },
  ];

  const unitOptions = [
    { label: "KG", value: "KG" },
    { label: "UN", value: "UN" },
    { label: "L", value: "L" },
    { label: "ML", value: "ML" },
    { label: "CX", value: "CX" },
    { label: "PC", value: "PC" },
  ];

  const formik = useFormik({
    initialValues: {
      nome: "",
      descricao: "",
      categoria: null,
      preco: "R$ 0,00",
      rawDigits: "",
      quantidade: null,
      unidade: null,
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Nome é obrigatório"),
      descricao: Yup.string().required("Descrição é obrigatória"),
      categoria: Yup.string().required("Categoria é obrigatória"),
      preco: Yup.string().required("Preço é obrigatório"),
      quantidade: Yup.number().required("Quantidade é obrigatória").min(1),
      unidade: Yup.string().required("Unidade é obrigatória"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post(
          "/Products/Register",
          formatDataItemRegister(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = JSON.stringify(response.data);

        if (!responseData) {
          noty.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
          return;
        }

        noty.success("Item cadastrado com sucesso!");
        resetForm();
      } catch (error) {
        if (error.status >= 500 && error.status < 600) {
          noty.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }

        if (error.status >= 400 && error.status < 500) {
          noty.error("Ocorreu um erro ao cadastrar o item.");
        }

        console.error("Erro ao cadastrar item:", error);
      }
    },
  });

  return (
    <div className="container-register-item" style={{ backgroundColor: tema.backgroundColorPrimaria }}>
      <button style={{ boxShadow: tema.boxShadow }} className="btn-back" onClick={() => navigate("/")}>
        <i className="bx bx-left-arrow-alt" style={{ color: "#FFFFFF" }}></i>
      </button>

      <div className="container-register-item__card-form" style={{ backgroundColor: tema.backgroundColorSecundaria, boxShadow: tema.boxShadow }}>
        <h1 className="container-register-item__card-form--title" style={{ color: tema.textColor }}>
          Cadastrar Item
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="container-register-item__card-form--form"
        >
          {/* Nome */}
          <div className="container-register-item__card-form--form__group">
            <label htmlFor="nome" style={{ color: tema.textColor }}>Nome</label>
            <InputText
              id="nome"
              name="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ex. Macarrão"
              className={
                formik.touched.nome && formik.errors.nome ? "p-invalid" : ""
              }
              style={inputStyle}
            />
            {formik.touched.nome && formik.errors.nome && (
              <small className="p-error">{formik.errors.nome}</small>
            )}
          </div>

          {/* Descrição */}
          <div className="container-register-item__card-form--form__group">
            <label htmlFor="descricao" style={{ color: tema.textColor }}>Descrição</label>
            <InputText
              id="descricao"
              name="descricao"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              placeholder="Ex. Macarrão 500g"
              onBlur={formik.handleBlur}
              className={
                formik.touched.descricao && formik.errors.descricao
                  ? "p-invalid"
                  : ""
              }
              style={inputStyle}
            />
            {formik.touched.descricao && formik.errors.descricao && (
              <small className="p-error">{formik.errors.descricao}</small>
            )}
          </div>

          {/* Categoria */}
          <div className="container-register-item__card-form--form__group">
            <label htmlFor="categoria" style={{ color: tema.textColor }}>Categoria</label>
            <Dropdown
              id="categoria"
              name="categoria"
              value={formik.values.categoria}
              options={categoryOptions}
              onChange={(e) => formik.setFieldValue("categoria", e.value)}
              onBlur={formik.handleBlur}
              placeholder="Selecione uma categoria"
              className={
                formik.touched.categoria && formik.errors.categoria
                  ? "p-invalid"
                  : ""
              }
              style={dropdownStyle}
            />
            {formik.touched.categoria && formik.errors.categoria && (
              <small className="p-error">{formik.errors.categoria}</small>
            )}
          </div>

          {/* Preço */}
          {/* Preço com centavos dinâmicos */}
          <div className="container-register-item__card-form--form__group">
            <label htmlFor="preco" style={{ color: tema.textColor }}>Preço</label>
            <input
              id="preco"
              type="text"
              name="preco"
              value={formik.values.preco}
              onKeyDown={(e) => handleOnKeyDown(e, formik)}
              onChange={() => { }}
              onBlur={formik.handleBlur}
              placeholder="Ex. R$ 2,00"
              currency="BRL"
              locale="pt-BR"
              className={
                formik.touched.preco && formik.errors.preco ? "p-invalid" : ""
              }
              style={inputStyle}
            />
            {formik.touched.preco && formik.errors.preco && (
              <small className="p-error">{formik.errors.preco}</small>
            )}
          </div>

          {/* Quantidade */}
          <div className="container-register-item__card-form--form__group">
            <label htmlFor="quantidade" style={{ color: tema.textColor }}>Quantidade</label>
            <InputNumber
              id="quantidade"
              name="quantidade"
              value={formik.values.quantidade}
              onValueChange={(e) => formik.setFieldValue("quantidade", e.value)}
              onBlur={formik.handleBlur}
              showButtons
              placeholder="Ex. 12"
              min={1}
              className={
                formik.touched.quantidade && formik.errors.quantidade
                  ? "p-invalid"
                  : ""
              }
              inputStyle={inputStyle}
              style={{ width: '100%' }}
            />
            {formik.touched.quantidade && formik.errors.quantidade && (
              <small className="p-error">{formik.errors.quantidade}</small>
            )}
          </div>

          {/* Unidade */}
          <div className="container-register-item__card-form--form__group">
            <label htmlFor="unidade" style={{ color: tema.textColor }}>Unidade</label>
            <Dropdown
              id="unidade"
              name="unidade"
              value={formik.values.unidade}
              options={unitOptions}
              onChange={(e) => formik.setFieldValue("unidade", e.value)}
              onBlur={formik.handleBlur}
              placeholder="Selecione uma unidade"
              className={
                formik.touched.unidade && formik.errors.unidade
                  ? "p-invalid"
                  : ""
              }
              style={dropdownStyle}
            />
            {formik.touched.unidade && formik.errors.unidade && (
              <small className="p-error">{formik.errors.unidade}</small>
            )}
          </div>

          <Button
            type="submit"
            label="Cadastrar"
            className="container-register-item__card-form--form__button"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterItem;