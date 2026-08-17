import ListCrud from './ListCrud';

const categories = ['Frontend', 'Backend', 'Database', 'Programming Languages', 'Authentication', 'API Development', 'Version Control', 'Tools'];

const SkillsEditor = () => (
  <ListCrud
    title="Skills"
    endpoint="/skills"
    emptyItem={{ name: '', category: '', level: 70, order: 0 }}
    fields={[
      { key: 'name', label: 'Skill Name', type: 'text' },
      { key: 'category', label: 'Category', type: 'select', options: categories },
      { key: 'level', label: 'Level (0-100)', type: 'number' },
      { key: 'order', label: 'Order', type: 'number' },
    ]}
    renderTitle={(item) => item.name}
    renderSubtitle={(item) => `${item.category} · ${item.level}%`}
  />
);

export default SkillsEditor;
