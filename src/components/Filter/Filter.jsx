import React from 'react';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';

export default function Filter({ value, onChange }) {
  return (
    <div>
      <label>
        <h2 className={styles.title}>Find contact by name</h2>
        <input
          type="text"
          value={value}
          onInput={onChange}
          className={styles.input}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
    </div>
  );
}
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
