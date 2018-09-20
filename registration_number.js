module.exports = function Registration(registrationNumbers) {

  var regMap = registrationNumbers || {};
  var regNum = "";
  // var regNum;


  function addRegNumber(regNumber) {
    if (regNumber != '') {
        regNum = regNumber;
        if (regMap[regNum] === undefined) {
          for (var i = 0; i < regNumber.length; i++) {
            if (regNumber.startsWith('CA') || regNumber.startsWith('CY') || regNumber.startsWith('CL') || regNumber.startsWith('CK') || regNumber.startsWith('CJ') || regNumber.startsWith('CAW')) {
              regMap[regNumber] = 0;
              return true;
            }
          }
        }
        return false;

    }
  }

  function getRegNum() {
    return regNum;
  }

  function getRegMapKeys() {
    return regMap
  }

  function getMapArray() {
  return Object.keys(regMap);
  }

  function findFrom(filterFor) {

    var filteredList = [];

    if (filterFor !== 'All') {
      for (var regNumber in regMap) {
        if(regNumber.startsWith(filterFor)){

          filteredList.push(regNumber);
        }

      }
      return filteredList;
    }
    for (var regis in regMap){
      filteredList.push(regis);


    }
return filteredList;
  }
  return {
    addRegNumber,
    getRegMapKeys,
    getRegNum,
    findFrom,
    getMapArray
  };

}
