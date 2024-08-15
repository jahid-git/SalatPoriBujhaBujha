import { useContext, useEffect, useRef } from 'react'
import { Page, Toolbar } from 'react-onsenui'
import { AppContext, ConfigContext, DBContext } from '../context'
import { database } from '../db'

const ContentPage = ({navigator, props}) => {
    
    const containerRef = useRef(null)
    
    const { setSettingsDialog } = useContext(AppContext)
    const { lang, fontSize, fontAr, fontEn, fontBn, theme, handleSettingsExpand } = useContext(ConfigContext)
    const { getTheme } = useContext(DBContext)
    
    useEffect(()=>{
        containerRef.current.innerHTML = database[props.id][lang][props.posi].content
        containerRef.current.style.fontSize = fontSize + 'px'
        
        let arabicWordsStyle = getTheme('arabicWords');
        let words = containerRef.current.querySelectorAll('.split-word')
        for(let i = 0;i < words.length;i++){
            words[i].style.background = arabicWordsStyle.background
            words[i].style.color = arabicWordsStyle.color
            words[i].style.fontFamily = lang === 'en' ? fontEn : fontBn;
        }
        let wordsAr = containerRef.current.querySelectorAll('ar, .split-ar')
        for(let i = 0;i < wordsAr.length;i++){
            wordsAr[i].style.color = arabicWordsStyle.color
            wordsAr[i].style.fontFamily = fontAr
            wordsAr[i].style.fontSize = (fontSize * 1.5) + 'px'
        }
        let headTitle = containerRef.current.querySelectorAll('.heading, .title')
        for(let i = 0;i < headTitle.length;i++){
            headTitle[i].style.color = arabicWordsStyle.color
        }
        let divs = containerRef.current.querySelectorAll('div')
        for(let i = 0;i < divs.length;i++){
            divs[i].style.background = getTheme('pageSection').background
        }
        
    }, [lang, fontAr, fontEn, fontBn, fontSize, getTheme, props])
    
    return (
        <Page>
            <Toolbar style={{...getTheme('toolbar'), fontFamily:(lang==='bn' ? fontBn : fontEn)}}>
                <div className='left'>
                    <img className='title-img' src={'./imgs/'+props.id + '/' + props.posi +'.png'} onError={(img)=>img.currentTarget.src='./imgs/'+props.id+'/icon.png'} alt='.' />
                </div>
                <div style={{color: theme==='light' ? 'black' : 'white'}} className='center'>
                    { database[props.id][lang][props.posi].title }
                </div>
                <div onClick={()=>{setSettingsDialog(true); handleSettingsExpand(2)}} className='right'>
                    <span style={{color: theme==='light' ? 'black' : 'white'}} className='ic-settings'></span>
                </div>
            </Toolbar>
            
            <div ref={containerRef} className="container content-container" style={{ ...getTheme("contentPage", lang === 'en'?fontEn:fontBn), fontFamily:(lang==='bn' ? fontBn : fontEn) }}></div>
            
        </Page>
    )
}

export default ContentPage