class Alphabet {
    constructor(size) {
        this._letters = [];
        this._lettersRemoved = {};
        for (let i = 0; i < size; i++) {
            let c = i + 65;
            const zCharCode = 90;
            if (c > zCharCode) {
                c = 944 + c - zCharCode;
            }            
            this._letters.push(c);
            this._lettersRemoved[String.fromCharCode(c)] = 0;
        }
    }

    returnLetter(letter) {
        if (isNaN(letter)) {
            letter = letter.charCodeAt(0);
        }
        this._letters.push(letter);
    }


    getFirstLetter() {
        this._letters.sort();
        return this._letters.shift();
    }
}

Alphabet.prototype.getLetter = function(i){
    let c = i + 65;
    const zCharCode = 90;
    if (c > zCharCode) {
        c = 944 + c - zCharCode;
    }
    return String.fromCharCode(c);    
}
