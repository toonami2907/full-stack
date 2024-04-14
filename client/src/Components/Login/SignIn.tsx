import { useState } from "react";
import {  useNavigate } from "react-router-dom"
import { signInStart, signInFailure, signInSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { OAuth } from "../OAuth";
import { RootState } from '../../redux/store'

export const SignIn = () => {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/User/SignIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure({ message: 'Error message here' }));
        }
    }

    return (
        <div className="flex flex-col items-center pt-6">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login into your account</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Emelia_Erickson@.gmail.com" required />
            </div>
        
            <div>
              <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Password</label>
              <input onChange={handleChange}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <button type="submit"  disabled={loading} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'loading....' : 'Login into an account'}</button>
            <div className="flex flex-col justify-center items-center"> 
            <OAuth/>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/signup">Sign up here</a></p>
        </form>
          {!error && (
            <p className="text-red-700 mt-5 ">
              Something went wrong. Please try again.
            </p>
          )}
  
        </div>
        </div>
      </div>
    )
}

