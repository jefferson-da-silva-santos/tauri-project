import { useContext } from "react";
import CartContext from "../context/Cart/CartContext";

const useCart = () => {
  const {cart, setCart} = useContext(CartContext);
  return {cart, setCart};
};

export default useCart;