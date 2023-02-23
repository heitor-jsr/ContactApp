import PropTypes from 'prop-types';
import { useState } from 'react';
import formatPhone from '../../utils/formatPhone';
import FormGroup from '../FormGroup';
import useErrors from '../../hooks/useErrors';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';
import Button from '../Button';
import isEmailValid from '../../utils/validateEmail';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const ifFormValid = (name && errors.length === 0);

  function handleNameChange(event) {
    setName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          value={name}
          placeholder="Nome *"
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup
        error={getErrorMessageByFieldName('email')}
      >
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Telefone"
          maxLength="15"
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        >
          <option value="categoria">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
          <option value="facebook">Facebook</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" disabled={!ifFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
