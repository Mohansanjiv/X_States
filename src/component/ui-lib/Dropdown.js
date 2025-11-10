import React from "react";
import "./Dropdown.css";

const CustomDropdown = ({
    label,
    placeholder = "Select an option",
    options = [],
    value,
    onChange,
    disabled = false,
}) => {
    return (
        <div className={`dropdown-container ${disabled ? "disabled" : ""}`}>
            {label && <label className="dropdown-label">{label}</label>}

            <select
                className="dropdown-selected"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                disabled={disabled}
            >
                <option value="">{placeholder}</option>
                {options.length > 0 ? (
                    options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))
                ) : (
                    <option disabled>No options</option>
                )}
            </select>
        </div>
    );
};

export default CustomDropdown;
