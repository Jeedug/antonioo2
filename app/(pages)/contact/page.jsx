'use client'
import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageProvider from '@/app/components/LanguageProvider';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#101628] to-[#1A1F3C]">
        {/* Hero Section */}
        <div className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E4973]/90 to-[#101628]/90" />
          <img
            src="/contact-bg.png"
            alt="Contacto Gonzales Reyes"
            className="absolute w-full h-full object-cover object-center brightness-50"
          />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4 md:px-0 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('contact_us')}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                {t('contact_description')}
              </p>
            </div>
          </div>
        </div>

        {/* Contacto y Mapa Section */}
        <div className="container mx-auto px-4 py-16 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info de Contacto */}
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-8">
                {t('contact_information')}
              </h2>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#1E4973]/20 p-3 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#1E4973]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1">
                      {t('address')}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Av. Constitución 2000, Centro, 64000 Monterrey, N.L.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#1E4973]/20 p-3 rounded-xl">
                    <Phone className="w-5 h-5 text-[#1E4973]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1">
                      {t('phone')}
                    </h3>
                    <p className="text-white/70 text-sm">
                      +52 (81) 8123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#1E4973]/20 p-3 rounded-xl">
                    <Mail className="w-5 h-5 text-[#1E4973]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1">
                      {t('email')}
                    </h3>
                    <p className="text-white/70 text-sm">
                      contacto@gonzalesreyes.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#1E4973]/20 p-3 rounded-xl">
                    <Clock className="w-5 h-5 text-[#1E4973]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1">
                      {t('hours')}
                    </h3>
                    <p className="text-white/70 text-sm">
                      Lun - Vie: 9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="https://www.openstreetmap.org/?mlat=25.669178&mlon=-100.309496#map=16/25.669178/-100.309496" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-[#1E4973] hover:text-white group transition-colors duration-300"
                >
                  <span className="mr-2">Ver en mapa</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            {/* Formulario de Contacto */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#1E4973]/20"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t('send_us_message')}
                </h2>
                <p className="text-white/70 text-sm mb-8">
                  {t('form_description')}
                </p>
                
                <CustomContactForm />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mapa Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t('our_offices')}
          </h2>
          
          <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-100.4500%2C25.6000%2C-100.2500%2C25.7500&layer=mapnik&marker=25.669178%2C-100.309496"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {[
              {
                nombre: "Oficina Principal Monterrey",
                direccion: "Av. Constitución 2000, Centro, 64000 Monterrey, N.L.",
                telefono: "+52 (81) 8123-4567",
                horario: "Lun - Vie: 9:00 - 18:00",
              },
              {
                nombre: "San Pedro Garza García",
                direccion: "Av. Gómez Morín 900, Del Valle, 66220 San Pedro Garza García, N.L.",
                telefono: "+52 (81) 8123-4568",
                horario: "Lun - Vie: 9:00 - 18:00",
              },
              {
                nombre: "Ciudad de México",
                direccion: "Paseo de la Reforma 222, Juárez, 06600 Ciudad de México, CDMX",
                telefono: "+52 (55) 5123-4569",
                horario: "Lun - Vie: 9:00 - 18:00",
              }
            ].map((ubicacion, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {ubicacion.nombre}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#1E4973] flex-shrink-0 mt-1" />
                    <p className="text-white/70 text-sm leading-relaxed">
                      {ubicacion.direccion}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1E4973]" />
                    <p className="text-white/70 text-sm">
                      {ubicacion.telefono}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#1E4973]" />
                    <p className="text-white/70 text-sm">
                      {ubicacion.horario}
                    </p>
                  </div>
                </div>

                <div className="mt-6 w-12 h-0.5 bg-[#1E4973]/30 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

function CustomContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  const [recaptchaValue, setRecaptchaValue] = React.useState(null);
  const recaptchaRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
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
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        if (data.error) {
          setError(data.error.message || data.error);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError(data.error);
        }

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    } catch (err) {
      setError(t('request_error'));

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-[#1E4973]/20 to-[#1E4973]/40 p-8 rounded-2xl text-center">
        <h3 className="text-xl font-semibold text-white mb-4">
          {t('thank_you')}
        </h3>
        <p className="text-white/70 mb-6">
          {t('success_message')}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-[#1E4973] hover:bg-[#1E4973]/80 text-white px-6 py-3 rounded-xl transition-colors duration-300"
        >
          {t('send_another_message')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="text-white/80 text-sm mb-2 block">
              {t('name')}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4973]/50 border border-white/10 text-white placeholder-white/40 transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="text-white/80 text-sm mb-2 block">
              {t('email')}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4973]/50 border border-white/10 text-white placeholder-white/40 transition-all duration-300"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="text-white/80 text-sm mb-2 block">
              {t('phone')}
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4973]/50 border border-white/10 text-white placeholder-white/40 transition-all duration-300"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="text-white/80 text-sm mb-2 block">
              {t('subject')}
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4973]/50 border border-white/10 text-white placeholder-white/40 transition-all duration-300"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="text-white/80 text-sm mb-2 block">
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4973]/50 border border-white/10 text-white placeholder-white/40 transition-all duration-300 resize-none"
            required
          ></textarea>
        </div>
        
        <div className="mt-8">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lf5BwQrAAAAAOIzGjOZJ1MEuowrzduPGeRNba24"
            onChange={(value) => setRecaptchaValue(value)}
          />
        </div>
        
        <div className="flex items-center justify-between mt-8">
          <div className="text-white/60 text-xs">
            {t('required_fields')}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? 'bg-gray-500' : 'bg-[#1E4973] hover:bg-[#1E4973]/80'
            } text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 backdrop-blur-xl hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {loading ? t('sending') : t('send_message')}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 text-sm text-red-700 bg-red-100/90 backdrop-blur-md rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
}
