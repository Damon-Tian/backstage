export default {
    namespaced: true,
    state: {
        name: 'damon',
        age: 17,
    },

    mutation: {
        setName({ state }, value) {
            state.name = value
        },
    },
}
