"use client"

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/lib/redux/slices/authSlice'

export default function Login() {
  let [errMessage, setErrMessage] = useState('')
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)

  const router = useRouter();

  async function handelLogin(values) {
    try {
      const resultAction = await dispatch(loginUser(values))
      if (loginUser.fulfilled.match(resultAction)) {
        // Login successful
        router.push("/dashboard")
      } else {
        // Login failed
        setErrMessage(resultAction.payload || 'Invalid email or password')
      }
    } catch (err) {
      setErrMessage('Sorry, you cannot send this data')
    }
  }
  //------------------
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  //------------
  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handelLogin
  })

  return (<>

    <div className="min-h-screen flex flex-col-reverse md:flex-row bg-gradient-to-t from-purple-100 via-purple-200 to-pink-200">

      <div className="flex flex-col justify-center px-4 md:px-16 w-full md:w-full text-center py-8 md:py-0">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Welcome back</h1>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          Step into our shopping metaverse for an unforgettable shopping experience
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md mx-auto w-full">

          <div>
            <input 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.email} 
              name='email' 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-3 text-sm md:text-base rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400" 
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-xs md:text-sm bg-pink-200 p-2 text-red-600 mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className='relative'>
            <input 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.password} 
              name='password' 
              type='password' 
              placeholder="Password" 
              className="w-full px-4 py-3 text-sm md:text-base rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400" 
            />
            <button 
              type="button"
              className='absolute top-3 right-3 text-sm md:text-base text-gray-600 hover:text-purple-600' 
            >
            </button>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-xs md:text-sm bg-pink-200 p-2 text-red-600 mt-1">{formik.errors.password}</p>
            ) : null}
          </div>
          {
            errMessage ? (
              <div className="bg-red-100 text-red-600 p-2 rounded-md text-xs md:text-sm">
                <h3>{errMessage}</h3>
              </div>
            ) : ''
          }
          <button 
            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} 
            type="submit" 
            className={`w-full flex justify-center items-center py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition text-sm md:text-base ${!(formik.isValid && formik.dirty) || formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : 'Login'}
          </button>
        </form>

        <p className="text-xs md:text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()} 
            className="text-purple-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>

      <div className="w-full md:w-full flex flex-col justify-center items-center p-4 md:p-0">
        <img 
          src="/Frame1.svg" 
          alt="Decorative globe" 
          className="w-[200px] md:w-[400px] h-auto" 
        />
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4 md:mt-6">
          meetus<span className="text-xs align-top">VR</span>
        </h2>
      </div>
    </div>




  </>
  )
}
