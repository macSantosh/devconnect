import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListdGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  options
  //option={label, value}
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.label}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>

      {info && <small className="form-text text-muted"> {info} </small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListdGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListdGroup;
