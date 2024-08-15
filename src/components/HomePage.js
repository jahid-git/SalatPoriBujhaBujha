import { useContext } from 'react'
import { Page } from 'react-onsenui'
import { ExitDialog, SettingsDialog } from './dialogs'
import ListPage from './ListPage'
import ContentPage from './ContentPage'
import { AppContext, ConfigContext, DBContext } from '../context'
import { mainGridItems } from '../db'
import banner from './imgs/banner.png'
import bannerLight from './imgs/banner_light.png'

const HomePage = ({navigator}) => {
    
    const { setSettingsDialog } = useContext(AppContext)
    
    const { theme, fontBn, fontEn, lang, handleSettingsExpand } = useContext(ConfigContext)
    
    const { getLang, getTheme } = useContext(DBContext)
    
    const clickItems = (posi, id) => {
        if(id === 'settings'){
            setSettingsDialog(true)
            handleSettingsExpand(5)
        } else if(
            id === 'message' ||
            id === 'learn_quran' ||
            id === 'communication' ||
            id === 'arabic_words') {
            navigator.pushPage({Component: ContentPage, props: {posi: 0, id}})
        } else {
            navigator.pushPage({Component: ListPage, props: mainGridItems[posi]})
        }
        
    }
    
    return (
        <Page>
            <div style={{...getTheme('banner'), fontFamily:(lang==='bn' ? fontBn : fontEn)}} className='banner'>
                <img src={theme==='light' ? bannerLight : banner} alt='.'/>
                <i style={getTheme('banner')}>{ getLang('app_name') }</i>
            </div>
            
            <div className='grid-container' style={{...getTheme('listContainer'), fontFamily:(lang==='bn' ? fontBn : fontEn) }}>
                <div className='grid-view'>
                    {
                        mainGridItems.map((item, i) => (
                            <div onClick={()=>clickItems(i, item.id)} style={{ ...getTheme('listItems'), fontFamily:(lang==='bn' ? fontBn : fontEn)}} className='card card--material grid-item'>
                                <img src={'./imgs/' + item.id + '/icon.png'} alt='.' />
                                { item[lang] }
                                <ons-ripple modifier="light-gray modifier2"></ons-ripple>
                            </div>
                        ))
                    }
                </div>
                <button style={getTheme('listItems')} onClick={()=>window.App.rate()} className='button button--material btn'>
                    <span className='ic-rate'></span>&nbsp;&nbsp;
                    <span>{ getLang('rate') }</span>
                </button>
                <button style={ getTheme('listItems') } onClick={()=>window.App.share()} className='button button--material btn'>
                    <span className='ic-share'></span>&nbsp;&nbsp;
                    <span>{ getLang('share') }</span>
                </button>
            </div>
            
            <SettingsDialog
                navigator={navigator} />
            
            <ExitDialog
                navigator={navigator} />
        </Page>
    )
}

export default HomePage