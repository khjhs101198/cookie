function filter(inp) {
  let data = inp.replace(new RegExp("ct[0-9]*"), "");
  let dataArr = data.split("1");
  let result = {}
  let max = 0;
  let popular;
  for(let i=0 ;i<dataArr.length-1; i++) {
    if(result[dataArr[i]]) {
      result[dataArr[i]]++;
    }
    else {
      result[dataArr[i]] = 1;
    }
  }
  for(k in result) {
    if(result[k]>=max) {
      max = result[k];
      popular = k;
    }
  }
  return popular;
}

module.exports = filter;
