import React, { useState } from "react";

const InputValue = () => {
  const [rawDigits, setRawDigits] = useState(""); 
  const [value, setValue] = useState("R$ 0,00");

  const handleKeyDown = (e) => {
    if (e.key.match(/^[0-9]$/)) {
      const newDigits = rawDigits + e.key;
      setRawDigits(newDigits);
      formatToBRL(newDigits);
    } else if (e.key === "Backspace") {
      const newDigits = rawDigits.slice(0, -1);
      setRawDigits(newDigits);
      formatToBRL(newDigits);
    } else if (["ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
      return;
    } else {
      e.preventDefault(); 
    }
  };

  const formatToBRL = (digits) => {
    const numericValue = Number(digits) / 100;
    const formatted = numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setValue(formatted);
  };

  return (
    <div className="container-input-teste">
      <input
        className="input-teste"
        type="text"
        value={value}
        onChange={() => {}} // impede edição direta
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default InputValue;
