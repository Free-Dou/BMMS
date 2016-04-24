var hexch = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
function ToHex(n){
var h, l;
n = Math.round(n);
if(n > 255)n = 255;
l = n % 16;
h = Math.floor((n / 16)) % 16;
return (hexch[h] + hexch[l]);
}
function eB_GetHiColor(c){
var r, g, b;
r = '0x' + c.substr(1, 2);
g = '0x' + c.substr(3, 2);
b = '0x' + c.substr(5, 2);
return '#' + ToHex(256 - (256 - r) / 3) + ToHex(256 - (256 - g) / 3) + ToHex(256 - (256 - b) / 3);
}
function eB_GetLoColor(c){
var r, g, b;
r = '0x' + c.substr(1, 2);
g = '0x' + c.substr(3, 2);
b = '0x' + c.substr(5, 2);
return '#' + ToHex(r * 2 / 3) + ToHex(g * 2 / 3) + ToHex(b * 2 / 3);
}
function eB_onMouseOver(obj){
obj.style.cursor='default';
obj.style.borderTopColor=obj.style.borderLeftColor=eB_GetHiColor(parent.eB_MenuBgColor);
obj.style.borderRightColor=obj.style.borderBottomColor=eB_GetLoColor(parent.eB_MenuBgColor);
}
function eB_onMouseUp(obj){
obj.style.cursor='default';
obj.style.borderTopColor=obj.style.borderLeftColor=eB_GetHiColor(parent.eB_MenuBgColor);
obj.style.borderRightColor=obj.style.borderBottomColor=eB_GetLoColor(parent.eB_MenuBgColor);
}
function eB_onMouseDown(obj){
obj.style.cursor='default';
obj.style.borderTopColor=obj.style.borderLeftColor=eB_GetLoColor(parent.eB_MenuBgColor);
obj.style.borderRightColor=obj.style.borderBottomColor=eB_GetHiColor(parent.eB_MenuBgColor);
}
function eB_onMouseOut(obj){
obj.style.border='1px solid '+parent.eB_MenuBgColor;
}