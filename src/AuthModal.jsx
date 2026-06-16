import { useState } from 'react'
import { TvIcon, CloseIcon, UserIcon, MailInputIcon, LockIcon, EyeIcon } from './Icons'

export default function AuthModal({ onClose, onOpenAdminPanel, users, setUsers, loggedInUser, setLoggedInUser }) {
  const [tab, setTab] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [userInput, setUserInput] = useState('')
  const [passInput, setPassInput] = useState('')

  // Registro
  const [regName, setRegName] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginError('')

    if (tab === 'register') {
      if (!regName.trim() || !userInput.trim() || !regPassword.trim()) {
        setLoginError('fields_required')
        return
      }
      if (regPassword !== regConfirmPassword) {
        setLoginError('passwords_dont_match')
        return
      }
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      if (tab === 'login') {
        if (userInput === 'Admin12345' && passInput === 'Admin12345') {
          setIsAdmin(true)
          setSuccess(true)
          setLoggedInUser({ name: 'Administrador', email: 'admin@streampro.com', role: 'admin' })
        } else {
          const foundUser = users.find(u => u.email.toLowerCase() === userInput.toLowerCase() || u.name.toLowerCase() === userInput.toLowerCase())
          if (foundUser) {
            if (!foundUser.active) {
              setLoginError('inactive')
            } else {
              setIsAdmin(false)
              setSuccess(true)
              setLoggedInUser(foundUser)
            }
          } else {
            setLoginError('not_found')
          }
        }
      } else {
        // Registrar usuario
        const newUser = {
          id: Date.now(),
          name: regName.trim(),
          email: userInput.trim(),
          phone: '—',
          plan: '1 Dispositivo',
          active: true,
          joined: new Date().toISOString().slice(0, 10)
        }
        setUsers(prev => [newUser, ...prev])
        setIsAdmin(false)
        setSuccess(true)
        setLoggedInUser(newUser)
      }
    }, 1200)
  }

  const handleReset = () => {
    setSuccess(false); setIsAdmin(false)
    setUserInput(''); setPassInput('')
    setRegName(''); setRegPassword(''); setRegConfirmPassword('')
    setLoginError('')
  }

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`auth-modal ${loggedInUser && loggedInUser.role === 'admin' ? 'auth-modal-admin' : ''}`}>
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

        {/* Tabs — ocultos cuando hay un usuario logueado */}
        {!loggedInUser && (
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => { setTab('login'); handleReset() }}
            >Iniciar sesión</button>
            <button
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => { setTab('register'); handleReset() }}
            >Crear cuenta</button>
          </div>
        )}

        {/* Body */}
        <div className="auth-body">
          {loggedInUser ? (
            loggedInUser.role === 'admin' ? (
              /* ── PERFIL ADMINISTRADOR ── */
              <div className="admin-profile">
                {/* Avatar & nombre */}
                <div className="ap-hero">
                  <div className="ap-avatar">
                    <span>A</span>
                    <span className="ap-badge">🛡️</span>
                  </div>
                  <div className="ap-info">
                    <h3>Administrador</h3>
                    <span className="ap-role">Super Admin · StreamPro</span>
                    <span className="ap-user">@Admin1234</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="ap-stats">
                  <div className="ap-stat">
                    <strong>{users.length}</strong>
                    <span>Usuarios</span>
                  </div>
                  <div className="ap-stat">
                    <strong>265</strong>
                    <span>Ventas totales</span>
                  </div>
                  <div className="ap-stat">
                    <strong>99.9%</strong>
                    <span>Uptime</span>
                  </div>
                  <div className="ap-stat">
                    <strong>24/7</strong>
                    <span>Activo</span>
                  </div>
                </div>

                {/* Info rows */}
                <div className="ap-details">
                  <div className="ap-detail-row">
                    <span className="ap-detail-label">Usuario</span>
                    <span className="ap-detail-val">Admin1234</span>
                  </div>
                  <div className="ap-detail-row">
                    <span className="ap-detail-label">Rol</span>
                    <span className="ap-detail-val ap-role-badge">🛡️ Administrador</span>
                  </div>
                  <div className="ap-detail-row">
                    <span className="ap-detail-label">Acceso</span>
                    <span className="ap-detail-val" style={{ color: '#34d399' }}>✅ Completo</span>
                  </div>
                  <div className="ap-detail-row">
                    <span className="ap-detail-label">Último acceso</span>
                    <span className="ap-detail-val">Ahora mismo</span>
                  </div>
                </div>

                {/* Acciones rápidas */}
                <div className="ap-actions">
                  <button
                    className="button primary ap-action-btn"
                    onClick={() => { onClose(); onOpenAdminPanel && onOpenAdminPanel() }}
                  >
                    🛡️ Abrir Panel Admin
                  </button>
                  <button className="button secondary ap-action-btn" onClick={onClose}>
                    Continuar al sitio
                  </button>
                </div>

                <button className="ap-logout" onClick={() => { setLoggedInUser(null); handleReset() }}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              /* ── PERFIL USUARIO NORMAL ── */
              <div className="admin-profile user-profile">
                {/* Avatar & nombre */}
                <div className="ap-hero">
                  <div className="ap-avatar" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}>
                    <span>{loggedInUser.name.charAt(0).toUpperCase()}</span>
                    <span className="ap-badge">⚡</span>
                  </div>
                  <div className="ap-info">
                    <h3>{loggedInUser.name}</h3>
                    <span className="ap-role">Cliente VIP StreamPro</span>
                    <span className="ap-user">{loggedInUser.email}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="ap-stats">
                  <div className="ap-stat">
                    <strong>{loggedInUser.plan}</strong>
                    <span>Plan Activo</span>
                  </div>
                  <div className="ap-stat" style={{ color: '#34d399' }}>
                    <strong>✔ Activo</strong>
                    <span>Estado</span>
                  </div>
                  <div className="ap-stat">
                    <strong>1</strong>
                    <span>Disps. Conectados</span>
                  </div>
                </div>

                {/* Info rows */}
                <div className="ap-details">
                  <div className="ap-detail-row">
                    <span className="ap-detail-label">Correo</span>
                    <span className="ap-detail-val">{loggedInUser.email}</span>
                  </div>
                  <div className="ap-detail-row">
                    <span className="ap-detail-label">Teléfono</span>
                    <span className="ap-detail-val">{loggedInUser.phone || '—'}</span>
                  </div>
                  <div className="ap-detail-row">
                    <span className="ap-detail-label">Fecha de registro</span>
                    <span className="ap-detail-val">{loggedInUser.joined}</span>
                  </div>
                </div>

                {/* Acciones rápidas */}
                <div className="ap-actions">
                  <button className="button primary ap-action-btn" onClick={onClose}>
                    Comenzar a ver canales
                  </button>
                </div>

                <button className="ap-logout" onClick={() => { setLoggedInUser(null); handleReset() }}>
                  Cerrar sesión
                </button>
              </div>
            )
          ) : (
            /* ── FORMULARIO ── */
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {tab === 'register' && (
                <div className="auth-field">
                  <label>Nombre completo</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><UserIcon /></span>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      autoComplete="name"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label>{tab === 'login' ? 'Usuario o correo' : 'Correo electrónico'}</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><MailInputIcon /></span>
                  <input
                    type="text"
                    placeholder={tab === 'login' ? 'correo o usuario' : 'correo@ejemplo.com'}
                    required
                    autoComplete="username"
                    value={userInput}
                    onChange={e => { setUserInput(e.target.value); setLoginError('') }}
                  />
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
                    value={tab === 'login' ? passInput : regPassword}
                    onChange={e => {
                      if (tab === 'login') setPassInput(e.target.value)
                      else setRegPassword(e.target.value)
                      setLoginError('')
                    }}
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
                      value={regConfirmPassword}
                      onChange={e => { setRegConfirmPassword(e.target.value); setLoginError('') }}
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

              {loginError === 'not_found' && (
                <p className="auth-login-error">❌ Usuario o contraseña incorrectos.</p>
              )}

              {loginError === 'inactive' && (
                <p className="auth-login-error">⚠️ Tu cuenta está inactiva. Contacta a soporte para reactivar tu servicio.</p>
              )}

              {loginError === 'passwords_dont_match' && (
                <p className="auth-login-error">❌ Las contraseñas no coinciden.</p>
              )}

              {loginError === 'fields_required' && (
                <p className="auth-login-error">❌ Por favor completa todos los campos obligatorios.</p>
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