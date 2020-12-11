module.exports = text => {

    let languagesNgrams = {
        en: [
            " you ", " i ", " to ", " the ", " a ", " and ", " that ", " it ", " of ", " me ",
            " what ", " is ", " in ", " this ", " know ", " m ", " for ", " no ", " have ", " my ",
            " t ", " just ", " not ", " do ", " be ", " on ", " your ", " was ", " we ", " s ",
            "the", "and", "ing", "ent", "ion", "her", "for", "tha", "nth", "int", "yeet", "lol", "ey", "ck"
        ],
        es: [
            ' que ', ' de ', ' no ', ' a ', ' la ', ' el ', ' es ', ' y ', ' en ', ' lo ',
            ' un ', ' por ', ' me ', ' una ', ' te ', ' los ', ' se ', ' con ', ' para ', ' mi ',
            ' esta ', ' si ', ' bien ', ' pero ', ' yo ', ' eso ', ' las ', ' si ', ' su ', ' tu ',
            'del', 'que', 'ent', 'ion', 'ela', 'con', 'sde', 'ade', 'cio', 'nte'
        ],
        fr: [
            ' je ', ' de ', ' est ', ' pas ', ' le ', ' vous ', ' la ', ' tu ', ' que ', ' un ',
            ' il ', ' et ', ' a ', ' ne ', ' les ', ' ce ', ' en ', ' on ', ' ca ', ' une ',
            ' ai ', ' pour ', ' des ', ' moi ', ' qui ', ' nous ', ' y ', ' mais ', ' me ', ' dans ',
            'ent', 'les', 'ion', 'des', 'ede', 'que', 'est', 'tio', 'ant', 'par'
        ],
        pt: [
            ' que ', ' nao ', ' de ', ' um ', ' para ', ' eu ', ' se ', ' me ', ' uma ', ' esta ',
            ' com ', ' do ', ' por ', ' te ', ' os ', ' bem ', ' em ', ' ele ', ' isso ', ' mas ',
            ' da ', ' como ', ' no ', ' sim ', ' as ', ' mais ', ' na ', ' meu ', ' você ', ' aqui ',
            'que', 'ent', 'com', 'nte', 'est', 'ava', 'ndo', 'ado', 'ara', 'par'
        ]
    };

    // lower the text case
    text = text.toLowerCase();
    // get rid of non-alphanumeric characters
    text = text.replace(/[^\w\s]|_/g, " ");
    // add a space to the beginning and end
    text = ` ${text} `;
    // get rid of duplicate spaces
    text = text.replace(/\s+/g, " ");

    let textLanguageCode,
        textLanguageProbability = 0,
        textLength = text.length;

    // find the occurence ratio for each trigramm of each language
    for (let language in languagesNgrams) {
        let iMax = languagesNgrams[language].length;
        trigramsTotalRatio = 0;

        for (let i = 0; i < iMax; i++) {
            let regexString = languagesNgrams[language][i].replace(/\s/g, "\\s");
            let regex = new RegExp(regexString, "g");
            trigramsTotalRatio += languagesNgrams[language][i].length * (text.match(regex) || []).length / textLength;
        }

        if (trigramsTotalRatio > textLanguageProbability) {
            textLanguageCode = language;
            textLanguageProbability = trigramsTotalRatio;
        }
    }

    return textLanguageCode || false;

}