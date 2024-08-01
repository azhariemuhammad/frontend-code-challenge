import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'

export const routes = (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<h1>Home</h1>} />
    </Route>
  </Routes>
)
