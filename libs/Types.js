const join = (strings,...parts) => {
    var result='',parts_ln = parts.length;
    for (var i=0,ln=strings.length;i<ln;i++) {
        result += strings[i]
        if (i < parts_ln) {
            result += parts[i];
        }
    }
    return result;
}
module.exports = {
    int : {
        defaultValue : 0,
        setValue : (strings,...parts) => `${join(strings,...parts)}|0`,
        animateValue : (strings,...parts) => `${join(strings,...parts)}|0`
    },
    float : {
        defaultValue : 0.0,
        setValue : (strings,...parts) => `+${join(strings,...parts)}`,
        animateValue : (strings,...parts) => `+${join(strings,...parts)}`
    },
    string : {
        defaultValue : '',
        setValue : (strings,...parts) => `${join(strings,...parts)}`,
        animateValue : (strings,...parts) => `${join(strings,...parts)}`
    },
    object : {
        defaultValue : null,
        setValue : (strings,...parts) => `${join(strings,...parts)}`,
        animateValue : (strings,...parts) => `${join(strings,...parts)}`
    },
    array : {
        defaultValue : null,
        setValue : (strings,...parts) => `${join(strings,...parts)}`,
        animateValue : (strings,...parts) => `${join(strings,...parts)}`
    },
    any : {
        defaultValue : null,
        setValue : (strings,...parts) => `${join(strings,...parts)}`,
        animateValue : (strings,...parts) => `${join(strings,...parts)}`
    }
};
