import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  InputContainers,
  LabelStyled,
  InputStyled,
  Button,
} from './ContactFormStyled';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: new Date().getTime(),
      name,
      number,
    };
    onSubmit(newContact);
    reset();
  };

  const handleInputChange = e => {
    const { value, name } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
            break;
        
      default:
        break;
    }
    };
    return (
      <Form onSubmit={handleSubmit}>
        <InputContainers>
          <LabelStyled>Name</LabelStyled>
          <InputStyled
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <LabelStyled>Number</LabelStyled>
          <InputStyled
            onChange={handleInputChange}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </InputContainers>
        <Button type="submit">Add contact</Button>
      </Form>
    );
};
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
