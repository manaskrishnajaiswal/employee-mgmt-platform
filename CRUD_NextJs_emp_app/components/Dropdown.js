import React, { useState } from "react";
import styles from "../styles/Home.module.css";

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options.Option1);

  function handleOptionClick(option) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__header} onClick={toggleDropdown}>
        {selectedOption}&nbsp;&nbsp;
        <i className={`fa fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <div className={styles.dropdown__options}>
          {Object.entries(props.options).map(([key, value]) => (
            <div
              key={key}
              className={styles.dropdown__option}
              onClick={() => handleOptionClick(value)}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
