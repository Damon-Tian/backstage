import DarkTheme from './dark'
import LightTheme from './light'

function getStorage(key) {
    return localStorage.getItem(key)
}
function setStorage(key, value) {
    return localStorage.setItem(key, value)
}
export const setTheme = (theme = getStorage('theme')) => {
    if (document && theme === 'dark') {
        for (let t in DarkTheme) {
            document.body.style.setProperty(t, DarkTheme[t])
        }
    } else if (document) {
        for (let t in DarkTheme) {
            document.body.style.setProperty(t, LightTheme[t])
        }
    }
    setStorage('theme', theme)
}
