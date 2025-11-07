import React, { useState } from 'react';
import { register as apiRegister } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', dob:'', email:'', password:'' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async e => {
    e.preventDefault();
    setMsg('Submitting...');
    const res = await apiRegister(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      // keep original behavior (navigate to login after register)
      nav('/login');
    } else {
      setMsg(res.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="auth-top">SIGN UP</div>

        <div className="avatar-circle" aria-hidden>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="rgba(255,255,255,0.6)"/>
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="rgba(255,255,255,0.06)"/>
          </svg>
        </div>

        <form onSubmit={submit} className="form" style={{paddingTop:6}}>
          <div>
            <div className="input-label">Full name</div>
            <div className="input-wrap">
              <input name="name" value={form.name} onChange={onChange} required placeholder="Your full name" />
            </div>
          </div>

          <div>
            <div className="input-label">Date of birth</div>
            <div className="input-wrap">
              <input name="dob" type="date" value={form.dob} onChange={onChange} required />
            </div>
          </div>

          <div>
            <div className="input-label">Email</div>
            <div className="input-wrap">
              <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@company.com" />
            </div>
          </div>

          <div>
            <div className="input-label">Password</div>
            <div className="input-wrap">
              <input name="password" type="password" value={form.password} onChange={onChange} required placeholder="Choose a password" />
            </div>
          </div>

          <button className="btn" type="submit">Register</button>
        </form>

        <div className="msg">{msg}</div>
      </div>
    </div>
  );
}
