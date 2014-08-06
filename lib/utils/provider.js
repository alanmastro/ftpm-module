/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var provider = {

    getFontStyle : function () {
        return (typeof this.css != 'undefined') ? this.css : '';
    },

    getFontFileUrl : function () {
        var style = this.getFontStyle();
        
		if (style != '') {
			var nodeStart = style.search('http://'),
				end = /\.(ttf|woff)/g,
				nodeEnd = style.search(end);

			return style.substring( nodeStart, nodeEnd + style.match(end)[0].length );
		} else {
			return false;
		}
    }
};

module.exports = provider;