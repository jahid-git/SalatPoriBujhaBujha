import { useEffect, useContext } from 'react'
import { AlertDialog, List, ListItem, Range } from 'react-onsenui'
import { AppContext, ConfigContext } from '../../context'
import { themes, animations, fontsBn, fontsEn, fontsAr, langs } from '../../db'

const SettingsDialog = ({navigator}) => {
    
    const { settingsDialog, setSettingsDialog, navigatorHandler } = useContext(AppContext)
    
    const { theme, animation,
        fontSize, setFontSize,
        fontBn, fontEn, fontAr, lang,
        handleSettingsExpand, renderSettingsOps, getLang } = useContext(ConfigContext)
        
    useEffect(() => {
        navigatorHandler(navigator)
    }, [settingsDialog, navigator, navigatorHandler])
    
    return (
        <AlertDialog isOpen={settingsDialog} onCancel={()=>setSettingsDialog(false)} cancelable>
            <div class="alert-dialog-title settings-dialog-title"></div>
            <div class="alert-dialog-content settings-dialog-content">
                <List>
                    { renderSettingsOps("settings_theme_title", "theme", theme, themes) }
                    { renderSettingsOps("settings_animation_title", "animation", animation, animations) }
                </List>
                <hr/>
                <List>
                    <ListItem onExpand={handleSettingsExpand} className="settings-opts" expandable>
                        <b>{ getLang('settings_font_size_title') }</b>
                        <span className='hints'>(<span style={{"fontSize": parseInt(fontSize)+"px"}}>{ fontSize }px</span>)</span>
                        <div className="expandable-content">
                            <Range onInput={(event)=>setFontSize(event.target.value)} onChange={(event)=>window.App.setPrefs('fontSize', event.target.value)} value={parseInt(fontSize)} min={10} max={30} style={{"width": "100%"}} />
                        </div>
                    </ListItem>
                    { renderSettingsOps("settings_font_title", "font", lang === 'bn' ? fontBn : fontEn, lang === 'bn' ? fontsBn : fontsEn) }
                    { renderSettingsOps("settings_font_ar_title", "fontAr", fontAr, fontsAr) }
                </List>
                <hr/>
                <List>
                    { renderSettingsOps("settings_language_title", "lang", lang, langs) }
                </List>
            </div>
            <div class="alert-dialog-footer">
                <button onClick={()=>setSettingsDialog(false)} className="alert-dialog-button">{ getLang('dialog_close_btn') }</button>
            </div>
        </AlertDialog>
    )
}

export default SettingsDialog