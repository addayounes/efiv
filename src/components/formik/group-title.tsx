import React from "react";

interface FormGroupTitleProps {
  children?: React.ReactNode;
}

const FormGroupTitle: React.FC<FormGroupTitleProps> = ({ children }) => {
  return <h3 className="text-xl font-medium">{children}</h3>;
};

export default FormGroupTitle;
