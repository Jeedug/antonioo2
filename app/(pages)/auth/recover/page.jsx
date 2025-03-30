'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next'

const inter = Inter({ subsets: ['latin'] })

export default function Recover() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const validateForm = () => {
    const newErrors = {}
    
    if (!email.trim()) {
      newErrors.email = t('email_required')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('invalid_email')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('recover_error'))
      }

      alert(t('recover_success'))
      router.push('/auth/login')
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex ${inter.className} overflow-y-hidden`}>
      <div className="w-full flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extralight text-gray-900 mb-3 tracking-tight">
              {t('recover_password')}
            </h2>
            <p className="text-gray-500 text-sm tracking-wide">
              {t('recover_instructions')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {isLoading ? t('sending') : t('recover_password')}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            {t('remember_password')}{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
