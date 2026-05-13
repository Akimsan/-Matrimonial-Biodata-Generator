import React, { forwardRef } from 'react';
import PhotoUpload from './PhotoUpload';
import BiodataForm from './BiodataForm';
import HoroscopeUpload from './HoroscopeUpload';

const BiodataCard = forwardRef(function BiodataCard(
  { formData, profileImage, horoscopeImage, onFormChange, onProfileChange, onHoroscopeChange },
  ref
) {
  return (
    <div className="biodata-card" ref={ref}>
      {/* ── Header ── */}
      <div className="card-header">
        <div className="card-header-inner">
          <span className="ring-icon">💍</span>
          <div>
            <div className="card-header-title">அம்மாளாச்சி திருமண சேவை</div>
            <div className="card-header-sub">Matrimonial Biodata Service</div>
          </div>
          <span className="ring-icon">💍</span>
        </div>
        <div className="gold-divider" />
      </div>

      {/* ── 3-Column Body: Left | Center | Right ── */}
      <div className="card-body">

        {/* LEFT: Profile Photo */}
        <PhotoUpload image={profileImage} onImageChange={onProfileChange} />

        {/* DIVIDER */}
        <div className="col-divider" />

        {/* CENTER: Form */}
        <BiodataForm
          formData={formData}
          onChange={onFormChange}
        />

        {/* DIVIDER */}
        <div className="col-divider" />

        {/* RIGHT: Horoscope */}
        <HoroscopeUpload image={horoscopeImage} onImageChange={onHoroscopeChange} />

      </div>
    </div>
  );
});

export default BiodataCard;
