import { useContext } from 'react'
import { Page, Toolbar } from 'react-onsenui'
import { AppContext, ConfigContext, DBContext } from '../context'
import ContentPage from './ContentPage'
import { database } from '../db'

const ListPage = ({navigator, props}) => {
    
    const { setSettingsDialog } = useContext(AppContext)
    const { lang, theme, fontSize, fontBn, fontEn } = useContext(ConfigContext)
    const { getTheme } = useContext(DBContext)
    
    const clickItems = (posi, id) => {
        navigator.pushPage({Component: ContentPage, props: {posi, id}})
    }
    
    return (
        <Page>
            <Toolbar style={{...getTheme('toolbar'), fontFamily:(lang==='bn' ? fontBn : fontEn)}}>
                <div className='left'>
                    <img className='title-img' src={'./imgs/'+props.id+'/icon.png'} alt='.'/>
                </div>
                <div style={{color: theme==='light' ? 'black' : 'white'}} className='center'>
                    { props[lang] }
                </div>
                <div onClick={()=>{setSettingsDialog(true);}} className='right'>
                    <span style={{color: theme==='light' ? 'black' : 'white'}} className='ic-settings'></span>
                </div>
            </Toolbar>
            
            <div className="container" style={{ ...getTheme("listContainer"), fontFamily:(lang==='bn' ? fontBn : fontEn)}}>
                {
                    database[props.id][lang].map((item, i) => (
                        <div onClick={()=>clickItems(i, props.id)} style={ getTheme('listItems') } className='card card--material list-view-item'>
                            <img src={'./imgs/' + props.id + '/' + i +'.png'} onError={(img)=>img.currentTarget.src='./imgs/default.png'} alt='.' />
                            <div style={{fontSize: fontSize + 'px', fontFamily:(lang==='bn' ? fontBn : fontEn)}}>{ item.title }</div>
                            <ons-ripple style={{borderRadius: '10px'}} modifier="light-gray modifier2"></ons-ripple>
                        </div>
                    ))
                    
                }
            </div>
        </Page>
    )
}

export default ListPage