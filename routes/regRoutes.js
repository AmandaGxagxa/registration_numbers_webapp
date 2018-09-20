
// const Registration = require('../services/regServices');
module.exports = function (regServices) {

async function toHomePage(req, res, next){
  try {
    let display = await regServices.numberPlates();
    console.log(display)

    res.render('home',{display})
  } catch (error) {
    next(error.stack)
  }
}
async function insertFunc(req, res, next){
  try {
    let getReg = req.body.names;

    if (getReg === "" || getReg === undefined){
      req.flash('info', 'Please enter a valid registration number!');
      res.redirect('/');
    }
    else{
      let split = getReg.split(" ");
      let holdInit = split[0];
      let addinitial = await regServices.getTown(holdInit);
      if(addinitial.length == 0){
        req.flash('info', 'Please enter a valid registration number!');
      }else {
        let addplates = await regServices.addPlates(getReg, addinitial[0].id);
      let display = await regServices.numberPlates();
      console.log(addinitial)
      res.render('home', {addinitial,display})
      }
      
      }
    }
    catch (error) {
    next(error)
  }
}

  // let getReg = req.body.names;

  

  return{
    toHomePage,
    insertFunc
  }
  
}


  