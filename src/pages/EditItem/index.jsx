import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import useNoty from "../../hooks/useNoty";
import { formatNumber } from "../../utils/formatt/formatNumber";
import { handleOnKeyDown } from "../../utils/inputValue/handleOnKeyDown";
import {
  requestEditItem,
  requestGetItem,
} from "../../api/apiRequests";
import { validateDataEdit } from "../../utils/validate/validateDataEdit";
import DialogBox from "../../components/Dialog";

const EditItem = () => {
  const noty = useNoty();
  const navigate = useNavigate();
  const [loadingGetItem, setLoadingGetItem] = useState(false);
  const [loadingEditItem, setLoadingEditItem] = useState(false);
  const [loadingDeleteItem, setLoadingDeleteItem] = useState(false);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = (id) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
      preco: "R$ 0,00",
      quantidade: null,
      unidade: null,
    },
    validationSchema: validateDataEdit,
    onSubmit: async (values, { resetForm }) => {
      requestEditItem(values, resetForm, setLoadingEditItem, noty);
    },
  });

  return (
    <div className="container-edit-item">
      <DialogBox
        formik={formik}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        setLoadingDeleteItem={setLoadingDeleteItem}
        noty={noty}
      />
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
                  requestGetItem(
                    formatNumber(e.target.value),
                    formik,
                    setLoadingGetItem,
                    noty
                  );
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
          {/* Preço com centavos dinâmicos */}
          <div className="container-edit-item__card-form--form__group">
            <label htmlFor="preco">Preço</label>
            <input
              id="preco"
              type="text"
              name="preco"
              value={formik.values.preco}
              onKeyDown={(e) => handleOnKeyDown(e, formik)}
              onChange={() => {}}
              placeholder="Ex. R$ 2,00"
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
              label={loadingEditItem ? "Salvando..." : "Salvar Alterações"}
              disabled={loadingEditItem || loadingDeleteItem || loadingGetItem}
              className="container-edit-item__card-form--form__button"
              icon="pi pi-check"
            />
            <Button
              type="button"
              label={loadingDeleteItem ? "Excluindo..." : "Excluir"}
              severity="danger"
              disabled={loadingEditItem || loadingDeleteItem || loadingGetItem}
              icon="pi pi-trash"
              className="container-edit-item__card-form--form__button btn-rm"
              onClick={() => {
                handleClickOpenDialog(formik.values.id);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
