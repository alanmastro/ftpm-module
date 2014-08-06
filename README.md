ftpm-module
===========

Porting of ftpm library can be used as a class within the nodejs.

## Example:

var ftpmModule = require('ftpm-module');

ftpmModule.getCssFont('Magra', false, true, function(type, msg) {console.log(type + ': ' + msg);});

===========
## Available methods:

### installOsFont(fontName, cb)
Download and install the fonts in ttf format inside the computer. Not available on windows.

fontName => The name of the font that you want to install.
cb		 => The callback function that will be executed at the end of the process.

### uninstallOsFont(fontName, cb)
Uninstalls the fonts installed on the computer. Not available on windows.

fontName => The name of the font that you want to uninstall.
cb       => The callback function that will be executed at the end of the process.

### listIntalledFonts()
Uninstalls the fonts installed on the computer.
Within the msg parameter of the callback function will be reported to all fonts installed separated by \n.

### downloadWebFont(fontName, fontPath, cb)
Download fonts in woff format within a specific folder.

fontName => The name of the font that you want to download.
fontPath => The path to the folder where you saved the font.
cb       => The callback function that will be executed at the end of the process.

### getCssFont(fontName, fontPath, cb)
Create your css code necessary to use the font on a web page. The font is expressed as google's font path.

fontName => The name of the font that you want to get the css structure.
fontPath => The path to the folder where you saved the css file.
cb       => The callback function that will be executed at the end of the process. Set to false if you want the value to be returned within the msg parameter of the callback function.

### getDataURI(fontName, fontPath, cb)
Create your css code necessary to use the font on a web page. The font is expressed as uri data.

fontName => The name of the font that you want to get the css structure.
fontPath => The path to the folder where you saved the css file.
cb       => The callback function that will be executed at the end of the process. Set to false if you want the value to be returned within the msg parameter of the callback function.

===========
## Possible values for the type variable within the callback function:

warn	=> There was a slight error in the execution of the method.
success	=> The method was successfully.
error	=> There was a serious error in the execution of the method.
info	=> The method was successful and were returned of information which must be processed.