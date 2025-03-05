"useClient"

export function checkValidColor(color:string) {
    var e = document.getElementById('divValidColor');
    if (!e) {
        e = document.createElement('div');
        e.id = 'divValidColor';
    }
    e.style.borderColor = '';
    e.style.borderColor = color;
    var tmpcolor = e.style.borderColor;
    if (tmpcolor.length == 0) {
        return false;
    }
    return true;
}

