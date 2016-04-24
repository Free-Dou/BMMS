var tempcolor;
function eB_onMouseOver(obj){
obj.style.cursor='default';
tempcolor=obj.style.backgroundColor;
obj.style.backgroundColor=parent.eB_MenuSelColor;
}
function eB_onMouseUp(obj){
}
function eB_onMouseDown(obj){
}
function eB_onMouseOut(obj){
obj.style.backgroundColor=tempcolor;
}