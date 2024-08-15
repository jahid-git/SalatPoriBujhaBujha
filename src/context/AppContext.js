import { useState, createContext } from 'react'

let Context = null;
const { Provider } = Context = createContext()

const AppProvider = ({ children }) => {
    
    const [exitDialog, setExitDialog] = useState(false)
    const [settingsDialog, setSettingsDialog] = useState(false)
    
    const navigatorHandler = navigator => {
        if(settingsDialog) {
            window.onBackPressed = () => setSettingsDialog(false)
        } else if(navigator.pages.length > 1){
            window.onBackPressed = () => navigator.popPage()
        } else if(exitDialog) {
            window.onBackPressed = () => setExitDialog(false)
        } else {
            window.onBackPressed = () => setExitDialog(true)
        }
    }
    
    return (
        <Provider value={{
            navigatorHandler,
            exitDialog, setExitDialog,
            settingsDialog, setSettingsDialog
        }}>
        { children }
        </Provider>
    )
}

export { Context as AppContext, AppProvider }