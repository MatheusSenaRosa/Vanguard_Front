import { AnimatePresence } from "framer-motion";
import { CaretDown } from "phosphor-react";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";

import { useClickOutside } from "@hooks";

import * as S from "./styles";
import { IOption } from "./types";

type Props = {
  id?: string;
  placeholder: string;
  value: string | number;
  disabled?: boolean;
  options: IOption[];
  onChange: (id: number | string) => void;
};

export const AutoCompleteSelect = ({ id, placeholder, value, options, disabled, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const containerRef = createRef<HTMLDivElement>();
  const listRef = createRef<HTMLUListElement>();

  const selectedOption = useMemo(() => options.find((item) => item.value === value), [options, value]);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  const normalizeText = (text: string) => {
    const normalized = text
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return normalized;
  };

  const onSelect = (option: IOption) => {
    onChange(option.value);
    setInputValue(option.description);

    setIsOpen(false);
  };

  const onChangeHandler = (currentValue: string) => {
    setInputValue(currentValue);

    if (!currentValue) {
      onChange(null);
      return;
    }

    const foundOption = options.find((item) => normalizeText(item.description) === normalizeText(currentValue));

    if (!foundOption) {
      onChange(null);

      return;
    }

    if (foundOption) {
      onChange(foundOption.value);
    }
  };

  const getOptionsToShow = useCallback(() => {
    const foundOption = options.find((item) => normalizeText(item.description) === normalizeText(inputValue));

    if (foundOption) return options;

    if (inputValue) {
      const filtered = options.filter((item) => normalizeText(item.description).includes(normalizeText(inputValue)));

      return filtered;
    }

    return options;
  }, [inputValue, options]);

  const optionsToShow = getOptionsToShow();

  // set value on initialize component
  useEffect(() => {
    if (selectedOption && inputValue !== selectedOption?.description) {
      setInputValue(selectedOption.description);
    }
  }, [inputValue, selectedOption]);

  useEffect(() => {
    if (!isOpen && !selectedOption) {
      setInputValue("");
    }
  }, [isOpen, selectedOption]);

  // scroll selected option into view
  useEffect(() => {
    if (isOpen && listRef.current && value && options?.length) {
      const activeOptionIndex = options.findIndex((item) => item.value === value);

      if (listRef.current.children[activeOptionIndex]) {
        listRef.current.children[activeOptionIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [isOpen, listRef, options, value]);

  return (
    <S.Container ref={containerRef} $isOpen={isOpen} onFocus={() => setIsOpen(true)}>
      <S.Input
        $isOpen={isOpen}
        autoComplete="off"
        disabled={disabled}
        title={selectedOption?.description || placeholder}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => onChangeHandler(e.target?.value)}
      />

      <CaretDown />

      <AnimatePresence>
        {isOpen && !disabled && (
          <S.List
            ref={listRef}
            initial={{ opacity: 0, y: -40, zIndex: 1 }}
            animate={{ opacity: 1, y: 0, zIndex: 3 }}
            exit={{ opacity: 0, y: -40, zIndex: 1 }}
            transition={{ duration: 0.1 }}
          >
            {!optionsToShow?.length && <S.NotFoundMessage>Nenhum item encontrado</S.NotFoundMessage>}

            {optionsToShow.map((item) => (
              <S.Option key={item.value} $isActive={item.value === value}>
                <button type="button" data-cy={`${id}-item`} onClick={() => onSelect(item)}>
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
