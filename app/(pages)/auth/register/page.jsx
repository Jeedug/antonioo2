'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next'; // Importar useTranslation

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation(); // Usar useTranslation para acceder a las traducciones

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('name_required') // Usar la traducción para "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = t('email_required') // Usar la traducción para "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalid_email') // Usar la traducción para "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = t('password_required') // Usar la traducción para "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = t('password_min_length') // Usar la traducción para "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwords_not_match') // Usar la traducción para "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('register_error')) // Usar la traducción para "Error al registrar"
      }

      router.push('/auth/login')
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
      {/* Lado izquierdo - Imagen */}
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
            <p className="text-xl font-light tracking-wide opacity-90">{t('excellence_law_firm')}</p> {/* Usar la traducción para "Firma de abogados de excelencia" */}
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 pt-20 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extralight text-gray-900 mb-3 tracking-tight">{t('create_account')}</h2> {/* Usar la traducción para "Crear cuenta" */}
            <p className="text-gray-500 text-sm tracking-wide">{t('welcome_to_gonzales_reyes')}</p> {/* Usar la traducción para "Bienvenido a Gonzales Reyes" */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full px-0 py-2 border-0 border-b-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} placeholder-transparent focus:ring-0 focus:border-blue-500 transition-all bg-transparent text-base`}
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5  text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {t('full_name')} {/* Usar la traducción para "Nombre completo" */}
              </label>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

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
                className="absolute left-0 -top-3.5 text-gray-5 00 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {t('email')} {/* Usar la traducción para "Correo electrónico" */}
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
                className={`peer w-full px-0 py-2 border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} placeholder-transparent focus:ring-0 focus:border-blue-5 00 transition-all bg-transparent text-base`}
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-5 00 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-5 00"
              >
                {t('password')} {/* Usar la traducción para "Contraseña" */}
              </label>
              {errors.password && <p className="mt-1 text-xs text-red-5 00">{errors.password}</p>}
            </div>

            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full px-0 py-2 border-0 border-b-2 ${errors.confirmPassword ? 'border-red-5 00' : 'border-gray-200'} placeholder-transparent focus:ring-0 focus:border-blue-5 00 transition-all bg-transparent text-base`}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-0 -top-3.5 text-gray-5 00 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-5 00"
              >
                {t('confirm_password')} {/* Usar la traducción para "Confirmar contraseña" */}
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
              {isLoading ? t('registering') : t('register')} {/* Usar la traducción para "Registrando..." y "Registrarse" */}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            {t('already_have_account')}{' '} {/* Usar la traducción para "¿Ya tienes una cuenta?" */}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              {t('login')} {/* Usar la traducción para "Iniciar sesión" */}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}