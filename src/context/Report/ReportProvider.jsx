import { useState } from "react";
import ReportContext from "./ReportContext";
import api from "../../api/api";
import useNoty from "../../hooks/useNoty";

const ReportProvider = ({ children }) => {
  const noty = useNoty();
  const [loading, setLoading] = useState(false);

  const requestReport = async () => {
    setLoading(true);
    try {
      const response = await api.get("/Report/Sales-QuestPDF", null, {
        responseType: "blob",
      });

      if (!response) {
        noty.error("Erro na geração do relatório!");
        return;
      }
      noty.success("Relatório gerado com sucesso!");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        noty.error("Houve um erro na geração do relatório!");
      } else if (error.response && error.response.status >= 500 && error.response.status < 600) {
        noty.error("Houve um erro inesperado, tente novamente mais tarde");
      } else {
        noty.error("Erro ao gerar o relatório.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ReportContext.Provider value={{ loading, requestReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
