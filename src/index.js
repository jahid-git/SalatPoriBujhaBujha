import React from 'react'
import ReactDOM from 'react-dom/client'
import 'onsenui/css/onsenui-core.min.css'
import 'onsenui/css/onsen-css-components.min.css'
import 'onsenui/js/onsenui.min.js'
import './styles/fonts.css'
import './styles/style.css'

import { AppProvider, ConfigProvider, DBProvider } from './context'
import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <AppProvider>
        <ConfigProvider>
            <DBProvider>
                <App />
            </DBProvider>
        </ConfigProvider>
    </AppProvider>
)