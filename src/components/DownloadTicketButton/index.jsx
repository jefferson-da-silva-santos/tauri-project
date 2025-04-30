import React, { useContext, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import NotyContext from "../../context/NotyContext";
import useApi from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

const DownloadTicketButton = ({ redirect = false, route = "" }) => {
  const noty = useContext(NotyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { requestAPI: requestTicket } = useApi(null, "POST");

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await requestTicket(null, "/Ticket/GerarBoleto");

      if (!response) {
        noty.error("Erro na geração do boleto!");
        return;
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "boleto.pdf");
      noty.success("Boleto gerado com sucesso!");
      if (redirect) {
        navigate(route);
      }
    } catch (error) {
      console.error("Erro ao gerar e baixar o boleto:", error);
      if (error.response && error.response.status === 400) {
        noty.error("Houve um erro na geração do boleto!");
      } else if (error.response && error.response.status === 500) {
        noty.error("Houve um erro inesperado, tente novamente mais tarde");
      } else {
        noty.error("Erro ao gerar o boleto.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="button-download-ticket"
      style={
        loading
          ? {
              border: "none",
            }
          : {}
      }
      onClick={handleDownload}
    >
      {loading ? (
        <i className="bx bx-loader-alt bx-spin" style={{ color: "#06b100" }}></i>
      ) : (
        <i className="bx bxs-download bx-tada"></i>
      )}
    </button>
  );
};

export default DownloadTicketButton;
