const validator = require("validator");
//import isEmpty from "./stringUtils";
const isEmpty = require("./stringUtils");

module.exports = function validateExperianceInput(data) {
  let errors = {};

  data.title = isEmpty(data.title) ? "" : data.title;
  data.company = isEmpty(data.company) ? "" : data.company;
  data.from = isEmpty(data.from) ? "" : data.from;
  //data.current = isEmpty(data.current) ? "" : data.current;

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "company field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
