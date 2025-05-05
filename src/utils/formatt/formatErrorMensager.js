export function formatarMensagemDeErro(erroObj) {
  if (erroObj && erroObj.errors && Array.isArray(erroObj.errors) && erroObj.errors.length > 0) {
    const primeiroErro = erroObj.errors[0];
    switch (primeiroErro.code) {
      case "DuplicateUserName":
        return `O nome de usuário '${primeiroErro.description.split("'")[1]}' já está em uso. Por favor, escolha outro.`;
      // Você pode adicionar mais casos aqui para outros códigos de erro
      default:
        return "Ocorreu um erro ao processar sua requisição. Por favor, tente novamente.";
    }
  } else {
    return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
  }
}