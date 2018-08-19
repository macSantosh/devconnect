const validator = require("validator");
//import isEmpty from "./stringUtils";
const isEmpty = require("./stringUtils");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;
  data.name = isEmpty(data.name) ? "" : data.name;
  //data.avatar = isEmpty(data.avatar) ? "" : data.avatar;

  if (validator.isEmpty(data.text)) {
    errors.text = "Post text field is required";
  } else if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
