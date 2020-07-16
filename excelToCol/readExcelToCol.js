const fs = require('fs')
const Xlsx = require('node-xlsx')
let list = Xlsx.parse("excelDemo.xlsx");
// 遍历sheet，生成cols
let sheetToCols = function(name, data) {
    let Array = [];
    for (const item of data) {
        let tempArr = [];
        item.forEach((itemTemp) => {
            let tempObj = {};
            let temp = itemTemp.split(',');
            tempObj.title = temp[0];
            tempObj.field = temp[1];
            tempObj.rowspan = Number(temp[2]);
            tempObj.colspan = Number(temp[3]);
            tempObj.width = Number(temp[4]);
            tempArr.push(tempObj);
        })
        Array.push(tempArr);
    }
    fs.writeFileSync("cols/" + name + '.json', JSON.stringify(Array), (err) => {
        if (err) throw err;
        console.log('文件已被保存');
    });
};
// 遍历list，拿到sheet
list.forEach((item) => {
    sheetToCols(item.name, item.data);
});