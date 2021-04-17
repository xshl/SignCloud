export default {
    gradeData : [
        {
            id: 1,
            type: 0,    //菜单类型  0：目录 1：菜单 2：按钮
            icon: 'el-icon-setting',   //菜单图标
            title: '系统设置',  // 菜单标题
            path: 'system',    // 路由地址
            menuSort: 0,    // 菜单排序
            pid: 0,    // 上级类目
        },
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