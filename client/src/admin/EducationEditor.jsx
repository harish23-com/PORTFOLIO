import ListCrud from './ListCrud';

const EducationEditor = () => (
  <ListCrud
    title="Education"
    endpoint="/education"
    emptyItem={{ degree: '', institution: '', startYear: '', endYear: '', description: '', order: 0 }}
    fields={[
      { key: 'degree', label: 'Degree', type: 'text' },
      { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'startYear', label: 'Start Year', type: 'text' },
      { key: 'endYear', label: 'End Year', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'order', label: 'Order', type: 'number' },
    ]}
    renderTitle={(item) => item.degree}
    renderSubtitle={(item) => `${item.institution} · ${item.startYear} - ${item.endYear}`}
  />
);

export default EducationEditor;
