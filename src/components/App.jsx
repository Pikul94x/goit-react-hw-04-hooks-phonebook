import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import styles from './App.module.css';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  );
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
};

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const searchName = value => {
    return contacts.find(
      item => item.name.toUpperCase() === value.toUpperCase()
    );
  };

  const formSubmitHandler = data => {
    const { name } = data;
    if (searchName(name)) {
      alert(`${name} is already in contacts`);
    } else {
      const contact = { ...data, id: nanoid() };
      setContacts(state => [...state, contact]);
    }
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = contactId => {
    setContacts(state => [
      ...state.filter(contact => contact.id !== contactId),
    ]);
    setFilter('');
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={styles.section}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmitContact={formSubmitHandler} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onRemoveContact={removeContact} />
    </div>
  );
};
