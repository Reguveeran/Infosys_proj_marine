import React, { useState, useEffect } from 'react';
import './Ports.css';

const Ports = () => {
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);

  useEffect(() => {
    // Mock data - in real app, this would fetch from backend API
    const mockPorts = [
      { 
        id: 1, 
        name: 'Port of Singapore', 
        country: 'Singapore', 
        congestion: 45, 
        vesselsWaiting: 12,
        avgWaitTime: 18,
        capacity: 80,
        status: 'moderate'
      },
      { 
        id: 2, 
        name: 'Port of Rotterdam', 
        country: 'Netherlands', 
        congestion: 72, 
        vesselsWaiting: 28,
        avgWaitTime: 36,
        capacity: 65,
        status: 'high'
      },
      { 
        id: 3, 
        name: 'Port of Shanghai', 
        country: 'China', 
        congestion: 88, 
        vesselsWaiting: 45,
        avgWaitTime: 48,
        capacity: 55,
        status: 'critical'
      },
      { 
        id: 4, 
        name: 'Port of Los Angeles', 
        country: 'USA', 
        congestion: 35, 
        vesselsWaiting: 8,
        avgWaitTime: 12,
        capacity: 85,
        status: 'low'
      },
      { 
        id: 5, 
        name: 'Port of Hamburg', 
        country: 'Germany', 
        congestion: 58, 
        vesselsWaiting: 15,
        avgWaitTime: 24,
        capacity: 75,
        status: 'moderate'
      },
      { 
        id: 6, 
        name: 'Port of Dubai', 
        country: 'UAE', 
        congestion: 42, 
        vesselsWaiting: 10,
        avgWaitTime: 16,
        capacity: 82,
        status: 'low'
      }
    ];
    setPorts(mockPorts);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'low': return '#4caf50';
      case 'moderate': return '#ff9800';
      case 'high': return '#f44336';
      case 'critical': return '#d32f2f';
      default: return '#999';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="ports-container">
      <div className="ports-header">
        <h1>Port Congestion Dashboard</h1>
        <p>Real-time port congestion and vessel waiting times</p>
      </div>

      <div className="ports-grid">
        {ports.map(port => (
          <div 
            key={port.id} 
            className="port-card"
            onClick={() => setSelectedPort(port)}
          >
            <div className="port-card-header">
              <h3>{port.name}</h3>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(port.status) }}
              >
                {getStatusLabel(port.status)}
              </span>
            </div>
            <div className="port-card-body">
              <div className="port-stat">
                <div className="stat-label">Congestion Level</div>
                <div className="stat-value">{port.congestion}%</div>
                <div className="progress-bar-small">
                  <div 
                    className="progress-fill-small" 
                    style={{ 
                      width: `${port.congestion}%`,
                      backgroundColor: getStatusColor(port.status)
                    }}
                  ></div>
                </div>
              </div>
              <div className="port-stats-grid">
                <div className="port-stat-item">
                  <strong>Vessels Waiting:</strong>
                  <span>{port.vesselsWaiting}</span>
                </div>
                <div className="port-stat-item">
                  <strong>Avg Wait Time:</strong>
                  <span>{port.avgWaitTime}h</span>
                </div>
                <div className="port-stat-item">
                  <strong>Capacity:</strong>
                  <span>{port.capacity}%</span>
                </div>
                <div className="port-stat-item">
                  <strong>Country:</strong>
                  <span>{port.country}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPort && (
        <div className="port-details-modal" onClick={() => setSelectedPort(null)}>
          <div className="port-details-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedPort(null)}>×</button>
            <h2>{selectedPort.name}</h2>
            <div className="port-details-grid">
              <div className="detail-section">
                <h3>Congestion Metrics</h3>
                <div className="metric-item">
                  <strong>Congestion Level:</strong>
                  <span>{selectedPort.congestion}%</span>
                </div>
                <div className="metric-item">
                  <strong>Capacity Utilization:</strong>
                  <span>{selectedPort.capacity}%</span>
                </div>
                <div className="metric-item">
                  <strong>Status:</strong>
                  <span style={{ color: getStatusColor(selectedPort.status) }}>
                    {getStatusLabel(selectedPort.status)}
                  </span>
                </div>
              </div>
              <div className="detail-section">
                <h3>Vessel Information</h3>
                <div className="metric-item">
                  <strong>Vessels Waiting:</strong>
                  <span>{selectedPort.vesselsWaiting}</span>
                </div>
                <div className="metric-item">
                  <strong>Average Wait Time:</strong>
                  <span>{selectedPort.avgWaitTime} hours</span>
                </div>
              </div>
              <div className="detail-section">
                <h3>Location</h3>
                <div className="metric-item">
                  <strong>Country:</strong>
                  <span>{selectedPort.country}</span>
                </div>
              </div>
            </div>
            <button className="view-analytics-btn">View Detailed Analytics</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ports;

