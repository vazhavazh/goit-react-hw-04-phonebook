import { useState, useEffect } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { AppStyled, H1, H2 } from './AppStyled';

const USER_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem(USER_KEY);
    if (contacts && JSON.parse(contacts).length) {
      setContacts(JSON.parse(contacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(contacts));
  }, [contacts]);

  
  const addContact = newContact => {
    const { name } = newContact;
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const result = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
    return result;
  };

  const filteredContacts = getFilterContacts();

  return (
    <>
      <AppStyled>
        <H1>Phonebook</H1>
        <ContactForm onSubmit={addContact} />
        <H2>Contacts</H2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onClick={handleDelete} />
      </AppStyled>
    </>
  );
};
