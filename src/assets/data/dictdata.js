export default {
    dictData : [
        {
            id: 1,
            name: '性别', // 中文标识
            englishName: 'sex',  // 英文标识
            description: '',  // 具体描述
            sort: 999,  // 排序
            dictDetails: [{
                id: 1,
                label: '男', // 文本
                value: 0, // 值
                dictSort: 999,   // 排序
                default: 0,
            },{
                id: 2,
                label: '女',
                value: 1,
                dictSort: 999, 
                default: 0,
            },{
                id: 3,
                label: '未知', 
                value: 2,
                dictSort: 999, 
                default: 1,
            }]
        },
    ],
    setDict() {
        window.localStorage.setItem("Dict", JSON.stringify(this.dictData));
    },
    getDict() {
        const data = window.localStorage.getItem("Dict");
        return JSON.parse(data);
    },
    addDict(value) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        data.push(value);
        window.localStorage.setItem("Dict", JSON.stringify(data));
    },
    editDict(value) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (const val of data) {
            if(val.id == value.id) {
                val = value;
            }
        }
        window.localStorage.setItem("Dict", JSON.stringify(data));
    },
    deleteDict(value) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (let i = 0; i < data.length; i++) {
            if(data.id == value.id) {
               data.splice(i,1); 
            }
        }
        window.localStorage.setItem("Dict", JSON.stringify(data));
    }
}