var request = require('request');
var fs = require('fs');
var chalk = require('chalk');

var API_PATH = 'https://raw.githubusercontent.com/:owner/:repo/master/:path';
var USER = 'erickzanardo';
var REPO = 'ignorer';

var assemblyUrl = function(filePath) {
  return API_PATH
          .replace(':owner', USER)
          .replace(':repo', REPO)
          .replace(':path', ['ignorers/', filePath, '.txt'].join(''));
}

module.exports = function(file, path) {
  var url = assemblyUrl(file);
  request(url, function(err, response, body) {
    if (err) throw err;
    if (body == 'Not Found') {
      console.log(chalk.red('Cannot find ' + file));
    } else {
      var fullpath = [path, '.gitignore'].join('/');
      fs.appendFile(fullpath, body, 'utf8', function(err) {
        if (err) throw err;
        console.log(chalk.green('.gitignore created at ' + fullpath));
        console.log(chalk.green('with contents: '));
        console.log(chalk.blue(body));
      });
    }
  });
};
