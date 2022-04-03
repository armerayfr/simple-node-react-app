module.exports = {
  responseData: function (res, statusCode, values) {
    const data = {
      success: true,
      data: values,
    };

    // give respon as a data
    res.status(statusCode).send(data);
  },

  responseMessage: function (res, statusCode, message) {
    const data = {
      success: true,
      data: message,
    };

    // give respon as a message
    res.status(statusCode).send(data);
  },
};
