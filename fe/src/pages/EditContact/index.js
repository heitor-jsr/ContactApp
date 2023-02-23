import ContactForm from '../../components/ContactsForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  return (
    <>
      <PageHeader
        title="Editar Heitor José"
      />
      <ContactForm buttonLabel="Salvar alterações" />
    </>

  );
}
