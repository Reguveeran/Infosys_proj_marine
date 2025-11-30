import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './VoyageReplay.css';

const VoyageReplay = () => {
  const [searchParams] = useSearchParams();
  const vesselId = searchParams.get('vessel');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [voyageData, setVoyageData] = useState(null);

  useEffect(() => {
    // Mock voyage data - in real app, this would fetch from backend API
    const mockVoyage = {
      vesselId: vesselId || 1,
      vesselName: 'MV Ocean Star',
      startPort: 'Singapore',
      endPort: 'Rotterdam',
      startDate: '2024-01-15 08:00',
      endDate: '2024-02-15 14:30',
      waypoints: [
        { time: 0, lat: 1.3521, lng: 103.8198, speed: 18.5, course: 245 },
        { time: 24, lat: 5.0, lng: 100.0, speed: 20.1, course: 250 },
        { time: 48, lat: 10.0, lng: 95.0, speed: 19.8, course: 255 },
        { time: 72, lat: 15.0, lng: 90.0, speed: 21.2, course: 260 },
        { time: 96, lat: 20.0, lng: 85.0, speed: 20.5, course: 265 },
        { time: 120, lat: 25.0, lng: 60.0, speed: 19.9, course: 270 },
        { time: 144, lat: 30.0, lng: 50.0, speed: 18.7, course: 275 },
        { time: 168, lat: 35.0, lng: 40.0, speed: 20.3, course: 280 },
        { time: 192, lat: 40.0, lng: 30.0, speed: 19.5, course: 285 },
        { time: 216, lat: 45.0, lng: 20.0, speed: 18.2, course: 290 },
        { time: 240, lat: 50.0, lng: 10.0, speed: 17.8, course: 295 },
        { time: 264, lat: 51.9225, lng: 4.4775, speed: 0, course: 0 }
      ]
    };
    setVoyageData(mockVoyage);
  }, [vesselId]);

  useEffect(() => {
    if (isPlaying && voyageData) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const maxTime = Math.max(...voyageData.waypoints.map(w => w.time));
          if (prev >= maxTime) {
            setIsPlaying(false);
            return maxTime;
          }
          return prev + speed;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed, voyageData]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const getCurrentWaypoint = () => {
    if (!voyageData) return null;
    const waypoints = voyageData.waypoints;
    for (let i = waypoints.length - 1; i >= 0; i--) {
      if (waypoints[i].time <= currentTime) {
        return waypoints[i];
      }
    }
    return waypoints[0];
  };

  if (!voyageData) {
    return <div className="loading">Loading voyage data...</div>;
  }

  const currentWaypoint = getCurrentWaypoint();
  const maxTime = Math.max(...voyageData.waypoints.map(w => w.time));
  const progress = (currentTime / maxTime) * 100;

  return (
    <div className="voyage-replay-container">
      <div className="voyage-replay-header">
        <h1>Historical Voyage Replay</h1>
        <div className="voyage-info">
          <span><strong>Vessel:</strong> {voyageData.vesselName}</span>
          <span><strong>Route:</strong> {voyageData.startPort} → {voyageData.endPort}</span>
        </div>
      </div>

      <div className="replay-controls">
        <div className="control-group">
          <button onClick={handlePlayPause} className="play-pause-btn">
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button onClick={handleReset} className="reset-btn">
            ⏮️ Reset
          </button>
        </div>
        <div className="speed-controls">
          <label>Playback Speed:</label>
          <button 
            className={speed === 0.5 ? 'active' : ''} 
            onClick={() => handleSpeedChange(0.5)}
          >
            0.5x
          </button>
          <button 
            className={speed === 1 ? 'active' : ''} 
            onClick={() => handleSpeedChange(1)}
          >
            1x
          </button>
          <button 
            className={speed === 2 ? 'active' : ''} 
            onClick={() => handleSpeedChange(2)}
          >
            2x
          </button>
          <button 
            className={speed === 5 ? 'active' : ''} 
            onClick={() => handleSpeedChange(5)}
          >
            5x
          </button>
        </div>
        <div className="time-display">
          <span>Time: {currentTime}h / {maxTime}h</span>
        </div>
      </div>

      <div className="replay-content">
        <div className="map-view-replay">
          <div className="map-placeholder-replay">
            <div className="map-message">
              <h2>🌍 Voyage Map</h2>
              <p>Map showing voyage path from {voyageData.startPort} to {voyageData.endPort}</p>
              {currentWaypoint && (
                <div className="current-position">
                  <strong>Current Position:</strong> {currentWaypoint.lat.toFixed(4)}°, {currentWaypoint.lng.toFixed(4)}°
                </div>
              )}
            </div>
            <div className="voyage-path">
              {voyageData.waypoints.map((waypoint, index) => (
                <div
                  key={index}
                  className={`waypoint ${waypoint.time <= currentTime ? 'passed' : 'upcoming'}`}
                  style={{
                    left: `${(waypoint.lng + 180) / 360 * 100}%`,
                    top: `${(90 - waypoint.lat) / 180 * 100}%`
                  }}
                >
                  {waypoint.time <= currentTime ? '✓' : '○'}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="voyage-details-panel">
          <h3>Voyage Details</h3>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{progress.toFixed(1)}% Complete</span>
          </div>
          
          {currentWaypoint && (
            <div className="current-stats">
              <h4>Current Status</h4>
              <div className="stat-item">
                <strong>Speed:</strong> {currentWaypoint.speed} knots
              </div>
              <div className="stat-item">
                <strong>Course:</strong> {currentWaypoint.course}°
              </div>
              <div className="stat-item">
                <strong>Latitude:</strong> {currentWaypoint.lat.toFixed(4)}°
              </div>
              <div className="stat-item">
                <strong>Longitude:</strong> {currentWaypoint.lng.toFixed(4)}°
              </div>
            </div>
          )}

          <div className="voyage-timeline">
            <h4>Timeline</h4>
            <div className="timeline-items">
              <div className="timeline-item">
                <strong>Start:</strong> {voyageData.startDate}
              </div>
              <div className="timeline-item">
                <strong>End:</strong> {voyageData.endDate}
              </div>
              <div className="timeline-item">
                <strong>Duration:</strong> {maxTime} hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoyageReplay;

