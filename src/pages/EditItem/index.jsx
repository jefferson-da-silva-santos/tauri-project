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
import api from "../../api/api";
import useNoty from "../../hooks/useNoty";
import { formatNumber } from "../../utils/formatt/formatNumber";
// import "primeicons/primeicons.css";

const EditItem = () => {
  const noty = useNoty();
  const navigate = useNavigate();
  const [loadingGetItem, setLoadingGetItem] = useState(false);
  const [loadingEditItem, setLoadingEditItem] = useState(false);

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
      id: "",
      nome: "",
      descricao: "",
      categoria: null,
      preco: null,
      quantidade: null,
      unidade: null,
    },
    validationSchema: Yup.object({
      id: Yup.number().required("ID é obrigatório"),
      nome: Yup.string().required("Nome é obrigatório"),
      descricao: Yup.string().required("Descrição é obrigatória"),
      categoria: Yup.string().required("Categoria é obrigatória"),
      preco: Yup.number().required("Preço é obrigatório").min(0),
      quantidade: Yup.number().required("Quantidade é obrigatória").min(1),
      unidade: Yup.string().required("Unidade é obrigatória"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Entrou na função de submissão");
      try {
        setLoadingEditItem(true);
        const data = formatDataItemRegister(values);
        console.log("Data para editar:", data);
        const response = await api.put(
          `/Products/Update?id=${values.id}`,
          data
        );

        if (response) {
          noty.success("Item editado com sucesso!");
          resetForm();
        }
      } catch (error) {
        if (error.response?.status >= 500 && error.response?.status < 600) {
          noty.error("Ocorreu um erro inesperado.");
        }

        if (error.response?.status >= 400 && error.response?.status < 500) {
          noty.error("Ocorreu um erro ao editar o item.");
        }
      } finally {
        setLoadingEditItem(false);
      }
    },
  });

  async function requestGetItem(id) {
    try {
      setLoadingGetItem(true);
      const response = await api.get(`/Products/GetId?id=${id}`);
      if (!response.data) {
        noty.error("Nenhum item encontrado com esse ID.");
        return;
      }

      noty.success("Item carregado com sucesso!");
      formik.setFieldValue("id", response.data.id);
      formik.setFieldValue("nome", response.data.name);
      formik.setFieldValue("descricao", response.data.description);
      formik.setFieldValue("categoria", response.data.category);
      formik.setFieldValue("preco", response.data.price);
      formik.setFieldValue("quantidade", response.data.quantity);
      formik.setFieldValue("unidade", response.data.unity);
    } catch (error) {
      if (error.status >= 500 && error.status < 600) {
        noty.error("Ocorreu um erro inesperado.");
      }

      if (error.status >= 400 && error.status < 500) {
        noty.error("Ocorreu um erro ao cadastrar o item.");
      }
    } finally {
      setLoadingGetItem(false);
    }
  }

  return (
    <div className="container-edit-item">
      <button className="btn-back" onClick={() => navigate("/")}>
        <i className="bx bx-left-arrow-alt" style={{ color: "#FFFFFF" }}></i>
      </button>

      <div className="container-edit-item__card-form">
        <h1 className="container-edit-item__card-form--title">Editar Item</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="container-edit-item__card-form--form"
        >
          {/* ID */}
          <div className="container-edit-item__card-form--form__group group-id">
            <label htmlFor="id">Id</label>
            <InputNumber
              id="id"
              name="id"
              disabled={loadingGetItem}
              placeholder={loadingGetItem ? "Carregando..." : "Digite o ID"}
              value={formik.values.id}
              onValueChange={(e) => formik.setFieldValue("id", e.value)}
              onBlur={formik.handleBlur}
              showButtons
              min={1}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  requestGetItem(formatNumber(e.target.value));
                }
              }}
              className={
                formik.touched.id && formik.errors.id ? "p-invalid" : ""
              }
            />
            {formik.touched.id && formik.errors.id && (
              <small className="p-error">{formik.errors.id}</small>
            )}
          </div>

          {/* Nome */}
          <div className="container-edit-item__card-form--form__group">
            <label htmlFor="nome">Nome</label>
            <InputText
              id="nome"
              name="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.nome && formik.errors.nome ? "p-invalid" : ""
              }
            />
            {formik.touched.nome && formik.errors.nome && (
              <small className="p-error">{formik.errors.nome}</small>
            )}
          </div>

          {/* Descrição */}
          <div className="container-edit-item__card-form--form__group">
            <label htmlFor="descricao">Descrição</label>
            <InputText
              id="descricao"
              name="descricao"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.descricao && formik.errors.descricao
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.descricao && formik.errors.descricao && (
              <small className="p-error">{formik.errors.descricao}</small>
            )}
          </div>

          {/* Categoria */}
          <div className="container-edit-item__card-form--form__group">
            <label htmlFor="categoria">Categoria</label>
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
            />
            {formik.touched.categoria && formik.errors.categoria && (
              <small className="p-error">{formik.errors.categoria}</small>
            )}
          </div>

          {/* Preço */}
          <div className="container-edit-item__card-form--form__group">
            <label htmlFor="preco">Preço</label>
            <InputNumber
              id="preco"
              name="preco"
              value={formik.values.preco}
              onValueChange={(e) => formik.setFieldValue("preco", e.value)}
              onBlur={formik.handleBlur}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              className={
                formik.touched.preco && formik.errors.preco ? "p-invalid" : ""
              }
            />
            {formik.touched.preco && formik.errors.preco && (
              <small className="p-error">{formik.errors.preco}</small>
            )}
          </div>

          {/* Quantidade */}
          <div className="container-edit-item__card-form--form__group">
            <label htmlFor="quantidade">Quantidade</label>
            <InputNumber
              id="quantidade"
              name="quantidade"
              value={formik.values.quantidade}
              onValueChange={(e) => formik.setFieldValue("quantidade", e.value)}
              onBlur={formik.handleBlur}
              showButtons
              min={0}
              className={
                formik.touched.quantidade && formik.errors.quantidade
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.quantidade && formik.errors.quantidade && (
              <small className="p-error">{formik.errors.quantidade}</small>
            )}
          </div>

          {/* Unidade */}
          <div className="container-edit-item__card-form--form__group">
            <label htmlFor="unidade">Unidade</label>
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
            />
            {formik.touched.unidade && formik.errors.unidade && (
              <small className="p-error">{formik.errors.unidade}</small>
            )}
          </div>

          {/* Botões */}
          <div className="group-buttons">
            <Button
              type="submit"
              label="Salvar Alterações"
              className="container-edit-item__card-form--form__button"
              icon="pi pi-check"
            />
            <Button
              type="button"
              label="Deletar Item"
              severity="danger"
              icon="pi pi-trash"
              className="container-edit-item__card-form--form__button btn-rm"
              onClick={() => alert("Confirma exclusão?")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
