const validatePassword = (rule, value, callback) => {
  if (value && value !== "Secret") {
    callback("Error!");
  } else {
    callback();
  }
};

export { validatePassword };
