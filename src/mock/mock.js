export default [
    {
        url: '/api/login',
        method: 'post',
        response: ({ body }) => {
            console.log('body', body)
            return {
                code: 0,
                message: 'ok',
                data: ['tom', 'jerry'],
            }
        },
    },
]
