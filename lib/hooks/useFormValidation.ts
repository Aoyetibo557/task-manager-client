import { useState } from "react";

export const useEmailValidate = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (email: string) => {
    reset();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const valid = emailRegex.test(email);
    setErrorMessage(valid ? "" : "Invalid email address");
    return valid;
  };

  const reset = () => {
    setErrorMessage("");
  };

  return { errorMessage, validate, reset };
};

export const usePasswordValidate = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  const validate = (password: string) => {
    reset();

    const valid = passwordRegex.test(password);
    setErrorMessage(
      valid
        ? ""
        : "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number"
    );
    return valid;
  };

  const reset = () => {
    setErrorMessage("");
  };

  return { errorMessage, validate, reset };
};
