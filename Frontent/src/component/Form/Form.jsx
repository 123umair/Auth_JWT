
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './FormSchema'
import axios from 'axios'
import { useNavigate } from 'react-router'
const Form = () => {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_URL
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data) => {
        console.log("hitting")
        try {
            let res = await axios.post(`${API}/userdata`, data, {
                withCredentials: true
            })
            if (res) {
                console.log(res.data.message)
                navigate('/login')
                return
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5'
            >

                <h1 className='text-2xl font-bold text-center'>
                    Register Form
                </h1>

                {/* Username */}
                <div>
                    <label className='block mb-1 font-medium'>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder='Enter username'
                        {...register('username')}
                        className='w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    {errors.username && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.username.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className='block mb-1 font-medium'>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder='Enter email'
                        {...register('email')}
                        className='w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    {errors.email && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className='block mb-1 font-medium'>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder='Enter password'
                        {...register('password')}
                        className='w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    {errors.password && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Age */}
                <div>
                    <label className='block mb-1 font-medium'>
                        Age
                    </label>

                    <input
                        type="number"
                        placeholder='Enter age'
                        {...register('age', { valueAsNumber: true })}
                        className='w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    {errors.age && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.age.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition'
                >
                    Submit
                </button>


            </form>
        </div>
    )
}

export default Form