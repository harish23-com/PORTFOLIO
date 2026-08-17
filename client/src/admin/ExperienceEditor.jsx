import ListCrud from './ListCrud';

const ExperienceEditor = () => (
  <ListCrud
    title="Experience"
    endpoint="/experience"
    emptyItem={{ role: '', company: '', location: '', startDate: '', endDate: '', description: [], order: 0 }}
    fields={[
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'startDate', label: 'Start Date', type: 'text' },
      { key: 'endDate', label: 'End Date', type: 'text' },
      { key: 'description', label: 'Bullet Points', type: 'array' },
      { key: 'order', label: 'Order', type: 'number' },
    ]}
    renderTitle={(item) => item.role}
    renderSubtitle={(item) => `${item.company} · ${item.startDate} - ${item.endDate}`}
  />
);

export default ExperienceEditor;
