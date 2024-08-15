import { useEffect, useContext } from 'react'
import { AlertDialog } from 'react-onsenui'
import { AppContext, DBContext } from '../../context'

const ExitDialog = ({navigator}) => {
    
    const { exitDialog, setExitDialog, navigatorHandler } = useContext(AppContext) 
    const { getLang } = useContext(DBContext)
    
    useEffect(() => {
        navigatorHandler(navigator)
    }, [exitDialog, navigator, navigatorHandler])
    
    return (
        <AlertDialog isOpen={exitDialog} onCancel={()=>setExitDialog(false)} cancelable>
            <div class="alert-dialog-title">
                { getLang('exit_dialog_title') }
            </div>
            <div class="alert-dialog-content">
                { getLang('exit_dialog_message') }
            </div>
            <div class="alert-dialog-footer">
                <button onClick={()=>window.App.finish()} className="alert-dialog-button">{ getLang('dialog_yes_btn') }</button>
                <button onClick={()=>setExitDialog(false)} className="alert-dialog-button">{ getLang('dialog_no_btn') }</button>
                <button onClick={()=>{setExitDialog(false); window.App.rate()}} className="alert-dialog-button">{ getLang('dialog_rate_btn') }</button>
            </div>
        </AlertDialog>
    )
}

export default ExitDialog