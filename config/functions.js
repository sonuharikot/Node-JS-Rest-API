module.exports = {
    moveFile: function (oldPath, newPath) {
        return new Promise(function (fulfill, reject) {
            Fs.move(oldPath,newPath,function (err,res) {
                if (err){                    
                     reject(err);
                }else{
                 fulfill(1);
                }
            });
        });

    }
};

