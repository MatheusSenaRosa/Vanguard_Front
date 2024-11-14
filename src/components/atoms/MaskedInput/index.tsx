/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from "react";
import ReactInputMask from "react-input-mask";

import { Input } from "../Input/styles";

type Props = InputHTMLAttributes<HTMLInputElement> & { mask: string };

export const MaskedInput = forwardRef<HTMLInputElement, Props>(({ mask, ...props }, ref) => (
  <ReactInputMask mask={mask} {...props}>
    {/* @ts-ignore */}
    {(inputProps) => <Input ref={ref} {...props} {...inputProps} />}
  </ReactInputMask>
));
