
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { loginformSchema } from './LoginFormSchema'
import { useState } from 'react'
import Welcome from '../Page/Welcome'
import axios from 'axios'


const LoginForm = () => {

    const [data, setData] = useState(null)
    const API = import.meta.env.VITE_API_URL
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginformSchema)
    })
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            let res = await axios.post(`${API}/login`, data, { withCredentials: true })
            console.log('hitting')
            if (res) {
                console.log(res.data.user)
                setData(res.data.user)

            }
        } catch (error) {
            console.log(error, 'error')
        }
    }
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
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>

            <form

                onSubmit={handleSubmit(onSubmit)}
                className='bg-white p-8
            rounded-lg shadow-md w-full max-w-md space-y-5'>

                <h1 className='text-2xl font-bold text-center'>
                    Login Form
                </h1>
                {/* Email */}
                <div>
                    <label className='block mb-1 font-medium'>
                        email
                    </label>
                    <input type="email"
                        placeholder='Enter email'
                        {...register('email')}
                        className='w-full border
                border-gray-300
                rounded-md p-2
                outline-none
                focus:ring-2 focus:ring-blue-400' />

                    {errors.email && (
                        <p
                            className='text-red-500 text-sm mt-1'>
                            {errors.email.message}
                        </p>
                    )}
                </div>
                {/* Password */}
                <div>
                    <label className='block mb-1 font-medium'>Password</label>
                    <input type="password"
                        placeholder='Enter password'
                        {...register('password')}
                        className='w-full border
                border-gray-300
                rounded-md p-2
                outline-none
                focus:ring-2
                focus:ring-blue-400' />
                    {errors.password && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.password.message}

                        </p>

                    )}
                </div>
                <button
                    type="submit"
                    className='w-full
                bg-blue-500
                hover:bg-blue-600
                text-white py-2
                rounded-md transition'
                >
                    Submit
                </button>
                <button
                    type="submit"
                    className='w-full  text-blue-600 py-2 rounded-md transition'
                    onClick={() => { handleLogout() }}
                >
                    Logout
                </button>
            </form>
            {data ? <Welcome userData={data}></Welcome> : <p>Data is not availabe</p>}
        </div>
    )
}

export default LoginForm