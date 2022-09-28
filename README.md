# Currency filter
This script allow to get response from [nbrb.by API](https://www.nbrb.by/api/exrates/currencies)
and filter it as you want.

# How to use
To get all currencies run in current directory:

```
node index.js
```
You can filter currencies using the following fields:

```
{
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
}
```

If you want to use filter, use these properties as a command arguments in following format (Example for abbreviation):

```
node index.js --Cur_Abbreviation USD
```

You can specify as many keys as you need to filter:
```
node index.js --Cur_Abbreviation USD --Cur_Code 840
```

You can also specify homogeneous properties for multiple filtering:

```
node index.js --Cur_Abbreviation USD --Cur_Abbreviation CAD
```