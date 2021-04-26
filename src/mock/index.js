const { api, delay, mock, resp } = require('apite')
// JSON
api.get('/login', { status_code: 100, data: 'success' })

// POST
api.post('/post', (ctx) => {
    return mock({
        id: '@id',
        number: '@int(5,9)',
        name: '@name',
        cname: '@cname',
        date: '@dateTime',
        reg: /\w{10}/,
    })
    // console.log(ctx)
    // ctx.body = ctx.post
})

api.get('/routes', {
    status_code: 100,
    data: {
        routes: [
            {
                path: '/',
                name: 'basic',
                component: 'BasicLayout',
                redirect: '',
                children: [
                    {
                        path: '',
                        name: '首页',
                        component: 'Home',
                    },
                    {
                        path: '/one',
                        name: '组件相关',
                        component: 'One',
                        redirect: '/one/two',
                        children: [
                            {
                                path: '/one/two',
                                name: '什么都没有',
                                component: 'Two',
                            },
                            {
                                path: '/one/three',
                                name: '自定义组件',
                                component: 'Three',
                                redirect: '/one/three/four',
                                children: [
                                    {
                                        name: '表单',
                                        component: 'Four',
                                        path: '/one/three/four',
                                    },
                                    {
                                        name: '表格',
                                        component: 'Five',
                                        path: '/one/three/five',
                                    },
                                    {
                                        name: '页面',
                                        component: 'Six',
                                        path: '/one/three/six',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
})
