//***********************
//****** Costanti *******
//***********************

var A_KEY = 65;
var S_KEY = 83;
var D_KEY = 68;
var Q_KEY = 81;
var E_KEY = 69;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var SPACEBAR = 32;
var P_KEY = 80;

var LEFT = -1;
var RIGHT = 1;

var PLAYGROUND_WIDTH = 10;
var PLAYGROUND_HEIGHT = 20;

var DECK_WIDTH = 4;
var DECK_HEIGHT = 2;

var CLOCK_INTERVAL = 1000;

//**********************************
//****** Funzioni di utilità *******
//**********************************

function mod (element, module)
{
    var result = element % module;
    return (result < 0) ? result + module : result;
}

function getCell (row, col , containerId)
{ 
    return document.getElementById('(' + containerId + ')' + 'row' + row + 'col' + col);
}