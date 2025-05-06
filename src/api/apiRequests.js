import { formatDataItemRegister } from "../utils/formatt/dataFormatItemRegister";
import { formatarParaBRL } from "../utils/formatt/formatCurrencyBR";
import { formatarMensagemDeErro } from "../utils/formatt/formatErrorMensager";
import api from "./api";

export async function requestGetItem(id, formik, setLoadingGetItem, noty) {
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
    formik.setFieldValue("preco", formatarParaBRL(response.data.price));

    formik.setFieldValue("quantidade", response.data.quantity);
    formik.setFieldValue("unidade", response.data.unity);
  } catch (error) {
    if (error.status >= 500 && error.status < 600) {
      noty.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }

    if (error.status >= 400 && error.status < 500) {
      noty.error("Ocorreu um erro ao cadastrar o item.");
    }
  } finally {
    setLoadingGetItem(false);
  }
}

export async function requestDeleteItem(id, setLoadingDeleteItem, noty) {
  try {
    setLoadingDeleteItem(true);
    await api.delete(`/Products/Delete?id=${id}`);
    noty.success("Item deletado com sucesso!");
  } catch (error) {
    if (error.status >= 500 && error.status < 600) {
      noty.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }

    if (error.status >= 400 && error.status < 500) {
      noty.error("Ocorreu um erro ao deletar o item.");
    }
  } finally {
    setLoadingDeleteItem(false);
  }
}

export async function requestEditItem (values, resetForm, setLoadingEditItem, noty) {
  try {
    setLoadingEditItem(true);
    const data = formatDataItemRegister(values);
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
      noty.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }

    if (error.response?.status >= 400 && error.response?.status < 500) {
      noty.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }
  } finally {
    setLoadingEditItem(false);
  }
}

export const requestRegister = async (values, navigate, noty, registerRequestAPI) => {
  try {
    const response = await registerRequestAPI(values);

    if (response.sucess) {
      noty.success(response.message);
      localStorage.setItem("@Auth:idUser", response.id);
      localStorage.setItem('@Auth:email', values.email);
      localStorage.setItem('@Auth:password', values.password)
      localStorage.setItem("@Confirm:tokenEmailConfirm", response.tokenConfirmEmail);
      navigate("/confirmEmail");
      return;
    }

    noty.error(formatarMensagemDeErro(response));
  } catch (error) {
    if (error && error.status === 400) {
      noty.error(error.response.data);
    }
    if (error && error.status === 500) {
      noty.error("Houve um erro inesperado, tente novamente mais tarde");
    }
  }
};