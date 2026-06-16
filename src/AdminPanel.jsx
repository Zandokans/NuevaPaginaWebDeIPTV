import { useState } from 'react';

// Iconos y helpers locales. Idealmente, se podrían mover a archivos de utilidades.
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function formatCLP(num) {
  return '$' + num.toLocaleString('es-CL');
}

function applyDiscount(base, pct) {
  if (!pct || pct <= 0) return { precio: formatCLP(base), discounted: false };
  const discounted = Math.round(base * (1 - pct / 100));
  return { precio: formatCLP(discounted), original: formatCLP(base), discounted: true };
}

const PLAN_COLORS = ['green', 'blue', 'purple', 'cyan', 'orange', 'red'];

export default function AdminPanel({ onClose, discount, setDiscount, producers, setProducers, users, setUsers, plans, setPlans }) {
  const [tab, setTab] = useState('usuarios');

  /* ── USUARIOS ── */
  const [uName, setUName] = useState('');
  const [uEmail, setUEmail] = useState('');
  const [uPhone, setUPhone] = useState('');
  const [uPlan, setUPlan] = useState('');
  const [uError, setUError] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault(); setUError('');
    if (!uName.trim() || !uEmail.trim()) { setUError('Nombre y correo son obligatorios.'); return; }
    setUsers(prev => [{ id: Date.now(), name: uName.trim(), email: uEmail.trim(), phone: uPhone.trim() || '—', plan: uPlan || plans[0]?.label || '1 Dispositivo', active: true, joined: new Date().toISOString().slice(0, 10) }, ...prev]);
    setUName(''); setUEmail(''); setUPhone(''); setUPlan('');
  };

  /* ── PRODUCTORES ── */
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const [formError, setFormError] = useState('');

  const handleAddProducer = (e) => {
    e.preventDefault(); setFormError('');
    if (!newName.trim() || !newEmail.trim()) { setFormError('Nombre y correo son obligatorios.'); return; }
    setProducers(prev => [{ id: Date.now(), name: newName.trim(), email: newEmail.trim(), phone: newPhone.trim() || '—', region: newRegion.trim() || '—', active: true, sales: 0 }, ...prev]);
    setNewName(''); setNewEmail(''); setNewPhone(''); setNewRegion('');
  };

  /* ── PLANES ── */
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [npLabel, setNpLabel] = useState('');
  const [npNum, setNpNum] = useState('');
  const [npColor, setNpColor] = useState('green');
  const [npError, setNpError] = useState('');

  const handleAddPlan = (e) => {
    e.preventDefault(); setNpError('');
    if (!npLabel.trim() || !npNum.trim()) { setNpError('Nombre y número de dispositivos son obligatorios.'); return; }
    const newPlan = {
      id: 'plan-' + Date.now(),
      label: npLabel.trim(),
      num: npNum.trim(),
      color: npColor,
      rows: [{ id: 'r-' + Date.now(), periodo: '1 MES', base: 2000 }],
    };
    setPlans(prev => [...prev, newPlan]);
    setNpLabel(''); setNpNum(''); setNpColor('green');
  };

  const handleDeletePlan = (planId) => setPlans(prev => prev.filter(p => p.id !== planId));

  const handleUpdatePlanField = (planId, field, value) =>
    setPlans(prev => prev.map(p => p.id === planId ? { ...p, [field]: value } : p));

  const handleUpdateRow = (planId, rowId, field, value) =>
    setPlans(prev => prev.map(p => p.id === planId
      ? { ...p, rows: p.rows.map(r => r.id === rowId ? { ...r, [field]: field === 'base' ? (parseInt(value) || 0) : value } : r) }
      : p
    ));

  const handleAddRow = (planId) =>
    setPlans(prev => prev.map(p => p.id === planId
      ? { ...p, rows: [...p.rows, { id: 'r-' + Date.now(), periodo: 'NUEVO PERIODO', base: 1000 }] }
      : p
    ));

  const handleDeleteRow = (planId, rowId) =>
    setPlans(prev => prev.map(p => p.id === planId
      ? { ...p, rows: p.rows.filter(r => r.id !== rowId) }
      : p
    ));

  /* ── DESCUENTO ── */
  const [discountInput, setDiscountInput] = useState(String(discount));
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyDiscount = () => {
    const val = parseFloat(discountInput);
    if (isNaN(val) || val < 0 || val > 100) return;
    setDiscount(val); setDiscountApplied(true);
    setTimeout(() => setDiscountApplied(false), 2000);
  };
  const handleRemoveDiscount = () => { setDiscount(0); setDiscountInput('0'); };

  return (
    <div className="admin-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal admin-modal-wide">
        <div className="admin-header">
          <div className="admin-title">
            <span className="admin-shield">🛡️</span>
            <div>
              <h2>Panel de Administrador</h2>
              <span>StreamPro Control Center</span>
            </div>
          </div>
          <button className="auth-close" onClick={onClose}><CloseIcon /></button>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab ${tab === 'usuarios' ? 'active' : ''}`} onClick={() => setTab('usuarios')}>👤 Usuarios ({users.length})</button>
          <button className={`admin-tab ${tab === 'productores' ? 'active' : ''}`} onClick={() => setTab('productores')}>👥 Productores ({producers.length})</button>
          <button className={`admin-tab ${tab === 'planes' ? 'active' : ''}`} onClick={() => setTab('planes')}>💲 Planes & Precios ({plans.length})</button>
          <button className={`admin-tab ${tab === 'descuento' ? 'active' : ''}`} onClick={() => setTab('descuento')}>🏷️ Descuentos</button>
        </div>

        <div className="admin-body">

          {/* ── USUARIOS TAB ── */}
          {tab === 'usuarios' && (
            <div className="admin-producers">
              <div className="admin-add-form">
                <h3 className="admin-section-title">➕ Agregar Usuario</h3>
                <form onSubmit={handleAddUser} className="admin-form-grid" noValidate>
                  <div className="admin-field"><label>Nombre *</label><input type="text" placeholder="Carlos Méndez" value={uName} onChange={e => setUName(e.target.value)} /></div>
                  <div className="admin-field"><label>Correo *</label><input type="text" placeholder="carlos@gmail.com" value={uEmail} onChange={e => setUEmail(e.target.value)} /></div>
                  <div className="admin-field"><label>Teléfono</label><input type="tel" placeholder="+56 9 0000 0000" value={uPhone} onChange={e => setUPhone(e.target.value)} /></div>
                  <div className="admin-field">
                    <label>Plan asignado</label>
                    <select value={uPlan} onChange={e => setUPlan(e.target.value)} className="admin-select">
                      {plans.map(p => <option key={p.id} value={p.label}>{p.label}</option>)}
                    </select>
                  </div>
                  {uError && <p className="admin-form-error">{uError}</p>}
                  <button type="submit" className="button primary admin-add-btn">Agregar Usuario</button>
                </form>
              </div>
              <div className="admin-list">
                <h3 className="admin-section-title">📌 Lista de Usuarios ({users.length})</h3>
                {users.length === 0 ? <p className="admin-empty">No hay usuarios registrados.</p> : (
                  <div className="admin-producer-list">
                    {users.map(u => (
                      <div key={u.id} className={`admin-producer-card ${!u.active ? 'inactive' : ''}`}>
                        <div className="apc-avatar" style={{ background: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' }}>{u.name.charAt(0).toUpperCase()}</div>
                        <div className="apc-info">
                          <strong>{u.name}</strong>
                          <span>{u.email}</span>
                          <div className="apc-meta">
                            <span>📞 {u.phone}</span>
                            <span>📦 {u.plan}</span>
                            <span>📅 {u.joined}</span>
                          </div>
                        </div>
                        <div className="apc-actions">
                          <button className={`apc-toggle ${u.active ? 'active' : ''}`} onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, active: !x.active } : x))}>
                            {u.active ? '✅ Activo' : '⏸️ Inactivo'}
                          </button>
                          <button className="apc-remove" onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}>🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PRODUCTORES TAB ── */}
          {tab === 'productores' && (
            <div className="admin-producers">
              <div className="admin-add-form">
                <h3 className="admin-section-title">➕ Agregar Productor</h3>
                <form onSubmit={handleAddProducer} className="admin-form-grid">
                  <div className="admin-field"><label>Nombre completo *</label><input type="text" placeholder="Juan Pérez" value={newName} onChange={e => setNewName(e.target.value)} /></div>
                  <div className="admin-field"><label>Correo *</label><input type="email" placeholder="juan@ejemplo.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} /></div>
                  <div className="admin-field"><label>Teléfono</label><input type="tel" placeholder="+56 9 1234 5678" value={newPhone} onChange={e => setNewPhone(e.target.value)} /></div>
                  <div className="admin-field"><label>Región</label><input type="text" placeholder="Santiago" value={newRegion} onChange={e => setNewRegion(e.target.value)} /></div>
                  {formError && <p className="admin-form-error">{formError}</p>}
                  <button type="submit" className="button primary admin-add-btn">Agregar Productor</button>
                </form>
              </div>
              <div className="admin-list">
                <h3 className="admin-section-title">📋 Productores ({producers.length})</h3>
                {producers.length === 0 ? <p className="admin-empty">No hay productores.</p> : (
                  <div className="admin-producer-list">
                    {producers.map(p => (
                      <div key={p.id} className={`admin-producer-card ${!p.active ? 'inactive' : ''}`}>
                        <div className="apc-avatar">{p.name.charAt(0).toUpperCase()}</div>
                        <div className="apc-info">
                          <strong>{p.name}</strong><span>{p.email}</span>
                          <div className="apc-meta"><span>📍 {p.region}</span><span>📞 {p.phone}</span><span>🛒 {p.sales} ventas</span></div>
                        </div>
                        <div className="apc-actions">
                          <button className={`apc-toggle ${p.active ? 'active' : ''}`} onClick={() => setProducers(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))}>{p.active ? '✅ Activo' : '⏸️ Inactivo'}</button>
                          <button className="apc-remove" onClick={() => setProducers(prev => prev.filter(x => x.id !== p.id))}>🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PLANES & PRECIOS TAB ── */}
          {tab === 'planes' && (
            <div className="admin-planes">
              <div className="admin-add-form">
                <h3 className="admin-section-title">➕ Agregar Nuevo Plan de Dispositivos</h3>
                <form onSubmit={handleAddPlan} className="admin-form-grid" noValidate>
                  <div className="admin-field"><label>Nombre del plan *</label><input type="text" placeholder="4 Dispositivos" value={npLabel} onChange={e => setNpLabel(e.target.value)} /></div>
                  <div className="admin-field"><label>Número de dispositivos *</label><input type="text" placeholder="4" value={npNum} onChange={e => setNpNum(e.target.value)} /></div>
                  <div className="admin-field">
                    <label>Color</label>
                    <div className="apl-color-row">
                      {PLAN_COLORS.map(c => (
                        <button key={c} type="button" className={`apl-color-dot apl-dot-${c} ${npColor === c ? 'selected' : ''}`} onClick={() => setNpColor(c)} title={c} />
                      ))}
                    </div>
                  </div>
                  {npError && <p className="admin-form-error">{npError}</p>}
                  <button type="submit" className="button primary admin-add-btn">➕ Crear Plan</button>
                </form>
              </div>

              <div className="admin-list">
                <h3 className="admin-section-title">✏️ Editar Planes ({plans.length})</h3>
                <div className="apl-list">
                  {plans.map(plan => (
                    <div key={plan.id} className={`apl-card apl-card-${plan.color}`}>
                      <div className="apl-card-header">
                        <div className="apl-card-title">
                          <div className={`apl-color-badge apl-dot-${plan.color}`} />
                          <div>
                            <input
                              className="apl-name-input"
                              value={plan.label}
                              onChange={e => handleUpdatePlanField(plan.id, 'label', e.target.value)}
                              placeholder="Nombre del plan"
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Dispositivos:</span>
                              <input
                                className="apl-num-input"
                                value={plan.num}
                                onChange={e => handleUpdatePlanField(plan.id, 'num', e.target.value)}
                                placeholder="Nº"
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <button
                            className="apl-toggle-edit"
                            onClick={() => setEditingPlanId(editingPlanId === plan.id ? null : plan.id)}
                          >
                            {editingPlanId === plan.id ? '✅ Listo' : '✏️ Editar'}
                          </button>
                          <button className="apc-remove" onClick={() => handleDeletePlan(plan.id)} title="Eliminar plan">🗑️</button>
                        </div>
                      </div>

                      <div className="apl-rows">
                        <div className="apl-rows-head">
                          <span>Periodo</span>
                          <span>Precio (CLP)</span>
                          {editingPlanId === plan.id && <span></span>}
                        </div>
                        {plan.rows.map(r => (
                          <div key={r.id} className="apl-row">
                            {editingPlanId === plan.id ? (
                              <>
                                <input
                                  className="apl-row-input"
                                  value={r.periodo}
                                  onChange={e => handleUpdateRow(plan.id, r.id, 'periodo', e.target.value)}
                                />
                                <input
                                  className="apl-row-input apl-price-input"
                                  type="number"
                                  value={r.base}
                                  min="0"
                                  onChange={e => handleUpdateRow(plan.id, r.id, 'base', e.target.value)}
                                />
                                <button className="apl-del-row" onClick={() => handleDeleteRow(plan.id, r.id)} title="Eliminar fila">✕</button>
                              </>
                            ) : (
                              <>
                                <span className="apl-row-label">{r.periodo}</span>
                                <span className="apl-row-price">{formatCLP(r.base)}</span>
                              </>
                            )}
                          </div>
                        ))}
                        {editingPlanId === plan.id && (
                          <button className="apl-add-row" onClick={() => handleAddRow(plan.id)}>➕ Agregar periodo</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DESCUENTO TAB ── */}
          {tab === 'descuento' && (
            <div className="admin-discount">
              <div className="admin-discount-hero">
                <div className="adh-icon">🏷️</div>
                <h3>Configurar Descuento Global</h3>
                <p>El descuento se aplica en tiempo real a todos los planes visibles en la página.</p>
              </div>
              <div className="admin-discount-current">
                <span>Descuento actual:</span>
                {discount > 0 ? <strong className="adc-active">{discount}% OFF activo 🔥</strong> : <strong className="adc-none">Sin descuento</strong>}
              </div>
              <div className="admin-discount-control">
                <label>Porcentaje de descuento</label>
                <div className="admin-discount-input-row">
                  <input type="number" min="0" max="100" step="1" value={discountInput} onChange={e => setDiscountInput(e.target.value)} placeholder="0" />
                  <span className="adc-pct">%</span>
                </div>
                <div className="admin-discount-presets">
                  {[5, 10, 15, 20, 25, 30].map(v => (
                    <button key={v} className={`adc-preset ${Number(discountInput) === v ? 'active' : ''}`} onClick={() => setDiscountInput(String(v))}>{v}%</button>
                  ))}
                </div>
                <div className="admin-discount-btns">
                  <button className={`button primary ${discountApplied ? 'applied' : ''}`} onClick={handleApplyDiscount}>
                    {discountApplied ? '✅ ¡Aplicado!' : '🚀 Aplicar Descuento'}
                  </button>
                  {discount > 0 && <button className="button secondary" onClick={handleRemoveDiscount}>✕ Quitar Descuento</button>}
                </div>
              </div>
              {discount > 0 && (
                <div className="admin-discount-preview">
                  <h4>Vista previa con {discount}% de descuento</h4>
                  <div className="adp-grid">
                    {plans.map(plan => (
                      <div key={plan.id} className="adp-card">
                        <div className="adp-plan-name">{plan.label}</div>
                        {plan.rows.map((r, i) => {
                          const info = applyDiscount(r.base, discount)
                          return (
                            <div key={r.id || i} className="adp-row">
                              <span>{r.periodo}</span>
                              <div><span className="adp-original">{formatCLP(r.base)}</span><span className="adp-new">{info.precio}</span></div>
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}