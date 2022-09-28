const https = require('https');
const fs = require('fs');

const filterKeys = require('minimist')(process.argv.slice(2));
delete filterKeys['_'];

let currencies = {};
let currency = {
    Cur_ID: '',
    Cur_ParentID: '',
    Cur_Code: '',
    Cur_Abbreviation: '',
    Cur_Name: '',
    Cur_Name_Bel: '',
    Cur_Name_Eng: '',
    Cur_QuotName: '',
    Cur_QuotName_Bel: '',
    Cur_QuotName_Eng: '',
    Cur_NameMulti: '',
    Cur_Name_BelMulti: '',
    Cur_Name_EngMulti: '',
    Cur_Scale: '',
    Cur_Periodicity: '',
    Cur_DateStart: '',
    Cur_DateEnd: ''
};

const requestOptions = {
    hostname: 'www.nbrb.by',
    port: 443,
    path: '/api/exrates/currencies',
    method: 'GET'
}

https.get(requestOptions, res => {
    let data = [];
    console.log('Status Code:', res.statusCode);

    res.on('data', chunk => {
        data.push(chunk);
    });

    res.on('end', () => {
        console.log('Response ended');
        currencies = JSON.parse(Buffer.concat(data).toString());

        fs.writeFile(
            __dirname + '/resultLena.json',
            JSON.stringify({
                currencies: filterCurrencies(filterKeys, currencies)
            }),
            err => {
                if (err) {
                    return console.error('error writing file');
                }
                console.log('wrote to file');
            });
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});

function filterCurrencies(filterKeys, arrayOfCurrencies) {
    if(!Object.keys(filterKeys).length) return arrayOfCurrencies;

    const resultArrayOfCurrencies = [];
    for(let i = 0; i < arrayOfCurrencies.length; i++){
        for(let filterKey in filterKeys){
            if(Array.isArray(filterKeys[filterKey])){
                for(let j = 0; j < filterKeys[filterKey].length; j++){
                    if(arrayOfCurrencies[i][filterKey] === filterKeys[filterKey][j]){
                        if(!resultArrayOfCurrencies.includes(arrayOfCurrencies[i])){
                            resultArrayOfCurrencies.push(arrayOfCurrencies[i]);
                        }
                    }
                }
            }
            else {
                if(arrayOfCurrencies[i][filterKey] === filterKeys[filterKey]){
                    if(!resultArrayOfCurrencies.includes(arrayOfCurrencies[i])){
                        resultArrayOfCurrencies.push(arrayOfCurrencies[i]);
                    }
                }
            }
        }
    }
    return resultArrayOfCurrencies;
}

