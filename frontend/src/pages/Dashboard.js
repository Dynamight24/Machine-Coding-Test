import React from 'react';

const sampleUsers = [
  { id:1, name: 'Michael Holz', date: '04/10/2013', role:'Admin', status:'Active' },
  { id:2, name: 'Paula Wilson', date: '05/08/2014', role:'Publisher', status:'Active' },
  { id:3, name: 'Antonio Moreno', date: '11/05/2015', role:'Publisher', status:'Suspended' },
  { id:4, name: 'Mary Saveley', date: '06/09/2016', role:'Reviewer', status:'Active' },
  { id:5, name: 'Martin Sommer', date: '12/08/2017', role:'Moderator', status:'Inactive' }
];

function StatusDot({status}){
  const cls = status === 'Active' ? 'green' : status === 'Suspended' ? 'red' : 'orange';
  return <span className={'dot ' + cls} title={status}></span>;
}

export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location = '/login'; };

  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{margin:0}}>Users</h2>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <strong style={{marginRight:8}}>{user?.name}</strong>
          <button className="btn small" onClick={logout}>Logout</button>
        </div>
      </div>

      <p style={{color:'#586b6bff',marginTop:8}}>Manage users and roles</p>

      <div className="table-wrap">
        <table className="user-table">
          <thead>
            <tr><th>#</th><th>Name</th><th>Date Created</th><th>Role</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {sampleUsers.map(u => (
              <tr key={u.id} className="user-row">
                <td style={{width:36}}>{u.id}</td>
                <td>
                  <div className="user-info">
                    <img src={'https://i.pravatar.cc/150?img=' + (u.id+10)} alt="avatar" />
                    <div>
                      <div style={{fontWeight:600}}>{u.name}</div>
                      <div style={{fontSize:13,color:'#0e0e10ff'}}>{u.name.split(' ')[0].toLowerCase()}@example.com</div>
                    </div>
                  </div>
                </td>
                <td>{u.date}</td>
                <td>{u.role}</td>
                <td><StatusDot status={u.status} /> {u.status}</td>
                <td>
                  <button className="action-btn action-gear" title="Settings">⚙️</button>
                  <button className="action-btn action-delete" title="Delete">✖️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="page">Previous</div>
          <div className="page">1</div>
          <div className="page">2</div>
          <div className="page">Next</div>
        </div>
      </div>
    </div>
  );
}
