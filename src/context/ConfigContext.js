import { useState, createContext } from 'react'
import { List, ListItem, Radio } from 'react-onsenui'
import { languages } from '../db'

let Context = null;
const { Provider } = Context = createContext()

const ConfigProvider = ({ children }) => {
    const $$ = (selector) => document.querySelectorAll(selector);
    
    const [theme, setTheme] = useState(window.App.getPrefs('theme', 'default'))
    const [animation, setAnimation] = useState(window.App.getPrefs('animation', 'fade'))
    const [fontSize, setFontSize] = useState(window.App.getPrefs('fontSize', '19'))
    const [fontBn, setFontBn] = useState(window.App.getPrefs('fontBn', 'kalpurush'))
    const [fontEn, setFontEn] = useState(window.App.getPrefs('fontEn', 'times'))
    const [fontAr, setFontAr] = useState(window.App.getPrefs('fontAr', 'al_qalam'))
    const [lang, setLang] = useState(window.App.getPrefs('lang', 'bn'))
    
    const getLang = key => {
        return languages[key][lang]
    }
    
    const handleSettingsExpand = (event) => {
        let opts = $$('.settings-opts');
        if(typeof event === 'number'){
            for(let i=0;i < opts.length;i++){
                if(i === event){
                    opts[i].showExpansion()
                } else {
                    opts[i].hideExpansion()
                }
            }
        } else {
            for(let i=0;i < opts.length;i++){
                if(opts[i] !== event.target){
                    opts[i].hideExpansion()
                }
            }
        }
    }
    
    const handleSettingsRadioBtns = (item, name) => {
        window.App.setPrefs(name, item.id)
        switch (name) {
            case 'theme':
                setTheme(item.id)
                window.App.setTheme(item.colorPrimary, item.id === 'light')
                break;
            case 'animation':
                setAnimation(item.id)
                break;
            case 'font':
                if(lang === "bn"){
                    window.App.setPrefs("fontBn", item.id)
                    setFontBn(item.id)
                } else {
                    window.App.setPrefs("fontEn", item.id)
                    setFontEn(item.id)
                }
                break;
            case 'fontAr':
                setFontAr(item.id)
                break;
            case 'lang':
                setLang(item.id)
                break;
            default:
        }
    }
    
    const renderSettingsRow = (item, selected, name) => {
        return (<ListItem key={item.id+'-'+name} tappable>
            <label className='left'>
                <Radio
                    inputId={`settings-radio-${name + '-' + item.id}`}
                    checked={item.id === selected}
                    onChange={() => handleSettingsRadioBtns(item, name)} />
            </label>
            <label htmlFor={`settings-radio-${ name + '-' + item.id}`} className='center'>
                {item[lang]}
            </label>
        </ListItem>)
    }
    
    const getSettingsOpsName = (arrays, selected) => {
        let selectedArrs = arrays.filter((item)=> item.id === selected);
        if(selectedArrs[0] && selectedArrs[0][lang]) {
            return selectedArrs[0][lang]
        }
        return ''
    }
    
    const renderSettingsOps = (title, name, selected, arrays) => {
        
        return (
            <ListItem id={name} className="settings-opts" onExpand={handleSettingsExpand} expandable>
                <b>{ getLang(title) }</b>
                <span className='hints'>({ getSettingsOpsName(arrays, selected) })</span>
                <div className="expandable-content">
                    <List
                        dataSource={arrays}
                        renderRow={(item, key)=>renderSettingsRow(item, selected, name)} />
                </div>
            </ListItem>
        )
    }
    
    
    
    return (
        <Provider value={{
            theme, setTheme,
            animation, setAnimation,
            fontSize, setFontSize,
            fontBn, setFontBn,
            fontEn, setFontEn,
            fontAr, setFontAr,
            lang, setLang, getLang,
            handleSettingsExpand, 
            renderSettingsOps,
            getSettingsOpsName
        }}>
        { children }
        </Provider>
    )
}

export { Context as ConfigContext, ConfigProvider }