const S = require('string');

/**
 * Function: limitLine
 * This function is responsible for receive an array of strings
 * and a limit (default: 40) and return an array with this strings
 * limited by limit.
 * @array text
 * @int limit
 * @returns {Array}
 */
function limitLine(text, limit) {
    limit = typeof limit !== 'undefined' ? limit : 40;

    var residue = '';
    var result = [];

    for (var i = 0; i < text.length; i++) {
        if (residue == '') {
            result.push(text[i].substr(0, limit));
            if (text[i].length > limit) {
                residue = text[i].substr(limit);
            }
            continue;
        }

        if (residue != '' && residue.length > limit) {
            result.push(residue.substr(0, limit));
            residue = residue.substr(limit);
            continue;
        }

        if (residue != '') {
            if (residue.length + text[i].length > limit) {
                add = residue + text[i];
                result.push(add.substr(0, limit));
                residue = add.substr(limit);
            } else {
                result.push(residue + text[i]);
            }
            continue;
        }

        if (text[i].length > limit) {
            result.push(text[i].substr(0, limit));
            residue = text[i].substr(limit);
        }
    }

    return result
}

/**
 * Function: biggerThan40
 * This function receive an array of
 * strings and ensure that each element has a line bigger than 40.
 * @array text
 * @returns {Array}
 */
function biggerThan40(text) {
    var finalArray = [];

    for (var i = 0; i < text.length; i++) {
        if (text[i].length < 40) {
            finalArray.push(text[i] + ' ' + text[i+1]);
            i++;
        } else {
            finalArray.push(text[i]);
        }
    }

    return finalArray;
}

/**
 * This function receive a text and print it limiting the
 * amount of char on each line.
 * @string text
 */
function fixText(text) {
    var splitted = S(text).lines();
    var fixed = biggerThan40(splitted);


    var fixedText = limitLine(fixed);

    for (var i = 0; i < fixedText.length; i++) {
        console.log(fixedText[i]);
    }
}

module.exports.fixText = fixText;