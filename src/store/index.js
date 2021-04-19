import { createStore } from 'vuex'
import user from './modules/user'
import routes from './modules/routes'
import bread from './modules/bread'
const store = createStore({
    modules: {
        user,
        routes,
        bread
    }
})

export default store
