import { useState, useEffect } from 'react'
import './App.css'

/* ── Extra Icons ── */
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const EyeIcon = ({ off }) => off ? (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const MailInputIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

/* ── Auth Modal ── */
function AuthModal({ onClose }) {
  const [tab, setTab] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1400)
  }

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="auth-modal">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon"><TvIcon /></div>
            <span>StreamPro</span>
          </div>
          <button className="auth-close" onClick={onClose} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setSuccess(false) }}
          >Iniciar sesión</button>
          <button
            className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setSuccess(false) }}
          >Crear cuenta</button>
        </div>

        {/* Body */}
        <div className="auth-body">
          {success ? (
            <div className="auth-success">
              <div className="auth-success-icon"><CheckIcon /></div>
              <h3>{tab === 'login' ? '¡Bienvenido de vuelta!' : '¡Cuenta creada!'}</h3>
              <p>{tab === 'login' ? 'Has iniciado sesión correctamente.' : 'Tu cuenta ha sido creada. Ya puedes disfrutar StreamPro.'}</p>
              <button className="button primary" style={{ width: '100%', marginTop: '8px' }} onClick={onClose}>Continuar</button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              {tab === 'register' && (
                <div className="auth-field">
                  <label>Nombre completo</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><UserIcon /></span>
                    <input type="text" placeholder="Tu nombre" required autoComplete="name" />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label>Correo electrónico</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><MailInputIcon /></span>
                  <input type="email" placeholder="correo@ejemplo.com" required autoComplete="email" />
                </div>
              </div>

              <div className="auth-field">
                <label>
                  Contraseña
                  {tab === 'login' && (
                    <a href="#" className="auth-forgot">¿Olvidaste tu contraseña?</a>
                  )}
                </label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><LockIcon /></span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                  />
                  <button type="button" className="auth-eye" onClick={() => setShowPass(p => !p)}>
                    <EyeIcon off={showPass} />
                  </button>
                </div>
              </div>

              {tab === 'register' && (
                <div className="auth-field">
                  <label>Confirmar contraseña</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><LockIcon /></span>
                    <input
                      type={showPass2 ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                    <button type="button" className="auth-eye" onClick={() => setShowPass2(p => !p)}>
                      <EyeIcon off={showPass2} />
                    </button>
                  </div>
                </div>
              )}

              {tab === 'register' && (
                <label className="auth-terms">
                  <input type="checkbox" required />
                  <span>Acepto los <a href="#">términos de servicio</a> y la <a href="#">política de privacidad</a></span>
                </label>
              )}

              <button type="submit" className={`button primary auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : (tab === 'login' ? 'Iniciar sesión' : 'Crear cuenta')}
              </button>

              <div className="auth-divider"><span>o continúa con</span></div>

              <div className="auth-social">
                <button type="button" className="auth-social-btn">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Google
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── SVG Icons ── */
const TvIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const SignalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
  </svg>
)

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width: '16px', height: '16px', color: '#f59e0b' }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const QuestionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)


const LiveDot = () => (
  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent2)', display: 'inline-block', flexShrink: 0 }} />
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

/* ── Pricing Data ── */
const PLANS = [
  {
    id: '1-disp',
    label: '1 Dispositivo',
    num: '1',
    color: 'green',
    icon: '👤',
    rows: [
      { periodo: '1 MES', precio: '$2.000' },
      { periodo: '3 MESES', precio: '$6.000' },
      { periodo: '6 MESES', precio: '$12.000' },
      { periodo: '12 MESES', precio: '$20.000' },
    ],
  },
  {
    id: '2-disp',
    label: '2 Dispositivos',
    num: '2',
    color: 'blue',
    icon: '👥',
    rows: [
      { periodo: '1 MES', precio: '$3.000' },
      { periodo: '3 MESES', precio: '$7.000' },
      { periodo: '6 MESES', precio: '$16.000' },
      { periodo: '12 MESES', precio: '$25.000' },
    ],
  },
  {
    id: '3-disp',
    label: '3 Dispositivos',
    num: '3',
    color: 'purple',
    icon: '👨‍👩‍👧',
    rows: [
      { periodo: '1 MES', precio: '$4.000' },
      { periodo: '3 MESES', precio: '$10.000' },
      { periodo: '6 MESES', precio: '$17.000' },
      { periodo: '12 MESES', precio: '$30.000' },
    ],
  },
]

function PricingTable() {
  return (
    <div className="pricing-table-wrap">
      {/* tagline */}
      <div className="pricing-tagline">
        <span>TV EN VIVO</span><span className="pt-dot">·</span>
        <span>SERIES</span><span className="pt-dot">·</span>
        <span>PELÍCULAS</span><span className="pt-dot">·</span>
        <span>DEPORTES</span>
      </div>

      {/* Plan cards */}
      <div className="pricing-cards">
        {PLANS.map(plan => (
          <article key={plan.id} className={`pricing-card pc-${plan.color}`}>
            {/* Card header */}
            <div className={`pc-header pc-header-${plan.color}`}>
              <div className={`pc-icon-wrap pc-icon-${plan.color}`}>
                <UserGroupIcon n={plan.num} />
              </div>
              <div>
                <div className="pc-num">{plan.num}</div>
                <div className="pc-label">DISPOSITIVO{plan.num !== '1' ? 'S' : ''}</div>
              </div>
            </div>

            {/* Price table */}
            <div className="pc-table">
              <div className="pc-table-head">
                <span>PERIODO</span>
                <span>PRECIO</span>
              </div>
              {plan.rows.map((r, i) => (
                <div
                  key={i}
                  className={`pc-table-row ${i === plan.rows.length - 1 ? `pc-row-last pc-row-last-${plan.color}` : ''}`}
                >
                  <span className="pc-period">{r.periodo}</span>
                  <span className="pc-price">{r.precio}</span>
                </div>
              ))}
            </div>

            <a href="https://wa.me/56928422082" target="_blank" rel="noreferrer"
              className={`button pc-btn pc-btn-${plan.color}`}>
              Contratar <ArrowIcon />
            </a>
          </article>
        ))}
      </div>

      <p className="pricing-note">
        Precios en pesos chilenos (CLP) · Activación rápida · Soporte técnico incluido
      </p>
    </div>
  )
}

/* Helper icon for device count */
function UserGroupIcon({ n }) {
  const d = {
    '1': <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />,
    '2': <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    '3': <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><circle cx="9" cy="7" r="4" /></>,
  }
  const c = { '1': <circle cx="12" cy="7" r="4" />, '2': null, '3': null }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {d[n]}
      {n === '1' && c['1']}
    </svg>
  )
}

/* ── Content Carousel Component ── */
function ContentCarousel() {
  const base = import.meta.env.BASE_URL || '/'
  const slides = [
    {
      id: 1,
      image: `${base}iptv_sports.png`,
      badge: 'Deportes en Vivo',
      title: 'La Emoción del Deporte sin Cortes',
      desc: 'Transmisiones en alta definición de la Champions League, Premier League, UFC, Fórmula 1 y más. ¡Siente la adrenalina como si estuvieras en el estadio!',
      actionText: 'Ver Canales Deportivos',
      color: 'blue'
    },
    {
      id: 2,
      image: `${base}iptv_movies.png`,
      badge: 'Cine & Series',
      title: 'Tus Películas Favoritas y Estrenos Semanales',
      desc: 'El catálogo de streaming más completo. Desde los últimos estrenos de cine hasta tus series favoritas de siempre en resolución Ultra HD.',
      actionText: 'Explorar Catálogo',
      color: 'purple'
    },
    {
      id: 3,
      image: `${base}iptv_live_channels.png`,
      badge: 'Televisión en Vivo',
      title: 'Más de 50,000 Canales Mundiales',
      desc: 'Accede a la televisión de todo el mundo. Canales locales, internacionales, infantiles y de noticias, ordenados por categorías en una guía interactiva.',
      actionText: 'Probar Demo Gratis',
      color: 'green'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="carousel-section section-wrapper" id="contenido">
      <div className="section-label">Contenido Destacado</div>
      <h2 className="section-title">Nuestra Programación en Acción</h2>
      <p className="section-sub">
        Explora la variedad de contenidos de entretenimiento y deportes en vivo que tenemos listos para ti.
      </p>

      <div className="carousel-container">
        {/* Flechas de navegación */}
        <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="carousel-arrow next" onClick={nextSlide} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Diapositivas */}
        <div className="carousel-track-wrapper">
          {slides.map((slide, idx) => {
            let className = "carousel-slide"
            if (idx === currentIndex) className += " active"
            else if (idx === (currentIndex - 1 + slides.length) % slides.length) className += " prev-slide"
            else if (idx === (currentIndex + 1) % slides.length) className += " next-slide"

            return (
              <div
                key={slide.id}
                className={className}
                style={{ backgroundImage: `linear-gradient(rgba(6, 9, 19, 0.25), rgba(6, 9, 19, 0.85)), url(${slide.image})` }}
              >
                <div className="slide-content">
                  <span className={`slide-badge badge-${slide.color}`}>{slide.badge}</span>
                  <h3 className="slide-title">{slide.title}</h3>
                  <p className="slide-desc">{slide.desc}</p>
                  <a href="#planes" className="button primary slide-btn">
                    {slide.actionText} <ArrowIcon />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Indicadores (Puntos) */}
        <div className="carousel-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Interactive Channel Guide Component ── */
function ChannelGuide() {
  const categories = {
    deportes: [
      { name: 'ESPN Premium', logo: '⚽', prog: 'SportsCenter - En vivo', progress: 65, quality: '4K' },
      { name: 'Fox Sports 1', logo: '🏎️', prog: 'Fórmula 1: Prácticas - En vivo', progress: 40, quality: 'HD' },
      { name: 'DSports', logo: '🏀', prog: 'NBA Action - En vivo', progress: 85, quality: 'HD' },
      { name: 'TNT Sports', logo: '⚽', prog: 'Campeonato Nacional - En vivo', progress: 50, quality: '4K' },
      { name: 'UFC Network', logo: '🥊', prog: 'UFC Fight Night Prelims', progress: 20, quality: '4K' },
      { name: 'Golf Channel', logo: '⛳', prog: 'PGA Tour: Round 2', progress: 10, quality: 'HD' }
    ],
    cine: [
      { name: 'HBO Premium', logo: '🎬', prog: 'House of the Dragon', progress: 75, quality: '4K' },
      { name: 'Star Channel', logo: '🎥', prog: 'Los Simpson - Especial', progress: 30, quality: 'HD' },
      { name: 'Warner TV', logo: '📺', prog: 'The Big Bang Theory', progress: 90, quality: 'HD' },
      { name: 'Golden Plus', logo: '🍿', prog: 'Dune: Part Two', progress: 15, quality: '4K' },
      { name: 'Cinemax', logo: '🎬', prog: 'Mad Max: Fury Road', progress: 55, quality: 'HD' },
      { name: 'Space', logo: '🔥', prog: 'John Wick: Chapter 4', progress: 60, quality: 'HD' }
    ],
    infantiles: [
      { name: 'Disney Channel', logo: '🐭', prog: 'Phineas y Ferb', progress: 45, quality: 'HD' },
      { name: 'Cartoon Network', logo: '💥', prog: 'El Increíble Mundo de Gumball', progress: 70, quality: 'HD' },
      { name: 'Nickelodeon', logo: '🐠', prog: 'Bob Esponja', progress: 25, quality: 'HD' },
      { name: 'Discovery Kids', logo: '🐾', prog: 'Peppa Pig', progress: 80, quality: 'HD' },
      { name: 'DreamWorks', logo: '🌙', prog: 'Kung Fu Panda', progress: 35, quality: 'HD' },
      { name: 'BabyTV', logo: '🍼', prog: 'Colores y Formas', progress: 95, quality: 'HD' }
    ],
    documentales: [
      { name: 'Discovery Channel', logo: '🌍', prog: 'Fiebre del Oro', progress: 50, quality: '4K' },
      { name: 'National Geographic', logo: '🏞️', prog: 'Explorer: The Deep', progress: 60, quality: '4K' },
      { name: 'History Channel', logo: '🛡️', prog: 'El Precio de la Historia', progress: 40, quality: 'HD' },
      { name: 'Animal Planet', logo: '🦁', prog: 'Veterinario del Zoológico', progress: 15, quality: 'HD' },
      { name: 'Nat Geo Wild', logo: '🐯', prog: 'Depredadores de la Selva', progress: 70, quality: 'HD' },
      { name: 'Investigation Discovery', logo: '🔍', prog: 'Crímenes Imperfectos', progress: 85, quality: 'HD' }
    ]
  }

  const [activeCat, setActiveCat] = useState('deportes')

  return (
    <section className="cg-section section-wrapper" id="canales-guia">
      <div className="section-label">Guía de Canales</div>
      <h2 className="section-title">Contenido en Vivo y VOD</h2>
      <p className="section-sub">
        Navega por una muestra de nuestra grilla de programación. Más de 50,000 alternativas a tu disposición.
      </p>

      {/* Tabs */}
      <div className="cg-tabs">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            className={`cg-tab ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            <span className="cg-tab-text">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="cg-grid">
        {categories[activeCat].map((ch, idx) => (
          <div key={idx} className="cg-card">
            <div className="cg-card-header">
              <span className="cg-ch-logo">{ch.logo}</span>
              <div className="cg-ch-info">
                <span className="cg-ch-name">{ch.name}</span>
                <span className="cg-ch-badge">{ch.quality}</span>
              </div>
            </div>
            <div className="cg-card-body">
              <div className="cg-live-info">
                <span className="cg-dot-live"></span>
                <span className="cg-prog-text">{ch.prog}</span>
              </div>
              <div className="cg-progress-bar">
                <div className="cg-progress-fill" style={{ width: `${ch.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Interactive Setup Guide Component ── */
function SetupGuide() {
  const guideTabs = {
    tv: {
      title: 'Smart TV (Samsung, LG, Sony, etc.)',
      steps: [
        { num: '1', title: 'Descarga una App', text: 'Busca e instala en la tienda de aplicaciones de tu TV: "Smarters Lite", "Duplex Play" o "IBO Player".' },
        { num: '2', title: 'Copia tus Credenciales', text: 'Te enviaremos los datos de acceso (Usuario, Contraseña y URL M3U) directamente por WhatsApp.' },
        { num: '3', title: '¡A Disfrutar!', text: 'Ingresa los datos en la aplicación y listo. Tendrás acceso inmediato a toda la programación.' }
      ]
    },
    firestick: {
      title: 'Amazon Fire TV Stick & Roku',
      steps: [
        { num: '1', title: 'Instala Downloader', text: 'Desde la tienda de Amazon busca e instala la aplicación "Downloader" para poder bajar archivos externos.' },
        { num: '2', title: 'Instala IPTV App', text: 'Escribe el código que te daremos en Downloader para descargar e instalar nuestra aplicación oficial.' },
        { num: '3', title: 'Activa tu Cuenta', text: 'Abre la aplicación, ingresa tus datos de acceso activados y empieza a transmitir en segundos.' }
      ]
    },
    movil: {
      title: 'Celulares & Tablets (Android, iOS)',
      steps: [
        { num: '1', title: 'Obtén la Aplicación', text: 'Para Android usa nuestra APK o "IPTV Smarters". Para iOS (iPhone/iPad) instala "GSE Smart IPTV".' },
        { num: '2', title: 'Ingresa tus Datos', text: 'Selecciona "Cargar Lista / Archivo M3U" e introduce los credenciales que te enviamos.' },
        { num: '3', title: 'Streaming en Movimiento', text: 'Lleva tu servicio de canales, películas y series a donde vayas. Compatible con redes móviles.' }
      ]
    },
    pc: {
      title: 'Computadores (Windows, macOS)',
      steps: [
        { num: '1', title: 'Descarga Reproductor', text: 'Descarga e instala la aplicación oficial "IPTV Smarters Pro" para Windows/Mac, o usa VLC Media Player.' },
        { num: '2', title: 'Carga la Lista', text: 'Abre el programa, selecciona la opción M3U o Xtream Codes e introduce las credenciales provistas.' },
        { num: '3', title: 'Pantalla Completa', text: 'Organiza tus canales favoritos, graba programas en vivo y disfruta con la mejor calidad de tu monitor.' }
      ]
    }
  }

  const [activeTab, setActiveTab] = useState('tv')

  return (
    <section className="sg-section section-wrapper" id="guia-instalacion">
      <div className="section-label">Instalación Fácil</div>
      <h2 className="section-title">Cómo Configurar tu Servicio</h2>
      <p className="section-sub">
        Configura StreamPro IPTV en cualquiera de tus dispositivos preferidos en menos de 10 minutos.
      </p>

      <div className="sg-tabs">
        {Object.keys(guideTabs).map((tab) => (
          <button
            key={tab}
            className={`sg-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <span>{tab === 'tv' ? '📺 Smart TV' : tab === 'firestick' ? '🔥 Fire Stick' : tab === 'movil' ? '📱 Móvil' : '💻 Computador'}</span>
          </button>
        ))}
      </div>

      <div className="sg-content">
        <h3 className="sg-tab-title">{guideTabs[activeTab].title}</h3>
        <div className="sg-steps-grid">
          {guideTabs[activeTab].steps.map((step, idx) => (
            <div key={idx} className="sg-step-card">
              <div className="sg-step-number">{step.num}</div>
              <h4 className="sg-step-title">{step.title}</h4>
              <p className="sg-step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Interactive Speed Test Component ── */
function SpeedTest() {
  const [status, setStatus] = useState('idle') // idle, loading, completed
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [ping, setPing] = useState(0)

  const startTest = () => {
    setStatus('loading')
    setProgress(0)

    // Simulate test
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus('completed')
          setSpeed(Math.floor(Math.random() * 80) + 35) // 35 - 115 Mbps
          setPing(Math.floor(Math.random() * 15) + 8) // 8 - 23 ms
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  return (
    <div className="st-container">
      <h3 className="st-title">Prueba de Compatibilidad de Internet</h3>
      <p className="st-subtitle">Mide tu conexión para ver si estás listo para streaming en HD y 4K sin interrupciones.</p>

      {status === 'idle' && (
        <div className="st-idle-state">
          <button className="button primary st-btn" onClick={startTest}>Iniciar Prueba de Conexión</button>
        </div>
      )}

      {status === 'loading' && (
        <div className="st-loading-state">
          <div className="st-progress-ring">
            <span className="st-percentage">{progress}%</span>
            <div className="st-spinner-border"></div>
          </div>
          <p className="st-status-msg">Analizando tu conexión con el servidor IPTV...</p>
        </div>
      )}

      {status === 'completed' && (
        <div className="st-completed-state">
          <div className="st-results-grid">
            <div className="st-result-card">
              <span className="st-result-label">Velocidad de Descarga</span>
              <strong className="st-result-val">{speed} Mbps</strong>
            </div>
            <div className="st-result-card">
              <span className="st-result-label">Latencia (Ping)</span>
              <strong className="st-result-val">{ping} ms</strong>
            </div>
          </div>

          <div className="st-verdict">
            <div className="st-verdict-icon">🚀</div>
            <div>
              <h4 className="st-verdict-title">Conexión Excelente</h4>
              <p className="st-verdict-desc">Tu velocidad es idónea para reproducir múltiples canales 4K Ultra HD y contenido en vivo en simultáneo.</p>
            </div>
          </div>

          <button className="button secondary st-btn" onClick={() => setStatus('idle')}>Repetir Prueba</button>
        </div>
      )}
    </div>
  )
}

/* ── Floating WhatsApp Component ── */
function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fwa-wrapper">
      {showTooltip && (
        <div className="fwa-tooltip">
          <span>¡Hola! Pide tu <strong>Demo de 24h gratis</strong> aquí mismo ⚡</span>
          <button className="fwa-tooltip-close" onClick={() => setShowTooltip(false)}>×</button>
        </div>
      )}
      <a href="https://wa.me/56928422082" target="_blank" rel="noreferrer" className="fwa-btn" aria-label="Chat en WhatsApp">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.73.001-2.597-1.002-5.039-2.825-6.865-1.822-1.824-4.244-2.83-6.838-2.831-5.442 0-9.867 4.372-9.87 9.734-.002 1.73.46 3.42 1.339 4.925l-.974 3.563 3.655-.958zm11.785-5.08c-.27-.135-1.597-.788-1.846-.878-.25-.09-.43-.135-.61.135-.18.27-.695.878-.853 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.17-1.34-.8-.713-1.34-1.594-1.498-1.864-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.473.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.473-.068-.135-.61-1.467-.836-2.012-.22-.53-.442-.457-.61-.466-.156-.008-.336-.01-.516-.01-.18 0-.473.067-.72.337-.247.27-.945.922-.945 2.25 0 1.327.965 2.61 1.098 2.79.135.18 1.9 2.9 4.6 4.07.64.28 1.14.44 1.53.57.65.2 1.24.17 1.7.1.52-.08 1.597-.65 1.82-1.282.227-.63.227-1.17.16-1.282-.067-.11-.247-.197-.517-.33z" />
        </svg>
      </a>
    </div>
  )
}

/* ── Sales Live Notifications Component ── */
const SALES_NOTIFICATIONS_MESSAGES = [
  { name: 'Carlos M.', loc: 'Santiago', action: 'activó demo gratis de 24h', time: 'hace 2 min' },
  { name: 'Ana L.', loc: 'Valparaíso', action: 'adquirió el Plan 2 Dispositivos', time: 'hace 5 min' },
  { name: 'Ricardo G.', loc: 'Concepción', action: 'activó demo gratis de 24h', time: 'hace 8 min' },
  { name: 'Sofía P.', loc: 'Antofagasta', action: 'adquirió el Plan 3 Dispositivos', time: 'hace 10 min' },
  { name: 'Javier V.', loc: 'La Serena', action: 'activó demo gratis de 24h', time: 'hace 1 min' },
  { name: 'Mariela F.', loc: 'Temuco', action: 'adquirió el Plan 1 Dispositivo', time: 'hace 4 min' }
]

function SalesNotifications() {
  const [currentMsg, setCurrentMsg] = useState(null)

  useEffect(() => {
    // Show first message after 6 seconds
    const initialTimer = setTimeout(() => {
      setCurrentMsg(SALES_NOTIFICATIONS_MESSAGES[Math.floor(Math.random() * SALES_NOTIFICATIONS_MESSAGES.length)])
    }, 6000)

    // Repeat cycle every 20 seconds
    const interval = setInterval(() => {
      setCurrentMsg(null)
      setTimeout(() => {
        setCurrentMsg(SALES_NOTIFICATIONS_MESSAGES[Math.floor(Math.random() * SALES_NOTIFICATIONS_MESSAGES.length)])
      }, 500)
    }, 20000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  // Auto hide message after 5 seconds
  useEffect(() => {
    if (currentMsg) {
      const timer = setTimeout(() => {
        setCurrentMsg(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentMsg])

  if (!currentMsg) return null

  return (
    <div className="sn-toast">
      <div className="sn-badge">🔥 En vivo</div>
      <div className="sn-body">
        <p><strong>{currentMsg.name}</strong> de <em>{currentMsg.loc}</em> {currentMsg.action}.</p>
        <span className="sn-time">{currentMsg.time}</span>
      </div>
      <button className="sn-close" onClick={() => setCurrentMsg(null)}>×</button>
    </div>
  )
}

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  const channels = [
    'ESPN', 'HBO', 'Fox Sports', 'Discovery', 'CNN', 'Disney+',
    'Star+', 'Paramount+', 'National Geographic', 'History', 'MTV', 'Animal Planet',
    'BBC', 'Cartoon Network', 'ESPN', 'HBO', 'Fox Sports', 'Discovery', 'CNN',
    'Disney+', 'Star+', 'Paramount+', 'National Geographic', 'History',
  ]

  return (
    <div className="iptv-page">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon"><TvIcon /></div>
          <span className="nav-logo-text">StreamPro</span>
        </a>
        <ul className="nav-links">
          <li><a href="#beneficios">Beneficios</a></li>
          <li><a href="#contenido">Contenido</a></li>
          <li><a href="#canales-guia">Canales</a></li>
          <li><a href="#planes">Planes</a></li>
          <li><a href="#guia-instalacion">Guía</a></li>
          <li><a href="#testimonios">Clientes</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <button className="nav-account-btn" onClick={() => setAuthOpen(true)}>
              <UserIcon /> Mi cuenta
            </button>
          </li>
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Cambiar tema" type="button">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </li>
          <li><a href="#contacto" className="nav-cta">Empezar ahora</a></li>
        </ul>
      </nav>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      {/* ── Hero ── */}
      <header className="hero-section">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Servicio activo · +10,000 clientes
          </div>
          <h1>
            La mejor IPTV para{' '}
            <span className="gradient-text">canales, películas y deportes</span>
          </h1>
          <p>
            Accede a más de 50,000 canales en vivo, series y películas en HD y 4K.
            Compatible con todos tus dispositivos. Sin contratos, cancela cuando quieras.
          </p>
          <div className="hero-actions">
            <a href="#planes" className="button primary">Ver planes <ArrowIcon /></a>
            <a href="#beneficios" className="button secondary">¿Por qué nosotros?</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>50K+</strong>
              <span>Canales en vivo</span>
            </div>
            <div className="stat">
              <strong>99.9%</strong>
              <span>Uptime garantizado</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>Soporte en español</span>
            </div>
          </div>
        </div>

        <aside className="hero-card">
          <div className="card-badge">
            <StarIcon /> Más popular
          </div>
          <div className="card-header">
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Plan recomendado</span>
            <strong>Premium IPTV</strong>
          </div>
          <div className="card-features">
            {[
              '50,000+ canales HD y 4K',
              'Películas y series sin límite',
              '3 dispositivos simultáneos',
              'Soporte 24/7 en español',
              'Demo gratis de 24 horas',
            ].map((f, i) => (
              <div className="card-feature-item" key={i}>
                <span className="check"><CheckIcon /></span>
                {f}
              </div>
            ))}
          </div>
          <div className="card-divider"></div>
          <div className="card-footer">
            <div className="card-price">
              <span>desde</span>
              <strong>$2.000 por mes</strong>
            </div>
            <a href="#contacto" className="button tertiary">Contratar <ArrowIcon /></a>
          </div>
        </aside>
      </header>

      {/* ── Channels Ticker ── */}
      <div className="channels-strip">
        <div className="channels-track">
          {[...channels, ...channels].map((ch, i) => (
            <div className="channel-chip" key={i}>
              <LiveDot />
              {ch}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content Carousel ── */}
      <ContentCarousel />

      {/* ── Channel Guide ── */}
      <ChannelGuide />

      {/* ── Features ── */}
      <section className="features-section section-wrapper" id="beneficios">
        <div className="section-label">¿Por qué elegirnos?</div>
        <h2 className="section-title">Todo lo que necesitas en un solo servicio</h2>
        <p className="section-sub">
          Diseñado para darte la mejor experiencia de streaming, con tecnología de punta
          y soporte en español.
        </p>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon blue"><SignalIcon /></div>
            <h3>Canales ilimitados</h3>
            <p>Más de 50,000 canales en vivo de todo el mundo: deportes, entretenimiento, noticias y más.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon cyan"><PlayIcon /></div>
            <h3>Alta calidad HD y 4K</h3>
            <p>Streaming sin cortes en HD y 4K con servidores optimizados para la mínima latencia.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon purple"><ShieldIcon /></div>
            <h3>Soporte 24/7</h3>
            <p>Equipo en español disponible todo el día. Instalación remota y solución de problemas rápida.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon green"><MonitorIcon /></div>
            <h3>Todos tus dispositivos</h3>
            <p>Compatible con Smart TV, Android, iOS, Windows, macOS, Fire Stick, Roku y dispositivos MAG.</p>
          </article>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="plans-section section-wrapper" id="planes">
        <div className="plans-top-row">
          <div>
            <div className="section-label">Lista de precios IPTV</div>
            <h2 className="section-title">Elige tu plan</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Dos formas de pago disponibles. Demo gratuita disponible antes de comprar.
            </p>
          </div>
          <a href="https://wa.me/56928422082" target="_blank" rel="noreferrer" className="demo-badge">
            <span className="demo-badge-icon"><PlayIcon /></span>
            <span>
              <strong>IPTV DEMO</strong>
              <em>GRATIS</em>
            </span>
          </a>
        </div>

        <PricingTable />

        {/* ── Speed Test Widget ── */}
        <SpeedTest />

        <div className="compat-section">
          <div className="compat-label">Compatible con</div>
          <div className="compat-devices">
            {['Celulares', 'Smart TV', 'TV Box', 'Computadores', 'Tablets', 'Roku TV'].map((d, i) => (
              <span className="compat-chip" key={i}><CheckIcon />{d}</span>
            ))}
          </div>
          <div className="compat-brands">
            {['Samsung Smart TV', 'LG Smart TV', 'Sony Bravia', 'Android TV', 'Google TV'].map((b, i) => (
              <span className="brand-chip" key={i}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Setup Guide ── */}
      <SetupGuide />

      {/* ── Testimonials ── */}
      <section className="testimonials-section section-wrapper" id="testimonios">
        <div className="section-label">Clientes</div>
        <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
        <p className="section-sub">Más de 10,000 clientes satisfechos en toda Latinoamérica.</p>
        <div className="testimonials-grid">
          {[
            { initials: 'CM', color: 'a1', name: 'Carlos M.', country: 'México', text: 'Llevo 6 meses usándolo y jamás ha fallado. La calidad en 4K es increíble. El soporte me ayudó a configurarlo en minutos.' },
            { initials: 'AL', color: 'a2', name: 'Ana L.', country: 'Chile', text: 'Increíble servicio. Tengo los canales de deportes que no conseguía en ningún otro lado. La demo de 24 horas fue lo que me convenció.' },
            { initials: 'RG', color: 'a3', name: 'Roberto G.', country: 'Colombia', text: 'El plan Familia vale la pena al 100%. Mis 5 dispositivos funcionan al mismo tiempo sin ningún problema.' },
          ].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">
                {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
              </div>
              <p>"{t.text}"</p>
              <div className="testimonial-author">
                <div className={`author-avatar ${t.color}`}>{t.initials}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-country">{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section section-wrapper" id="faq">
        <div className="section-label">Preguntas frecuentes</div>
        <h2 className="section-title">¿Tienes dudas? Aquí las respuestas</h2>
        <p className="section-sub">Si no encuentras lo que buscas, escríbenos al instante.</p>
        <div className="faq-grid">
          {[
            { q: '¿Funciona en Smart TV?', a: 'Sí, compatible con Samsung, LG, Android TV, Fire Stick, Chromecast y dispositivos MAG.' },
            { q: '¿Puedo usarlo en móvil?', a: 'Funciona perfectamente en Android e iOS. También desde cualquier navegador en PC o Mac.' },
            { q: '¿Hay período de prueba?', a: 'Sí, ofrecemos una demo de 24 horas completamente gratis. Sin tarjeta de crédito requerida.' },
            { q: '¿Cómo me instalan el servicio?', a: 'Nuestro equipo te guía paso a paso por WhatsApp o soporte remoto. Generalmente en menos de 10 minutos.' },
            { q: '¿Puedo cambiar de plan?', a: 'Sí, puedes subir o bajar de plan en cualquier momento. El cambio es inmediato y se prorratea.' },
            { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito/débito, transferencias bancarias y otros métodos según tu país.' },
          ].map((item, i) => (
            <div className="faq-item" key={i}>
              <h3><span className="faq-q-icon"><QuestionIcon /></span>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contacto">
        <div className="cta-banner">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a miles de clientes y empieza tu prueba de 24 horas hoy mismo.</p>
          <div className="cta-actions">
            <a href="mailto:ventas@streampro.com" className="button primary">
              <MailIcon /> Contactar ahora
            </a>
            <a href="#planes" className="button ghost">Ver todos los planes</a>
          </div>
          <p className="cta-note">Sin contratos · Demo de 24 horas · Cancela cuando quieras</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <a href="#" className="footer-brand">
          <div className="footer-logo"><TvIcon /></div>
          <span className="footer-name">StreamPro</span>
        </a>
        <span className="footer-copy">© {new Date().getFullYear()} StreamPro · Todos los derechos reservados</span>
        <div className="footer-links">
          <a href="#planes">Planes</a>
          <a href="#faq">FAQ</a>
          <a href="#contacto">Contacto</a>
        </div>
      </footer>

      {/* ── Floating Widgets ── */}
      <FloatingWhatsApp />
      <SalesNotifications />

    </div>
  )
}

export default App
