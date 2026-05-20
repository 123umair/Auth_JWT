import './App.css'
import { Route, Routes } from 'react-router'
import Form from './component/Form/Form'
import LoginForm from './component/Form/LoginForm'
import Welcome from './component/Page/Welcome'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Form />}></Route>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/welcome' element={<Welcome />} />
    </Routes>
  )
}

export default App
