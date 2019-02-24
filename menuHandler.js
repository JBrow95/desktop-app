const $ = require('jquery');
const {remote} = require('electron');

var win = remote.getCurrentWindow();

$('#red').click(function() {
    win.close();
});