const mongooseErrorResponse = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(500).json({
      message: "Please fill all fields",
    });
  } else if (error.name === "CastError") {
    return res.status(500).json({
      message: "Invalid Article ID",
    });
  } else if (/duplicate/.test(error.message)) {
    return res.status(500).json({
      message: "Article already exists",
    });
  } else {
      return res.status(500).json({
        message: "Error occured, please try again",
      })
  }
};

module.exports = mongooseErrorResponse;
