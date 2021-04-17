export default {
    dictData : [
        {
            id: 0,
            name: '性别', // 中文标识
            englishName: 'sex',  // 英文标识
            description: '',  // 具体描述
            sort: 999,  // 排序
            dictDetails: [{
                id: 0,
                label: '男', // 文本
                value: 0, // 值
                dictSort: 999,   // 排序
                default: 0,
            },{
                id: 1,
                label: '女',
                value: 1,
                dictSort: 999, 
                default: 0,
            },{
                id: 2,
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
    getDictDetail(name) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (const val of data) {
            if (val.name == name) {
                return val.dictDetails;
            }
        }
    },
    addDict(value) {
        console.log('value', value)
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        data.push(value);
        console.log(JSON.stringify(data))
        window.localStorage.setItem("Dict", JSON.stringify(data));
    },
    addDictDetail(name, value) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == name) {
                console.log('oldDictDetails', data[i].dictDetails)
                data[i].dictDetails.push(value);
            }
        }
        window.localStorage.setItem("Dict", JSON.stringify(data));
    },
    editDict(value) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == value.name) {
                // console.log('val', val)
                data[i] = value;
            }
        }
        window.localStorage.setItem("Dict", JSON.stringify(data));
    },
    editDictDetail(name, value) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == name) {
                console.log('dict', data[i])
                for (let j = 0; j < data[i].dictDetails.length; j++) {
                    if(data[i].dictDetails[j].label == value.label) {
                        console.log('dictDetail', data[i].dictDetails[j])
                        console.log('value', value)
                        data[i].dictDetails[j] = value
                    }
                }
            }
        }
        window.localStorage.setItem("Dict", JSON.stringify(data));
    },
    deleteDict(ids) {
        console.log('ids', ids)
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (let j = 0; j < ids.length; j++) {
            for (let i = 0; i < data.length; i++) {
                if(data[i].id == ids[j]) {
                    data.splice(i,1); 
                }
            }
        }
        window.localStorage.setItem("Dict", JSON.stringify(data));
    },
    deleteDictDetail(name, ids) {
        const data = JSON.parse(window.localStorage.getItem("Dict"));
        for (let k = 0; k < ids.length; k++) {
            for (let i = 0; i < data.length; i++) {
                if(data[i].name == name) {
                    for (let j = 0; j < data[i].dictDetails.length; j++) {
                        if(data[i].dictDetails[j].id == ids[k]) {
                        data[i].dictDetails.splice(j,1); 
                        }
                    }
                }
            }
        }
        window.localStorage.setItem("Dict", JSON.stringify(data));
    }
}