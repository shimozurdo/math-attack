function stringToHex(colorString) {
    let colorHex = "0x" + colorString.substring(1);
    return colorHex;
}

export {
    stringToHex
}