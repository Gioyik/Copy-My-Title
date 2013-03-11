const widgets = require("widget");
const clipboard = require("clipboard");
const self = require("self");
const tabs = require("tabs");

var format = function (pattern, items) {
    items = typeof items === 'object' ? items : Array.prototype.slice.call(arguments, 1);
    return pattern.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") {
            return "{";
        }
        if (m == "}}") {
            return "}";
        }
        return items[n];
    });

};
var widget = widgets.Widget({
    id:    "copymytitlecopyUrlW",
    label: "Copy My Title",
    contentURL: self.data.url("icon-copy.png"),
    onClick: function () {
        const tab = tabs.activeTab;
        clipboard.set(tab.title + " " + tab.url, "text");
        clipboard.set(format("<a href='{0}}'>{1}</a>", [tab.url, tab.title]), "html");
    }

});

exports.formats = format;
exports.widget  = widget;
