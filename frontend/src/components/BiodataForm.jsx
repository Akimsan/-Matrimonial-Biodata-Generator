import React from 'react';

const FIELDS = [
  { name: 'name',       label: 'பெயர்',            placeholder: 'Full Name' },
  { name: 'age',        label: 'வயது',              placeholder: 'Age' },
  { name: 'height',     label: 'உயரம்',             placeholder: 'e.g. 5\'4"' },
  { name: 'education',  label: 'கல்வி',             placeholder: 'e.g. B.Sc, AL' },
  { name: 'job',        label: 'வேலை',              placeholder: 'Occupation' },
  { name: 'salary',     label: 'சம்பளம்',           placeholder: 'Salary / Month' },
  { name: 'rasi',       label: 'ராசி',              placeholder: 'e.g. மீனம்' },
  { name: 'nakshatra',  label: 'நட்சத்திரம்',       placeholder: 'e.g. பரணி' },
  { name: 'place',      label: 'இடம்',              placeholder: 'Hometown' },
  { name: 'preference', label: 'எதிர்பார்ப்பு',      placeholder: 'Expectation' },
  { name: 'contact',    label: 'தொடர்பு எண்',       placeholder: 'Contact Number' },
];

export default function BiodataForm({ formData, onChange }) {
  return (
    <div className="col-form">
      <p className="vivadam-label">விவரம்</p>

      {FIELDS.map(({ name, label, placeholder }) => (
        <div className={`form-field${name === 'contact' ? ' contact-field' : ''}`} key={name}>
          <label htmlFor={`field-${name}`}>{label} :</label>
          {name === 'preference' ? (
            <textarea
              id={`field-${name}`}
              rows="4"
              value={formData[name] || ''}
              placeholder={placeholder}
              onChange={(e) => onChange(name, e.target.value)}
              className="form-textarea"
            />
          ) : (
            <input
              id={`field-${name}`}
              type={name === 'contact' ? 'tel' : 'text'}
              value={formData[name] || ''}
              placeholder={placeholder}
              onChange={(name === 'contact') ? (e) => onChange(name, e.target.value.replace(/\D/g,'')) : (e) => onChange(name, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
