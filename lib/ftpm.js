require('./utils/string');

var fs           	= require('fs'),
    EventEmitter 	= require('events').EventEmitter,
    _            	= require('lodash'),
	existsSync  	= require('fs').existsSync || require('path').existsSync,
    ftpm         	= new EventEmitter(),
    fontDriver		= './driver/';
	
ftpm = _.extend(ftpm, {
    platform: 	process.platform,
    file: 		require('./utils/file'),
    path: 		require('./utils/path'),
	callbackFunction: function(type, msg) {},
	outputPath: false,
	showContent:false
});

ftpm.on('successCallback', function(cb, result) {
    cb(null, result);
});

ftpm.on('writeFile', function(path, css, cb) {
    var self = this;

    this.file.writeFile(path, css, 'utf-8', function(err) {
        self.emit('validateFile', err, cb, path);
    });
});

ftpm.on('writeRemoteFile', function(url, path, cb) {
    var self = this;
	if (url) {
		this.file.getRemoteFile(url, path, function(err, data) {
			self.emit('validateFile', err, cb, path);
		});
	}
});

ftpm.on('validateFile', function(err, cb, result) {
    if (err) 
		this.emit('exitMessage', 'error', err);
    else
		this.emit('successCallback', cb, result);
});

ftpm.on('exitMessage', function(type, msg) {
    ftpm.callbackFunction(type, msg);
});

ftpm.on('osfont', function(action, fontName) {
    if (this.platform === 'win32') {
		this.emit('exitMessage', 'warn', action  + ' is not available for Windows');
    } else {
		fontDriver[action](fontName, function(err, results) {
			if (err) {
				ftpm.emit('exitMessage', 'error', err);
			} else {
				if(fontName) {
					ftpm.emit('exitMessage', 'success', fontName + ' Font was successfully ' + action + 'ed');
				} else if(results) {
					ftpm.emit('exitMessage', 'success', results);
				}
			}
		});
	}
});

ftpm.on('webfont', function(action, fontName) {
    fontDriver.download(fontName, ftpm.outputPath, function(err, output){
        if (err) ftpm.emit('exitMessage', 'error', err);
        ftpm.emit('exitMessage', 'success', 'new webfont: ' + output);
    });

});

ftpm.on('cssfont', function(action, fontName) {
    var methods = {
            css: [ 'downloadCSS' , 'show' ],
            datauri: [ 'downloadDataUrl' , 'showDataUrl' ]
        };

    if ( !ftpm.showContent ) {
        fontDriver[methods[action][0]](fontName, ftpm.outputPath, function(err, result) {
            if (err) {
				ftpm.emit( 'exitMessage', 'error', err );
			} else {
				ftpm.emit( 'exitMessage', 'success', action + ' file created: ' + result);
			}
        });
    } else {
        fontDriver[methods[action][1]](fontName, function(err, result) {
            if (err) {
				ftpm.emit('exitMessage', 'error', err);
			} else {
				ftpm.emit('exitMessage', 'success', result);
			}
        });
    }

});

ftpm.on('runDriver', function( driverName , action , fontName ) {

    fontDriver = require( fontDriver + driverName );
    this.emit( driverName , action , fontName );

});

module.exports = ftpm;