import axios from 'axios'
import { useNavigate } from 'react-router'



const Welcome = () => {
    const API = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await axios.post(`${API}/logout`, {}, { withCredentials: true })
            if (res) {
                console.log(res.data.message, 'use is successfully logedout')
                navigate('/')
                return
            }

        }
        catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
            <div className='bg-white p-8
            rounded-lg shadow-md w-full max-w-md space-y-5'>
                <h1 className='text-2xl font-bold text-center'>
                    Welcome
                </h1>
                <div className=''> Dear your loggedin</div>
            </div>
            <button
                type="submit"
                className='w-full  text-blue-600 py-2 rounded-md transition'
                onClick={() => { handleLogout() }}
            >
                Logout
            </button>
        </div>
    )
}

export default Welcome