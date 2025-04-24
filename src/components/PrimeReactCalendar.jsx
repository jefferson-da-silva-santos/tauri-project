import React from 'react';
import { useField } from 'formik';
import { Calendar } from 'primereact/calendar';
const PrimeReactCalendar = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <Calendar
        id={props.id || props.name}
        value={field.value}
        onChange={(e) => helpers.setValue(e.value)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default PrimeReactCalendar;