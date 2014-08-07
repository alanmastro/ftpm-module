var ftpm = require('./lib/ftpm');

var ftpmModule = {
	installOsFont: function(fontName, cb) {
		ftpm.callbackLink = cb;
		ftpm.emit('runDriver', 'osfont', 'install', fontName);
	},
	uninstallOsFont: function(fontName, cb) {
		fontName = fontName.toTitleCase();
        ftpm.callbackAlreadyFired = false;
		ftpm.callbackLink = cb;
		if (existsSync(ftpm.path.getFontPath(ftpm.platform) + fontName.removeSpaces() + '.ftpm.ttf')) {
			ftpm.emit('runDriver', 'osfont', 'uninstall', fontName);
		}
	},
	listIntalledFonts: function(cb) {
        ftpm.callbackAlreadyFired = false;
		ftpm.callbackLink = cb;
		ftpm.emit('runDriver', 'osfont', 'local', '');
	},
	downloadWebFont: function(fontName, fontPath, cb) {
        ftpm.callbackAlreadyFired = false;
		ftpm.callbackLink = cb;
		ftpm.outputPath = fontPath;
		ftpm.emit('runDriver', 'webfont', 'web', fontName);
	},
	getCssFont: function(fontName, fontPath, cb) {
        ftpm.callbackAlreadyFired = false;
		ftpm.callbackLink = cb;
		ftpm.outputPath = fontPath;
		ftpm.showContent = (!fontPath) ? true : false;
		ftpm.emit('runDriver', 'cssfont', 'css', fontName);
	},
	getDataURI: function(fontName, fontPath, cb) {
        ftpm.callbackAlreadyFired = false;
		ftpm.callbackLink = cb;
		ftpm.outputPath = fontPath;
		ftpm.showContent = (!fontPath) ? true : false;
		ftpm.emit('runDriver', 'cssfont', 'datauri', fontName);
	}
};

module.exports = ftpmModule;