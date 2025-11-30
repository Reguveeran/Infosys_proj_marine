import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVessels: 0,
    activeVoyages: 0,
    ports: 0,
    events: 0
  });

  useEffect(() => {
    // Mock data - in real app, this would fetch from backend API
    setStats({
      totalVessels: 1247,
      activeVoyages: 342,
      ports: 89,
      events: 156
    });
  }, []);

  const statCards = [
    { title: 'Total Vessels', value: stats.totalVessels, icon: '🚢', color: '#1e3c72' },
    { title: 'Active Voyages', value: stats.activeVoyages, icon: '🌊', color: '#2a5298' },
    { title: 'Ports Monitored', value: stats.ports, icon: '⚓', color: '#3d6fb0' },
    { title: 'Recent Events', value: stats.events, icon: '📊', color: '#4d7fc8' }
  ];

  const recentVoyages = [
    { id: 1, vessel: 'MV Ocean Star', origin: 'Singapore', destination: 'Rotterdam', status: 'In Transit', progress: 65 },
    { id: 2, vessel: 'MV Atlantic Wave', origin: 'Shanghai', destination: 'Los Angeles', status: 'In Transit', progress: 42 },
    { id: 3, vessel: 'MV Pacific Breeze', origin: 'Hamburg', destination: 'New York', status: 'Docked', progress: 100 },
    { id: 4, vessel: 'MV Indian Ocean', origin: 'Dubai', destination: 'Mumbai', status: 'In Transit', progress: 78 }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p>Real-time marine vessel tracking and analytics</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: card.color }}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-content">
              <h3>{card.value.toLocaleString()}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Voyages</h2>
          <div className="voyages-table">
            <table>
              <thead>
                <tr>
                  <th>Vessel</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {recentVoyages.map(voyage => (
                  <tr key={voyage.id}>
                    <td><strong>{voyage.vessel}</strong></td>
                    <td>{voyage.origin}</td>
                    <td>{voyage.destination}</td>
                    <td>
                      <span className={`status-badge ${voyage.status.toLowerCase().replace(' ', '-')}`}>
                        {voyage.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${voyage.progress}%` }}
                        ></div>
                        <span className="progress-text">{voyage.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn">View All Vessels</button>
            <button className="action-btn">Port Analytics</button>
            <button className="action-btn">Safety Reports</button>
            <button className="action-btn">Export Data</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

