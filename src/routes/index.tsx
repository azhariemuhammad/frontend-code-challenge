import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import { Issues } from '../pages/Issues'

export const routes = (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Issues />} />
    </Route>
  </Routes>
)
