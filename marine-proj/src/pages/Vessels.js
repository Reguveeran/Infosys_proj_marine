import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vessels.css';

const Vessels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  // Mock vessel data
  const vessels = [
    { id: 1, name: 'MV Ocean Star', imo: 'IMO1234567', type: 'Container Ship', status: 'In Transit', flag: 'Singapore', speed: 18.5 },
    { id: 2, name: 'MV Atlantic Wave', imo: 'IMO2345678', type: 'Bulk Carrier', status: 'In Transit', flag: 'Panama', speed: 22.3 },
    { id: 3, name: 'MV Pacific Breeze', imo: 'IMO3456789', type: 'Tanker', status: 'Docked', flag: 'Liberia', speed: 0 },
    { id: 4, name: 'MV Indian Ocean', imo: 'IMO4567890', type: 'Container Ship', status: 'In Transit', flag: 'Marshall Islands', speed: 15.2 },
    { id: 5, name: 'MV Mediterranean', imo: 'IMO5678901', type: 'Ro-Ro', status: 'Anchored', flag: 'Malta', speed: 0 },
    { id: 6, name: 'MV Arctic Explorer', imo: 'IMO6789012', type: 'Icebreaker', status: 'In Transit', flag: 'Norway', speed: 12.8 }
  ];

  const filteredVessels = vessels.filter(vessel => {
    const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vessel.imo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vessel.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleVesselClick = (vesselId) => {
    navigate(`/vessels/${vesselId}`);
  };

  return (
    <div className="vessels-container">
      <div className="vessels-header">
        <h1>Vessel Search & Details</h1>
        <p>Search and view detailed information about vessels</p>
      </div>

      <div className="vessels-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by vessel name or IMO number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="In Transit">In Transit</option>
            <option value="Docked">Docked</option>
            <option value="Anchored">Anchored</option>
          </select>
        </div>
      </div>

      <div className="vessels-grid">
        {filteredVessels.map(vessel => (
          <div 
            key={vessel.id} 
            className="vessel-card"
            onClick={() => handleVesselClick(vessel.id)}
          >
            <div className="vessel-card-header">
              <h3>{vessel.name}</h3>
              <span className={`status-badge ${vessel.status.toLowerCase().replace(' ', '-')}`}>
                {vessel.status}
              </span>
            </div>
            <div className="vessel-card-body">
              <div className="vessel-info-item">
                <strong>IMO:</strong> {vessel.imo}
              </div>
              <div className="vessel-info-item">
                <strong>Type:</strong> {vessel.type}
              </div>
              <div className="vessel-info-item">
                <strong>Flag:</strong> {vessel.flag}
              </div>
              <div className="vessel-info-item">
                <strong>Speed:</strong> {vessel.speed} knots
              </div>
            </div>
            <div className="vessel-card-footer">
              <button className="view-btn">View Details →</button>
            </div>
          </div>
        ))}
      </div>

      {filteredVessels.length === 0 && (
        <div className="no-results">
          <p>No vessels found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Vessels;

