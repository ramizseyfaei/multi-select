import React, { useState, useRef, useEffect } from "react";
import "../styles/MultiSelect.scss";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>([]);
  const [items, setItems] = useState<Option[]>(options);
  const [inputValue, setInputValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelect = (option: Option) => {
    if (selected.some((s) => s.value === option.value)) {
      setSelected(selected.filter((s) => s.value !== option.value));
    } else {
      setSelected([...selected, option]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newOption = {
        label: inputValue,
        value: inputValue.toLowerCase().replace(/\s+/g, "-"),
      };
      setItems([...items, newOption]);
      setSelected([...selected, newOption]);
      setInputValue("");
    }
  };

  return (
    <div className="multi-select" ref={wrapperRef}>
      <div className="multi-select__control" onClick={() => setIsOpen(!isOpen)}>
        {selected.length > 0 ? (
          <div className="multi-select__tags">
            {selected.map((s) => (
              <span key={s.value} className="multi-select__tag">
                {s.label}
              </span>
            ))}
          </div>
        ) : (
          <span className="multi-select__placeholder">
            {placeholder || "Select..."}
          </span>
        )}
        <span className={`multi-select__arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>

      {isOpen && (
        <div className="multi-select__menu">
          <input
            type="text"
            className="multi-select__input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type and press Enter..."
          />
          <ul className="multi-select__list">
            {items.map((option) => (
              <li
                key={option.value}
                className={`multi-select__option ${
                  selected.some((s) => s.value === option.value)
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleSelect(option)}
              >
                {option.label}
                {selected.some((s) => s.value === option.value) && (
                  <span>✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
