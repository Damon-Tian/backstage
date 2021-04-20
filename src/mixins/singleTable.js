export default {
    data() {
        return {
            defineTableOptions: {
                pagination: {
                    pageSize: 10,
                    pageSizes: [1, 2, 5, 40, 50],
                    total: 10,
                    currentPage: 1,
                    layout: 'prev, pager, next',
                    background: true,
                    small: false,
                },
            },
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
            ],
            tableOptions: {},
        }
    },
    created() {
        this.tableOptions = Object.assign({}, this.tableData, this.defineTableOptions)
    },
    methods: {
        sizeChange(val) {
            let { pageSize } = this.tableOptions.pagination
            pageSize = val
        },
        prevClick() {},
        nextClick() {},
    },
}
