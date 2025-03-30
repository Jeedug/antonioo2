'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next'

const inter = Inter({ subsets: ['latin'] })

export default function ChangePassword({ params }) {
  const { code } = params
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const validateForm = () => {
    const newErrors = {}
    
    if (!newPassword) {
      newErrors.newPassword = t('password_required')
    } else if (newPassword.length < 6) {
      newErrors.newPassword = t('password_min_length')
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('passwords_not_match')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: code, newPassword }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('change_password_error'))
      }

      alert(t('change_password_success'))
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
              {t('change_password')}
            </h2>
            <p className="text-gray-500 text-sm tracking-wide">
              {t('enter_new_password')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder=" "
                className={`peer w-full px-0 py-2 border-0 border-b-2 ${errors.newPassword ? 'border-red-500' : 'border-gray-200'} placeholder-transparent focus:ring-0 focus:border-blue-500 transition-all bg-transparent text-base`}
              />
              <label
                htmlFor="newPassword"
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {t('new_password')}
              </label>
              {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>}
            </div>

            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=" "
                className={`peer w-full px-0 py-2 border-0 border-b-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} placeholder-transparent focus:ring-0 focus:border-blue-500 transition-all bg-transparent text-base`}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {t('confirm_password')}
              </label>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
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
              {isLoading ? t('changing_password') : t('change_password')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
