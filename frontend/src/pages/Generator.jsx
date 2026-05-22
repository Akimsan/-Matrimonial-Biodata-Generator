import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import BiodataCard from '../components/BiodataCard';

const INITIAL_FORM = {
  name: '', age: '', height: '', education: '',
  job: '', salary: '', rasi: '', nakshatra: '',
  place: '', preference: '', contact: '',
};

export default function App() {
  const cardRef = useRef(null);
  const [formData, setFormData]           = useState(INITIAL_FORM);
  const [profileFile, setProfileFile]     = useState(null);
  const [profileImage, setProfileImage]   = useState(null);
  const [horoscopeFile, setHoroscopeFile] = useState(null);
  const [horoscopeImage, setHoroscopeImage] = useState(null);
  const [saving, setSaving]               = useState(false);
  const [savedMsg, setSavedMsg]           = useState('');
  const [isExporting, setIsExporting]     = useState(false);

  /* ── Handlers ── */
  const handleFormChange = (name, value) =>
    setFormData(prev => ({ ...prev, [name]: value }));

  const handleProfileChange = (file, dataUrl) => {
    setProfileFile(file);
    setProfileImage(dataUrl);
  };

  const handleHoroscopeChange = (file, dataUrl) => {
    setHoroscopeFile(file);
    setHoroscopeImage(dataUrl);
  };

  /* ── Capture helpers ── */
  const captureCanvas = async () => {
    setIsExporting(true);
    // Wait one frame so React re-renders and hides the buttons before capture
    await new Promise(r => setTimeout(r, 100));
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fdf6e3',
      logging: false,
    });
    setIsExporting(false);
    return canvas;
  };

  /* ── Download as PDF ── */
  const downloadPDF = async () => {
    try {
      const canvas = await captureCanvas();
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save('biodata.pdf');
    } catch (err) {
      alert('PDF export failed: ' + err.message);
    }
  };

  /* ── Download as JPEG ── */
  const downloadJPEG = async () => {
    try {
      const canvas = await captureCanvas();
      const link = document.createElement('a');
      link.download = 'biodata.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (err) {
      alert('JPEG export failed: ' + err.message);
    }
  };

  /* ── Save to MongoDB ── */
  const saveToDB = async () => {
    setSaving(true);
    setSavedMsg('');
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      if (profileFile)   fd.append('profileImage', profileFile);
      if (horoscopeFile) fd.append('horoscopeImage', horoscopeFile);

      await axios.post('/api/biodata', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSavedMsg('✅ Saved successfully!');
    } catch (err) {
      setSavedMsg('❌ Save failed. Is the backend running?');
    } finally {
      setSaving(false);
      setTimeout(() => setSavedMsg(''), 4000);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Page heading */}
      <h1 className="page-title-bar">
        💍 Tamil Matrimonial Biodata Generator
      </h1>

      {/* Action buttons */}
      <div className="action-bar">
        <button id="btn-pdf"  className="btn btn-pdf"  onClick={downloadPDF}>
          📄 Download PDF
        </button>
        <button id="btn-jpg"  className="btn btn-jpg"  onClick={downloadJPEG}>
          🖼️ Download JPEG
        </button>
        <button id="btn-save" className="btn btn-save" onClick={saveToDB} disabled={saving}>
          {saving ? '⏳ Saving…' : '💾 Save to Database'}
        </button>
      </div>

      {savedMsg && (
        <div style={{
          padding: '10px 24px', borderRadius: '50px',
          background: savedMsg.startsWith('✅') ? '#27ae60' : '#c0392b',
          color: '#fff', fontWeight: 600, fontSize: '0.9rem',
        }}>
          {savedMsg}
        </div>
      )}

      {/* The printable card */}
      <BiodataCard
        ref={cardRef}
        formData={formData}
        profileImage={profileImage}
        horoscopeImage={horoscopeImage}
        onFormChange={handleFormChange}
        onProfileChange={handleProfileChange}
        onHoroscopeChange={handleHoroscopeChange}
        isExporting={isExporting}
      />

      <p style={{ color: '#c9a84c', fontSize: '0.8rem', opacity: 0.7 }}>
        Fill in the details, upload photos, then download as PDF or JPEG.
      </p>
    </div>
  );
}
