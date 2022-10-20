import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/themes/global"

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      Teste
      <GlobalStyle />
    </ThemeProvider>
  )
}
