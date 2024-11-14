import { InputHTMLAttributes, forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import * as S from "./styles";

type Props = InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  if (props?.type === "password") {
    return (
      <S.Container>
        <S.Input {...props} ref={ref} type={isPasswordVisible ? "text" : "password"} />
        {props?.value && (
          <S.ShowPassword type="button" onClick={() => handleTogglePassword()}>
            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          </S.ShowPassword>
        )}
      </S.Container>
    );
  }

  return <S.Input {...props} ref={ref} />;
});
