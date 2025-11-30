import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    // Mock data - in real app, this would fetch from backend API
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-20' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-19' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-15' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-20' }
    ];

    const mockEvents = [
      { id: 1, type: 'Vessel Alert', description: 'MV Ocean Star entered restricted zone', timestamp: '2024-01-20 10:30', severity: 'high' },
      { id: 2, type: 'Port Update', description: 'Port of Singapore congestion increased', timestamp: '2024-01-20 09:15', severity: 'medium' },
      { id: 3, type: 'System', description: 'Data sync completed successfully', timestamp: '2024-01-20 08:00', severity: 'low' },
      { id: 4, type: 'Vessel Alert', description: 'MV Atlantic Wave delayed arrival', timestamp: '2024-01-19 18:45', severity: 'medium' }
    ];

    setUsers(mockUsers);
    setEvents(mockEvents);
  }, []);

  const handleUserAction = (userId, action) => {
    // In real app, this would call backend API
    console.log(`${action} user ${userId}`);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#999';
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="admin-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You need administrator privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users, events, and system settings</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button 
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="admin-section">
            <h2>User Management</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="action-buttons-small">
                          <button 
                            className="edit-btn"
                            onClick={() => handleUserAction(user.id, 'edit')}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleUserAction(user.id, 'delete')}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="admin-section">
            <h2>System Events</h2>
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-header">
                    <span className="event-type">{event.type}</span>
                    <span 
                      className="event-severity"
                      style={{ backgroundColor: getSeverityColor(event.severity) }}
                    >
                      {event.severity}
                    </span>
                  </div>
                  <div className="event-description">{event.description}</div>
                  <div className="event-timestamp">{event.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-section">
            <h2>System Settings</h2>
            <div className="settings-form">
              <div className="setting-item">
                <label>API Refresh Rate (seconds)</label>
                <input type="number" defaultValue="30" />
              </div>
              <div className="setting-item">
                <label>Max Vessels Display</label>
                <input type="number" defaultValue="1000" />
              </div>
              <div className="setting-item">
                <label>Enable Email Notifications</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="setting-item">
                <label>Data Retention (days)</label>
                <input type="number" defaultValue="90" />
              </div>
              <button className="save-settings-btn">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

