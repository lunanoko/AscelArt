var path = require('path');
var minimist = require('minimist');
var settings = require('./settings');

var minimistOptions = {
  default: {s: 1},
  string: ['o', 'i']
};

function configure(proc) {
  var argv = minimist(proc.argv.slice(2), minimistOptions);

  // Set the input file.
  if (!argv.i || argv.i === "") {
    console.error("No input file given. Use -i <file>");
    proc.exit(1);
  }
  else {
    settings.inFile = path.isAbsolute(argv.i) ? argv.i : path.resolve(argv.i);
  }

  // Set the output file.
  if (!argv.o || argv.o === "") {
    console.error("No output file given. Use -o <file>");
    proc.exit(1);
  }
  else {
    settings.outFile = path.isAbsolute(argv.o) ? argv.o : path.resolve(argv.o);
  }

  // Set the document scaling.
  settings.scale = parseInt(argv.s);
}

module.exports = configure;