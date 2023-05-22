// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error, request, response, next) => {
  console.error(error);
  response.status(error.httpStatus).json({ message: error.message });
};

export default errorMiddleware;
