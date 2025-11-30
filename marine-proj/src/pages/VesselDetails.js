import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VesselDetails.css';

const VesselDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vessel, setVessel] = useState(null);

  useEffect(() => {
    // Mock data - in real app, this would fetch from backend API
    const mockVessel = {
      id: parseInt(id),
      name: 'MV Ocean Star',
      imo: 'IMO1234567',
      type: 'Container Ship',
      status: 'In Transit',
      flag: 'Singapore',
      speed: 18.5,
      course: 245,
      latitude: 1.3521,
      longitude: 103.8198,
      destination: 'Rotterdam',
      eta: '2024-02-15 14:30',
      length: 366,
      width: 51,
      draft: 14.5,
      grossTonnage: 147000,
      netTonnage: 132000,
      yearBuilt: 2018,
      owner: 'Ocean Shipping Lines',
      operator: 'Global Maritime Services'
    };
    setVessel(mockVessel);
  }, [id]);

  if (!vessel) {
    return <div className="loading">Loading vessel details...</div>;
  }

  return (
    <div className="vessel-details-container">
      <button className="back-btn" onClick={() => navigate('/vessels')}>
        ← Back to Vessels
      </button>
      
      <div className="vessel-details-header">
        <h1>{vessel.name}</h1>
        <span className={`status-badge ${vessel.status.toLowerCase().replace(' ', '-')}`}>
          {vessel.status}
        </span>
      </div>

      <div className="vessel-details-content">
        <div className="details-section">
          <h2>Basic Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>IMO Number:</strong>
              <span>{vessel.imo}</span>
            </div>
            <div className="info-item">
              <strong>Vessel Type:</strong>
              <span>{vessel.type}</span>
            </div>
            <div className="info-item">
              <strong>Flag:</strong>
              <span>{vessel.flag}</span>
            </div>
            <div className="info-item">
              <strong>Year Built:</strong>
              <span>{vessel.yearBuilt}</span>
            </div>
            <div className="info-item">
              <strong>Length:</strong>
              <span>{vessel.length} m</span>
            </div>
            <div className="info-item">
              <strong>Width:</strong>
              <span>{vessel.width} m</span>
            </div>
            <div className="info-item">
              <strong>Draft:</strong>
              <span>{vessel.draft} m</span>
            </div>
            <div className="info-item">
              <strong>Gross Tonnage:</strong>
              <span>{vessel.grossTonnage.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Current Position & Navigation</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Latitude:</strong>
              <span>{vessel.latitude.toFixed(4)}°</span>
            </div>
            <div className="info-item">
              <strong>Longitude:</strong>
              <span>{vessel.longitude.toFixed(4)}°</span>
            </div>
            <div className="info-item">
              <strong>Speed:</strong>
              <span>{vessel.speed} knots</span>
            </div>
            <div className="info-item">
              <strong>Course:</strong>
              <span>{vessel.course}°</span>
            </div>
            <div className="info-item">
              <strong>Destination:</strong>
              <span>{vessel.destination}</span>
            </div>
            <div className="info-item">
              <strong>ETA:</strong>
              <span>{vessel.eta}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Ownership & Operations</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Owner:</strong>
              <span>{vessel.owner}</span>
            </div>
            <div className="info-item">
              <strong>Operator:</strong>
              <span>{vessel.operator}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate(`/voyage-replay?vessel=${vessel.id}`)}>
              View Voyage History
            </button>
            <button className="action-btn" onClick={() => navigate(`/map?vessel=${vessel.id}`)}>
              View on Map
            </button>
            <button className="action-btn">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VesselDetails;

