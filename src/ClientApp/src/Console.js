const Console = (...args) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  // Log all provided arguments so multiple objects are printed.
  console.log(...args);
};

export default Console;
