import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { OAuth } from "../OAuth";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const HandleChange = (e: { target: { id: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/User/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if(data == error){
        setError(true);
        return;
      }
      navigate('/SignIn');

    } catch (error) {
      setLoading(false);
      setError(true);
    }

  }

  return (
    <div className="flex flex-col items-center pt-6">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" >
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" onChange={HandleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Emelia_Erickson@.gmail.com" required />
          </div>
      <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input  type="text" onChange={HandleChange} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="emelia_erickson24" required />
          </div>
          <div>
            <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Password</label>
            <input onChange={HandleChange}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <button type="submit"  disabled={loading} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'loading....' : 'Create an account'}</button>
          <div className="flex flex-col justify-center items-center"> 
          <OAuth/>
          </div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/signin">Sign in here</a></p>
      </form>
        {error && (
          <p className="text-red-700 mt-5 ">
            Something went wrong. Please try again.
          </p>
        )}

      </div>
      </div>
    </div>
  )
}
