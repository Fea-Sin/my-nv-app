let re = /quick\s(brown).+?(jumps)/dgi;
const str = "The Quick Brown Fox Jumps Over The Lazy Dog";
const result = re.exec(str);

export default result;
