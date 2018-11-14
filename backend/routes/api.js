const express = require('express');
const __nodeSass = require('node-sass');
const __extend = require('lodash/extend');
const path = require('path');

const router = express.Router();

/* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });

router.post('/compile/scss', function (req, res) {
  // SASS
  // check code
  if ( ! req.body.data) {
    res.status(500).json({
      error : 'Missing "data" argument'
    });
    return;
  }

  // options
  const options = __extend({
    data : req.body.data.code,
    outputStyle: 'compressed'
  }, req.body.options || {});
  // include paths
  options.includePaths = [
	  path.resolve(__dirname, '../node_modules/'),
    ];

  // compile using sass
  __nodeSass.render(options, (error, result) => {
    if ( ! error) {
      res.status(200).json({
        language : 'css',
        data : result.css.toString()
      });
    } else {
      res.status(500).json({
        error : error
      });
    }
  });
});

module.exports = router;
