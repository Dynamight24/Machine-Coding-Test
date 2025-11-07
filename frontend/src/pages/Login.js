import React, { useState } from 'react';
import { login as apiLogin } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async e => {
    e.preventDefault();
    setMsg('Signing in...');
    const res = await apiLogin(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      nav('/dashboard');
    } else {
      setMsg(res.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
       
       <div className="auth-top">SIGN IN</div>

        <div className="avatar-circle" aria-hidden>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="rgba(255,255,255,0.6)"/>
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="rgba(255,255,255,0.06)"/>
          </svg>
        </div>

         

        <form onSubmit={submit} className="form" style={{paddingTop:6}}>
          <div>
            <div className="input-label">Email</div>
            <div className="input-wrap">
              <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@company.com" />
            </div>
          </div>

          <div>
            <div className="input-label">Password</div>
            <div className="input-wrap">
              <input name="password" type="password" value={form.password} onChange={onChange} required placeholder="Your password" />
            </div>
          </div>

          <button className="btn" type="submit">Login</button>
        </form>

        <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
          <button className="small" type="button" onClick={() => alert('Not implemented')}>Forgot?</button>
          <button className="small" type="button" onClick={() => { window.location = '/'; }}>Create account</button>
        </div>

        <div className="msg">{msg}</div>
      </div>
    </div>
  );
}
