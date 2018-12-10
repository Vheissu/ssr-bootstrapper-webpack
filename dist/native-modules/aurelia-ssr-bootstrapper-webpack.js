import { Aurelia } from 'aurelia-framework';
import { WebpackLoader } from 'aurelia-loader-webpack';
import { DirtyCheckProperty } from 'aurelia-binding';
// disable the dirty checker
// otherwise the setTimeout of the dirty checker
// prevents nodejs from garbage collecting the app
DirtyCheckProperty.prototype.subscribe = function () { };
// https://github.com/angular/angular-cli/issues/8412
// https://github.com/ag-grid/ag-grid-react/issues/24
global.Element = typeof Element === 'undefined' ? function () { } : Element;
global.HTMLElement = typeof HTMLElement === 'undefined' ? function () { } : HTMLElement;
global.HTMLSelectElement = typeof HTMLSelectElement === 'undefined' ? function () { } : HTMLSelectElement;
var palNodeJS = require('aurelia-pal-nodejs');
var pal = require('aurelia-pal');
function initialize() {
    var initialize = palNodeJS.initialize;
    var PLATFORM = pal.PLATFORM;
    initialize();
    // expose anything the ssr-engine needs
    return {
        PLATFORM: PLATFORM,
    };
}
function start(configure, headers) {
    var aurelia = new Aurelia(new WebpackLoader());
    aurelia.host = pal.DOM.querySelectorAll('body')[0];
    var attribute = pal.DOM.createAttribute('aurelia-app');
    attribute.value = 'main';
    aurelia.host.attributes.setNamedItem(attribute);
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({ aurelia: aurelia, pal: pal, palNodeJS: palNodeJS, stop: stop });
        }, 20);
        return configure(aurelia, headers);
    });
}
function stop() {
    require('aurelia-pal').reset();
    require('aurelia-pal-nodejs').reset(pal.DOM.global.window);
}
export default function (configure) {
    return {
        initialize: initialize,
        stop: stop,
        start: function (headers) {
            return start(configure, headers);
        }
    };
}
;
