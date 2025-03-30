'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = t('email_required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalid_email')
    }
    
    if (!formData.password) {
      newErrors.password = t('password_required')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('login_error'))
      }

      router.push('/dashboard')
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={`min-h-screen flex ${inter.className} overflow-y-hidden`}>
      {/* Lado izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extralight text-gray-900 mb-3 tracking-tight">{t('login')}</h2>
            <p className="text-gray-500 text-sm tracking-wide">{t('welcome_back_to_gonzales_reyes')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full px-0 py-2 border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} placeholder-transparent focus:ring-0 focus:border-blue-500 transition-all bg-transparent text-base`}
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {t('email')}
              </label>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full px-0 py-2 border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} placeholder-transparent focus:ring-0 focus:border-blue-500 transition-all bg-transparent text-base`}
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {t('password')}
              </label>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-8"
            >
              {isLoading ? t('logging_in') : t('login')}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            {t('dont_have_account')}{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              {t('register')}
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            {t('forgot_password')}{' '}
            <Link href="/auth/recover" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              {t('recover_password')}
            </Link>
          </p>
        </div>
      </div>

      {/* Lado derecho - Imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/hero.png"
          alt="Gonzales Reyes Abogados"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-white text-center px-8">
            <h1 className="text-5xl font-light mb-4 tracking-tight">Gonzales Reyes</h1>
            <p className="text-xl font-light tracking-wide opacity-90">{t('excellence_law_firm')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
