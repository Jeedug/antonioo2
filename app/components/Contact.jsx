'use client'
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!recaptchaValue) {
      setError(t('recaptcha_error'));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptcha: recaptchaValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setError(data.error || t('form_error'));
      }
    } catch (err) {
      setError(t('request_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 md:px-16 bg-[#f5f5f7]">
      <div
        className="mx-auto max-w-6xl relative rounded-[2.5rem] p-12 overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500"
        style={{
          backgroundImage: "url('/contact-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/40 backdrop-blur-sm"></div>

        <div className="relative z-10">
          <div className="space-y-3 mb-12">
            <h2 className="text-4xl font-bold text-center text-white mb-2 tracking-tight">
              {t('contact_us')}
            </h2>
            <p className="text-base text-center text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
              {t('contact_description')}
            </p>
          </div>

          {success && (
            <div
              className="p-4 mb-6 text-sm text-green-700 bg-green-100/90 backdrop-blur-md rounded-2xl transform animate-fadeIn"
              role="alert"
            >
              {t('success_message')}
            </div>
          )}
          {error && (
            <div
              className="p-4 mb-6 text-sm text-red-700 bg-red-100/90 backdrop-blur-md rounded-2xl transform animate-fadeIn"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder={t('name')}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/10 text-white placeholder-gray-300 transition-all duration-300"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('email')}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/10 text-white placeholder-gray-300 transition-all duration-300"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder={t('phone')}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/10 text-white placeholder-gray-300 transition-all duration-300"
              />
            </div>

            <div className="space-y-6">
              <textarea
                name="message"
                placeholder={t('message')}
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/10 text-white placeholder-gray-300 transition-all duration-300 resize-none"
                required
              ></textarea>
              <ReCAPTCHA
                sitekey="6Lf5BwQrAAAAAOIzGjOZJ1MEuowrzduPGeRNba24"
                onChange={(value) => setRecaptchaValue(value)}
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? 'bg-gray-500' : 'bg-blue-500/80 hover:bg-blue-600/80'
                } text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 backdrop-blur-xl hover:shadow-lg transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? t('sending') : t('send_message')}
              </button>
            </div>
          </form>

          <div className="mt-10 text-center space-y-3">
            <p className="text-sm text-white font-medium hover:text-blue-300 cursor-pointer transition-colors duration-300">
              {t('more_info')}
            </p>
            <p className="text-sm text-gray-300/80 max-w-2xl mx-auto leading-relaxed font-light">
              {t('contact_additional_info')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}