import ListCrud from './ListCrud';

const CertificatesEditor = () => (
  <ListCrud
    title="Certificates"
    endpoint="/certificates"
    emptyItem={{ title: '', organization: '', date: '', description: '', image: '', order: 0 }}
    fields={[
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'organization', label: 'Organization', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'order', label: 'Order', type: 'number' },
    ]}
    renderTitle={(item) => item.title}
    renderSubtitle={(item) => `${item.organization} · ${item.date}`}
  />
);

export default CertificatesEditor;
