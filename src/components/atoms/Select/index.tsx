import { AnimatePresence } from "framer-motion";
import { CaretDown } from "phosphor-react";
import { createRef, useState } from "react";

import { useClickOutside } from "@hooks";

import * as S from "./styles";

type Props = {
  id?: string;
  placeholder: string;
  value: string | number;
  disabled?: boolean;
  options: {
    value: string | number;
    description: string;
  }[];
  onChange: (id: string | number) => void;
};

export const Select = ({ id, placeholder, value, options, disabled, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = createRef<HTMLDivElement>();

  const currentDescription = options.find((item) => item.value === value)?.description;

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  const onSelect = (id: number | string) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <S.Container ref={containerRef}>
      <S.Button
        id={id}
        title={currentDescription || placeholder}
        $isOpen={isOpen}
        $isEmpty={!value}
        disabled={disabled}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>{currentDescription || placeholder}</p>
        <CaretDown />
      </S.Button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <S.List
            initial={{ opacity: 0, y: -40, zIndex: 1 }}
            animate={{ opacity: 1, y: 0, zIndex: 3 }}
            exit={{ opacity: 0, y: -40, zIndex: 1 }}
            transition={{ duration: 0.1 }}
          >
            {options.map((item) => (
              <S.Option key={item.value} $isActive={item.value === value}>
                <button type="button" data-cy={`${id}-item`} onClick={() => onSelect(item.value)}>
                  {item.description}
                </button>
              </S.Option>
            ))}
          </S.List>
        )}
      </AnimatePresence>
    </S.Container>
  );
};
