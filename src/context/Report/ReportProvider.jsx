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
      console.log(error);
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
