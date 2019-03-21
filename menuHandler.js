const $ = require('jquery');
const {remote} = require('electron');

var win = remote.getCurrentWindow();

$('#red').click(function() {
    win.close();
});


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }