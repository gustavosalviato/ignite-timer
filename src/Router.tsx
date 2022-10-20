import { Route, Routes } from 'react-router-dom'
import { Home } from './@types/components/Home'
import { History } from './@types/components/Home/History'

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/history' element={<History />} />
        </Routes>
    )
}