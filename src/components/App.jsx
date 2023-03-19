import styles from './App.module.css';

import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';

import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.find(c => c.name === name)) {
      return alert(`Użytkownik  ${name} już istnieje`);
    }
    const newContact = { id: nanoid(), name, number };
    setContacts([newContact, ...contacts]);
  };

  const getContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filterContacts = e => {
    setFilter(e.target.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Phonebook</h1>
      <Phonebook onSubmit={addContact} />
      <h2 className={styles.header}>Contacts</h2>
      <Filter value={filter} onChange={filterContacts} />
      <Contacts contacts={getContacts()} onDeleteContact={deleteContact} />
    </div>
  );
};

// componentDidMount() {
//   const savedContacts = localStorage.getItem('contacts');
//   const parsedContacts = JSON.parse(savedContacts);

//   if (parsedContacts) {
//     this.setState(({ contacts }) => ({ contacts: parsedContacts }));
//   }
// }

// componentDidUpdate(prevState) {
//   if (prevState.contacts !== this.state.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }
