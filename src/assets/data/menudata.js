export default {
    menuData : [
        {
            id: 1,
            name: "home",
            nameZh: "首页",
            path: "/home",
            iconCls: "el-icon-stopwatch",
            component: "",
        },
        {
            id: 2,
            name: "home",
            nameZh: "首页",
            path: "/home",
            iconCls: "el-icon-stopwatch",
            component: "",
        }
    ],
    setMenu() {
        window.localStorage.setItem("Menu", JSON.stringify(this.menuData));
    },
    getMenu() {
        const data = window.localStorage.getItem("Menu");
        return JSON.parse(data);
    },
    addMenu(value) {
        const data = JSON.parse(window.localStorage.getItem("Menu"));
        data.push(value);
        window.localStorage.setItem("Menu", JSON.stringify(data));
    },
    editMenu(value) {
        const data = JSON.parse(window.localStorage.getItem("Menu"));
        for (const val of data) {
            if(val.id == value.id) {
                val = value;
            }
        }
        window.localStorage.setItem("Menu", JSON.stringify(data));
    },
    deleteMenu(value) {
        const data = JSON.parse(window.localStorage.getItem("Menu"));
        for (let i = 0; i < data.length; i++) {
            if(data.id == value.id) {
               data.splice(i,1); 
            }
        }
        window.localStorage.setItem("Menu", JSON.stringify(data));
    }
}