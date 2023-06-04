import React from "react";

const InputContainer = ({ label, value, onChange, type, fullWidth }) => {
  return (
    <div className="input-item">
      <label htmlFor="brandname" className="input-label">
        {label}
      </label>
      <input
        type={type}
        className={`input-box ${fullWidth ? "!w-full" : ""}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputContainer.defaultProps = {
  type: "text",
  fullWidth: false,
};

export default InputContainer;
