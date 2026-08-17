import ListCrud from './ListCrud';

const SocialLinksEditor = () => (
  <ListCrud
    title="Social Links"
    endpoint="/social-links"
    emptyItem={{ platform: '', url: '', order: 0 }}
    fields={[
      { key: 'platform', label: 'Platform (GitHub, LinkedIn, Email...)', type: 'text' },
      { key: 'url', label: 'URL', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
    ]}
    renderTitle={(item) => item.platform}
    renderSubtitle={(item) => item.url}
  />
);

export default SocialLinksEditor;
