var express = require('express');
var busdata = require('../database/busdata');

var router = express.Router();

// router.get('/', function (req, res, next) {
//   busdata.find({ bus_id: req.params.id }).populate('bus_id')
//     .then((busdatas) => {
//       console.log(busdatas);
//       res.json(s);
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// });

router.post('/', function (req, res, next) {
    console.log(req.body);
    const account = new Account({
        username: req.body.username,
        phone: req.body.phone,
        address: req.body.address,
        rank: req.body.rank,
        mileage: req.body.mileage,
  });
  account.save()
    .then((result) => {
        return  res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.put('/', function (req, res, next) {
    busdata.find({ bus_id: req.params.id }).populate('bus_id')
      .then((busdatas) => {
        console.log(busdatas);
        res.json(s);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
  router.patch('/', function (req, res, next) {
      console.log(req.headers);
    busdata.find({ bus_id: req.params.id }).populate('bus_id')
      .then((busdatas) => {
        console.log(busdatas);
        res.json(s);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
  router.delete('/', function (req, res, next) {
    console.log(req.headers);
  busdata.find({ username: req.body.username }).populate('bus_id')
    .then((busdatas) => {
      console.log(busdatas);
      res.json(s);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


module.exports = router;