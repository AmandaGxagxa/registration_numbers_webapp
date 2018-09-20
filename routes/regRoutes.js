module.exports = function (services) {
    
    
}

let getReg = req.body.names;
  if (getReg === "" || getReg === undefined){
    req.flash('info', 'Please enter a valid registration number')
  }
  else{

  }
let addRegNum = registrations.addRegNumber(getReg);

res.render('home', {addRegNum})
  
  