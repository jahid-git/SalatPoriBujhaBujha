import { createContext, useContext } from 'react'
import { ConfigContext } from './ConfigContext'
import { languages, themes } from '../db'

let Context = null;
const { Provider } = Context = createContext()

const DBProvider = ({ children }) => {
    
    const { theme, lang } = useContext(ConfigContext)
    
    const getLang = key => {
        return languages[key][lang]
    }
    
    const getTheme = (key) => {
        return themes.filter((item)=>item.id === theme)[0][key]
    }
    
    return (
        <Provider value={{
            getLang, getTheme,
        }}>
        { children }
        </Provider>
    )
}

export { Context as DBContext, DBProvider }