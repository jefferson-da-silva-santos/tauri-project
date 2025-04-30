import React, { useContext } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import NotyContext from "../../context/NotyContext";
import useApi from "../../hooks/useApi";

const DownloadTicketButton = () => {
  const noty = useContext(NotyContext);

  const { requestAPI: requestTicket } = useApi(null, "POST");

  const handleDownload = async () => {
    try {
      const response = await requestTicket(null, "/Ticket/GerarBoleto");

      if (!response) {
        noty.error("Erro na geração do boleto!");
        return;
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "boleto.pdf");
      noty.success("Boleto gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar e baixar o boleto:", error);
      if (error.response && error.response.status === 400) {
        noty.error("Houve um erro na geração do boleto!");
      } else if (error.response && error.response.status === 500) {
        noty.error("Houve um erro inesperado, tente novamente mais tarde");
      } else {
        noty.error("Erro ao gerar o boleto.");
      }
    }
  };

  return (
    <button className="button-download-ticket" onClick={handleDownload}>
      Baixar Boleto
    </button>
  );
};

export default DownloadTicketButton;
