import ListCrud from './ListCrud';

const ProjectsEditor = () => (
  <ListCrud
    title="Projects"
    endpoint="/projects"
    emptyItem={{
      title: '', description: '', features: [], technologies: [], liveDemo: '', github: '',
      challenges: '', learnings: '', featured: false, order: 0,
    }}
    fields={[
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'features', label: 'Features', type: 'array' },
      { key: 'technologies', label: 'Technologies', type: 'array' },
      { key: 'liveDemo', label: 'Live Demo URL', type: 'text' },
      { key: 'github', label: 'GitHub URL', type: 'text' },
      { key: 'challenges', label: 'Challenges', type: 'textarea' },
      { key: 'learnings', label: 'Learnings', type: 'textarea' },
      { key: 'featured', label: 'Featured Project', type: 'checkbox' },
      { key: 'order', label: 'Order', type: 'number' },
    ]}
    renderTitle={(item) => item.title}
    renderSubtitle={(item) => (item.technologies || []).join(', ')}
  />
);

export default ProjectsEditor;
