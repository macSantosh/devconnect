const validator = require("validator");
//import isEmpty from "./stringUtils";
const isEmpty = require("./stringUtils");

module.exports = function validateEducationInput(data) {
  let errors = {};

  //console.log("eduction validation: " + JSON.stringify(data));
  data.degree = isEmpty(data.degree) ? "" : data.degree;
  data.school = isEmpty(data.school) ? "" : data.school;
  data.fieldofstudy = isEmpty(data.fieldofstudy) ? "" : data.fieldofstudy;
  data.from = isEmpty(data.from) ? "" : data.from;
  //data.current = isEmpty(data.current) ? "" : data.current;

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }
  if (validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "field of study field is required";
  }

  // console.log("eduction erros: " + JSON.stringify(errors));

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
