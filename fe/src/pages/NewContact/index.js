import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactsForm';

export default function NewContact() {
  return (
    <>
      <PageHeader
        title="Novo contato"
      />
      <ContactForm buttonLabel="Cadastrar" />
    </>

  );
}
