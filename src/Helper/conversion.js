export default Conversion = s => {
    const string = JSON.stringify(s);
    const n = parseInt(string);
    return n;
  };