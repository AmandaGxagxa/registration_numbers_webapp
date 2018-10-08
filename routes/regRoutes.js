// const Registration = require('../services/regServices');
module.exports = function (regServices) {

  async function toHomePage(req, res, next) {
    try {
      let display = await regServices.numberPlates();
      // console.log(display)

      res.render('home', {
        display
      })
    } catch (error) {
      next(error.stack)
    }
  }
  async function resert(req, res) {
    await regServices.reset();
    res.redirect('/');
  }
  async function insertFunc(req, res, next) {
    try {
          let getReg = req.body.names;

          if (getReg == "" || getReg == undefined) {
            console.log("sdmfewin");
            req.flash('info', 'Please enter a valid registration number!');
            return res.redirect('/');
          }

          let split = getReg.split(" ");
          let holdInit = split[0];
          holdInit = holdInit.trim().toUpperCase();

          let addinitial = await regServices.getTown(holdInit);
          
          if (addinitial.length > 0) {
                  let addplates = await regServices.addPlates(getReg, addinitial[0].id);
                  let display = await regServices.numberPlates();
                  res.render('home', {
                    addinitial,
                    display
                  })
              //  }

          } else {
            req.flash('info', 'the registration is not valid , please enter a registration that starts wih CA, CL, CAW, CK, CJ & CY');
            res.redirect('/');
          }

    } catch (error) {
      next(error)
    }
  }

  async function filter(req, res, next) {
    try {
      let townFilter = req.params.filtered;
      let display = await regServices.filterByTown(townFilter);
      // console.log(display)
      res.render('home', {
        display
      })

    } catch (err) {
      next(err);
    }
  }


  return {
    toHomePage,
    insertFunc,
    filter,
    resert
  }

}