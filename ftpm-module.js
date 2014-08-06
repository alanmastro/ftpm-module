var ftpm = require('./lib/ftpm');

var ftpmModule = {
	installOsFont: function(fontName, cb) {
		ftpm.callbackFunction = cb;
		ftpm.emit('runDriver', 'osfont', 'install', fontName);
	},
	uninstallOsFont: function(fontName, cb) {
		fontName = fontName.toTitleCase();
		ftpm.callbackFunction = cb;
		if (existsSync(ftpm.path.getFontPath(ftpm.platform) + fontName.removeSpaces() + '.ftpm.ttf')) {
			ftpm.emit('runDriver', 'osfont', 'uninstall', fontName);
		}
	},
	listIntalledFonts: function(cb) {
		ftpm.callbackFunction = cb;
		ftpm.emit('runDriver', 'osfont', 'local', '');
	},
	downloadWebFont: function(fontName, fontPath, cb) {
		ftpm.callbackFunction = cb;
		ftpm.outputPath = fontPath;
		ftpm.emit('runDriver', 'webfont', 'web', fontName);
	},
	getCssFont: function(fontName, fontPath, onlyOutput, cb) {
		ftpm.callbackFunction = cb;
		ftpm.outputPath = fontPath;
		ftpm.showContent = onlyOutput;
		ftpm.emit('runDriver', 'cssfont', 'css', fontName);
	},
	getDataURI: function(fontName, fontPath, onlyOutput, cb) {
		ftpm.callbackFunction = cb;
		ftpm.outputPath = fontPath;
		ftpm.showContent = onlyOutput;
		ftpm.emit('runDriver', 'cssfont', 'datauri', fontName);
	}
};

module.exports = ftpmModule;

ftpmModule.getCssFont('Magra', false, true, function(type, msg) {console.log(type + ': ' + msg);});