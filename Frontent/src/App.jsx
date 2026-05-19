import './App.css'
import { Route, Routes } from 'react-router'
import Form from './component/Form/Form'
import LoginForm from './component/Form/LoginForm'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Form />}></Route>
      <Route path='/login' element={<LoginForm />} />
    </Routes>
  )
}

export default App
