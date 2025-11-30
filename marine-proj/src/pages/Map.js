import React, { useState } from 'react';
import './Map.css';

const Map = () => {
  const [showSafetyOverlay, setShowSafetyOverlay] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState(null);

  // Mock vessel data
  const vessels = [
    { id: 1, name: 'MV Ocean Star', lat: 1.3521, lng: 103.8198, status: 'In Transit', speed: 18.5 },
    { id: 2, name: 'MV Atlantic Wave', lat: 31.2304, lng: 121.4737, status: 'In Transit', speed: 22.3 },
    { id: 3, name: 'MV Pacific Breeze', lat: 53.5511, lng: 9.9937, status: 'Docked', speed: 0 },
    { id: 4, name: 'MV Indian Ocean', lat: 25.2048, lng: 55.2708, status: 'In Transit', speed: 15.2 }
  ];

  const safetyZones = [
    { id: 1, name: 'Storm Warning Zone', lat: 10.0, lng: 100.0, radius: 50, type: 'warning' },
    { id: 2, name: 'High Traffic Area', lat: 1.3, lng: 103.8, radius: 30, type: 'info' }
  ];

  return (
    <div className="map-container">
      <div className="map-header">
        <h1>Interactive Ship Map</h1>
        <div className="map-controls">
          <button 
            className={`control-btn ${showSafetyOverlay ? 'active' : ''}`}
            onClick={() => setShowSafetyOverlay(!showSafetyOverlay)}
          >
            {showSafetyOverlay ? '🔴' : '⚪'} Safety Overlays
          </button>
          <button className="control-btn">🔍 Search</button>
          <button className="control-btn">📊 Filters</button>
        </div>
      </div>

      <div className="map-wrapper">
        <div className="map-view">
          {/* This would be a real map component (e.g., Google Maps, Leaflet, Mapbox) */}
          <div className="map-placeholder">
            <div className="map-message">
              <h2>🌍 Interactive Map</h2>
              <p>Map integration would go here (Google Maps, Leaflet, or Mapbox)</p>
              <div className="mock-vessels">
                {vessels.map(vessel => (
                  <div
                    key={vessel.id}
                    className={`vessel-marker ${vessel.status.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setSelectedVessel(vessel)}
                    style={{
                      left: `${(vessel.lng + 180) / 360 * 100}%`,
                      top: `${(90 - vessel.lat) / 180 * 100}%`
                    }}
                  >
                    🚢
                  </div>
                ))}
                {showSafetyOverlay && safetyZones.map(zone => (
                  <div
                    key={zone.id}
                    className={`safety-zone ${zone.type}`}
                    style={{
                      left: `${(zone.lng + 180) / 360 * 100}%`,
                      top: `${(90 - zone.lat) / 180 * 100}%`
                    }}
                  >
                    {zone.type === 'warning' ? '⚠️' : 'ℹ️'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedVessel && (
          <div className="vessel-details-panel">
            <button className="close-btn" onClick={() => setSelectedVessel(null)}>×</button>
            <h3>{selectedVessel.name}</h3>
            <div className="detail-item">
              <strong>Status:</strong>
              <span className={`status-badge ${selectedVessel.status.toLowerCase().replace(' ', '-')}`}>
                {selectedVessel.status}
              </span>
            </div>
            <div className="detail-item">
              <strong>Speed:</strong> {selectedVessel.speed} knots
            </div>
            <div className="detail-item">
              <strong>Position:</strong> {selectedVessel.lat.toFixed(4)}, {selectedVessel.lng.toFixed(4)}
            </div>
            <button className="view-details-btn">View Full Details</button>
          </div>
        )}

        <div className="map-legend">
          <h4>Legend</h4>
          <div className="legend-item">
            <span className="legend-marker in-transit">🚢</span>
            <span>In Transit</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker docked">🚢</span>
            <span>Docked</span>
          </div>
          {showSafetyOverlay && (
            <>
              <div className="legend-item">
                <span className="legend-marker warning">⚠️</span>
                <span>Warning Zone</span>
              </div>
              <div className="legend-item">
                <span className="legend-marker info">ℹ️</span>
                <span>Info Zone</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;

