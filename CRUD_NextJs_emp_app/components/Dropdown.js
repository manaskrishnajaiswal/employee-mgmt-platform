import React, { useState } from "react";
import styles from "../styles/Home.module.css";

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options[0]);

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
        {selectedOption}
        <i className={`fa fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <div className={styles.dropdown__options}>
          {props.options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdown__option} ${
                option === selectedOption
                  ? styles["dropdown__option--selected"]
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
