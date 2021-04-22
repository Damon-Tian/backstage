# backstage

A whole process of a product should be

### D-Page

```javascript
option = {
    searchOption:{
        searchValue{
            //通过下面searchArray自动注入
        },
        searchArray:[
            {
                key:'name',
                type:'select',
                label:'姓名',
                placeholder:'',
                labelWidth:'',
                options:[
                    {label:'田',value:0},{label:'江',value:1}
                ]
            }
        ]
    },
    tableOption:{
        url:'getForm',//获取表格数据
        stripe:true||true,
        autoTableHeight:true,//table是否自动设置高度
        width:[
            //控制每一列的宽度
            {date:200},
            {name:200}
        ],
        sortable:[],//同上,每一列是否可排序，{date:true}
        columns:[
            //列名称
            {key:'name',label:'姓名'},
            {key:'age',label:'年龄'}
        ],
        sort: {
            order: 'descending',
            prop: () => {
                return this.dataEnums.prop
            },
        },
        table: {
            select: true,//表格允许选择
        },
        operationColumn: {
            //操作列属性
            show: true,
            width: 150,
            // fixed: 'right',
            operationArray: [
                {
                    label:'删除',
                    fn:function(){},
                    type:'danger',
                    plain:true
                }
            ], //操作按钮组
        },
        operationHead: [
            // 控制上方 类似 批量删除 按钮
            和上方opertionArray一样
        ],
        pagination: {
            pageSize: 10,
            pageSizes: [1, 2, 5, 40, 50],
            total: 0,
            currentPage: 1,
            layout: 'prev, pager, next,sizes',
            background: true,
            small: true,
            pagerCount: 5,
        },
    }
}
```
