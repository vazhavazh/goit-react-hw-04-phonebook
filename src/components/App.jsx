import React, { Component } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { AppStyled, H1, H2 } from './AppStyled';

const USER_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    const { name, number } = newContact;
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.some(contact => contact.number === number)) {
      alert(`${number} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };
  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem(USER_KEY);
    if (contacts && JSON.parse(contacts).length) {
      this.setState({
        contacts: JSON.parse(contacts),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(USER_KEY, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilterContacts();

    return (
      <>
        <AppStyled>
          <H1>Phonebook</H1>
          <ContactForm onSubmit={this.addContact} />
          <H2>Contacts</H2>
          <Filter value={filter} onChange={this.handleFilterChange} />
          <ContactList
            contacts={filteredContacts}
            onClick={this.handleDelete}
          />
        </AppStyled>
      </>
    );
  }
}
