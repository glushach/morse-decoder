const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    // write your solution here
    // input 00 10 10 10 10     00 00 00 00 10     0010111010     0010111010     0000111111 ********** 0000101111 0000111111 0000101110 0010111010 0000111010
    // output hello world

    // входную строку поделить на строки по 10 символов
    // подстроки перевести точки в тире. 10 означает точка (.), 11 означает тире (-).
        // таким образом подстроки еще нужно поделить на подстроки по 2 символа
        // если 00 - ничего не пишем
        // если 10 - записываем .
        // если 11 - записываем -
    // из точек тире получить буквы.
        //склеить внутренную подстроку, подставляем ее как ключ в объект MORSE_TABLE и достаем значение
        //склеивам значения в слова, не забывая о пробеле ********** между слов
    const upperSubstring = [];
    const lowerSubstring = [];

    for (let i = 0; i < expr.length;) {
        upperSubstring.push(expr.slice(i, i + 10));
        i += 10;
    }


    let inner = [] //техничекий массив
    for (let i = 0;  i < upperSubstring.length; i++) { //массив
        inner = [] //перед началом пербора строки очистить inner от результата перебора предыдущей строки
        for (let q = 0; q < upperSubstring[i].length;) { //переьирает каждую строку массива

            if (upperSubstring[i] !== '**********') {
                inner.push(upperSubstring[i].slice(q, q + 2));
            }

            q += 2;
        } //конец внутреннего массива


        // в конце перебора очередной строки запушить технический массив в lowerSubstring
        if (upperSubstring[i] === '**********') {
            lowerSubstring.push([' ']);
        } else {
            lowerSubstring.push(inner);
        }
    } //конец верхнего цикла

    // Переводим элементы внутреннего массива в точку либо тире
    let decoder = [];
    for (let i = 0; i < lowerSubstring.length; i++) { //перебор верхнего массива
        inner = [] //перед началом пербора строки очистить inner от результата перебора предыдущего массива
        for (let k = 0; k < lowerSubstring[i].length; k++) { //перебор внутреннего массива

            if (lowerSubstring[i][k].length > 1) {
                if (lowerSubstring[i][k] === '10') {
                    inner.push('.');
                } else if (lowerSubstring[i][k] === '11') {
                    inner.push('-')
                }
            }
        } //конец внутреннего массива


        // в конце перебора очередного внутреннего массива запушить технический массив в decoder
        if (lowerSubstring[i].length === 1) {
            decoder.push([' ']);
        } else {
            decoder.push(inner);
        }

    } // конец верхнего цикла цикла


    //из внутренних массивов сформировать строки
    decoder = decoder.map(item => item.join(''));


    let string = [];

    for (let i = 0; i < decoder.length; i++) {
        if (MORSE_TABLE.hasOwnProperty(decoder[i])) {
            string.push(MORSE_TABLE[decoder[i]]);
        } else {
            string.push(decoder[i]);
        }
    }

    return string.join('');



}

module.exports = {
    decode
}