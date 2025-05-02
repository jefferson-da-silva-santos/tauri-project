import { useContext } from "react"
import ReportContext from "../context/Report/ReportContext"

const useReport = () => {
  const { loading, requestReport } = useContext(ReportContext);
  return { loading, requestReport };
}

export default useReport