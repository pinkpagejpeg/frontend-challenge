import { FC } from 'react'
import { AppRouter } from './routers'
import './styles/App.module.scss'
import { MainProvider } from './providers'

const App: FC = () => {
  return (
    <div>
      <MainProvider>
        <AppRouter />
      </MainProvider>
    </div>
  )
}

export default App