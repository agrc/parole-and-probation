const Console = (data) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  console.log(data);
};

export default Console;
