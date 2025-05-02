import { useContext } from "react"
import NotyContext from "../context/NotyContext"

const useNoty = () => {
  const noty = useContext(NotyContext);
  return noty;
}

export default useNoty