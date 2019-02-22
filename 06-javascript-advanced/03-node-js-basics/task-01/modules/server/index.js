const fs = require('fs');
var walkSync = function(dir, files_=[]) {
    let files = fs.readdirSync(dir);
    for (let i in files) {
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            walkSync(name, files_);
        } else {
            files_.push(name.replace(/\.\/content\//i, ''));
        }
    }
    return files_;
};
module.exports.walkSync = walkSync;
