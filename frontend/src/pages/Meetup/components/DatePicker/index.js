import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function ReactDatePicker({ name, placeholder }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, fieldName]);

  useEffect(() => {
    if (defaultValue) {
      setSelected(parseISO(defaultValue));
    }
  }, [defaultValue]);

  return (
    <>
      <DatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        timeCaption="time"
        dateFormat="d/MM/yyyy H:mm"
        ref={ref}
        placeholderText={placeholder}
        minDate={new Date()}
      />
      {error && <span>{error}</span>}
    </>
  );
}

ReactDatePicker.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

ReactDatePicker.defaultProps = {
  name: '',
  placeholder: '',
};
