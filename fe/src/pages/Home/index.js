import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Container, InputSearchContainer, Header, Card, ListHeader,
  ErrorContainer, EmptyListContainer, SearchNotFoundContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // eslint-disable-next-line max-len
  // OBS: useMemo deve ser usado sempre que vc quiser armazenar INFORMAÇÕES!! para armazenar funções deve ser usado o useCallback. isso porque ele foi feito exatamente para isso. diferente do useMemo (que executa uma func e armazena o valor dela), o useCallback vai armazenar a FUNÇÃO EM SI.

  const filteredContacts = useMemo(() => contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  ), [contacts, searchTerm]);

  // eslint-disable-next-line max-len
  // o hook abaixo vai criar a função encapsulada nela e armazena-la, fazendo com que ela só seja chamada e montada novamente se algum dos dados monitorados por ela sofrer alguma alteração. isso é importante porque, se passassemos a laodCotnacts pro arr de dependencias do useEffect, ele iria chamar ela em loop, pois toda vez que o react atualizasse a page, seria criada uma nova funcao, com novo endereço de memoria, e isso geraria um novo render.

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const ContactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts(ContactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? setOrderBy('desc') : setOrderBy('asc')),
    );
  }

  function handleChangeSearchTerm({ target }) {
    setSearchTerm(target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato"
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        // eslint-disable-next-line no-nested-ternary
        justifyContent={hasError
          ? 'flex-end'
          : (
            contacts.length > 0
              ? 'space-between'
              : 'center'
          )}
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos</strong>
            <Button type="button" onClick={handleTryAgain}> Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptyBox} alt="Empty box" />
            <p>
              Você ainda não tem nenhum contato cadastrado!
              Clique no botão
              <strong> Novo contato </strong>
              à cima para cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
          )}

          {(filteredContacts.length < 1 && contacts.length > 0) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="question" />
              <span>
                Nenhum contato encontrado para
                <strong>
                  {' '}
                  {searchTerm}
                </strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                  <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button">
                  <img src={trash} alt="Trash" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
