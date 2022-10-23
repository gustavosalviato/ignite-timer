import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CyclesContextProvider } from './context/CycleContext'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>

      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
