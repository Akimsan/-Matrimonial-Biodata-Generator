import React, { useRef, useState } from 'react';

export default function HoroscopeUpload({ image, onImageChange }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onImageChange(file, e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="col-image">
      <p className="col-label">🔯 ஜாதகம்<br />(Horoscope / Jathagam)</p>

      <div
        className="upload-box"
        style={{ borderColor: dragging ? 'var(--gold-dark)' : undefined }}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {image ? (
          <img src={image} alt="Horoscope" style={{ objectFit: 'contain' }} />
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">📄</span>
            <span className="upload-text">Drag & Drop<br />or Click to Upload<br />Horoscope Image</span>
          </div>
        )}
      </div>

      <label className="upload-btn-label">
        ✦ Choose Horoscope
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </label>

      {image && (
        <button
          onClick={() => onImageChange(null, null)}
          style={{
            background: 'none', border: '1px solid #c0392b', color: '#c0392b',
            padding: '4px 14px', borderRadius: '50px', fontSize: '0.75rem',
            cursor: 'pointer', marginTop: '-4px'
          }}
        >
          ✕ Remove
        </button>
      )}
    </div>
  );
}
