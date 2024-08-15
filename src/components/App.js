import { useEffect, useContext } from 'react'
import { AppContext, ConfigContext, DBContext } from '../context'
import { Navigator } from 'react-onsenui'
import HomePage from './HomePage'

const App = () => {
    
    const { navigatorHandler } = useContext(AppContext)
    const { theme, animation } = useContext(ConfigContext)
    const { getTheme } = useContext(DBContext)
    
    useEffect(() => {
        window.App.startApp()
        window.App.setTheme(getTheme('colorPrimary'), theme === 'light')
    }, [theme, getTheme])
    
    const renderPage = (route, navigator) => {
        navigatorHandler(navigator)
        return (
            <route.Component
                navigator={navigator}
                props={route.props} />
        )
    }
    
    return (
        <Navigator
            animation={animation}
            renderPage={renderPage}
            initialRoute={{Component: HomePage, props: {}}} />
    )
}

export default App