export const siteUrl = 'https://freddiephilpot.dev';
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export interface ArticleMetadata {
  published: string;
  modified?: string;
}

export function structuredData({
  canonical,
  title,
  description,
  article,
  modified,
}: {
  canonical: URL;
  title: string;
  description: string;
  article?: ArticleMetadata;
  modified?: string;
}) {
  const url = canonical.href;
  const isProfile = canonical.pathname === '/about';
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Freddie Philpot',
      image: `${siteUrl}/apple-touch-icon.png`,
      url: `${siteUrl}/about`,
      description:
        'Year 12 student building applications and exploring Linux, networking and cybersecurity.',
      sameAs: [
        'https://github.com/pphilfre',
        'https://linkedin.com/in/freddiephilpot',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Freddie Philpot',
      url: `${siteUrl}/`,
      inLanguage: 'en-GB',
      publisher: { '@id': personId },
      image: `${siteUrl}/apple-touch-icon.png`,
    },
    {
      '@type': isProfile ? 'ProfilePage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: 'en-GB',
      isPartOf: { '@id': websiteId },
      ...(isProfile || canonical.pathname === '/'
        ? { mainEntity: { '@id': personId } }
        : {}),
      author: { '@id': personId },
      publisher: { '@id': personId },
      ...(modified ? { dateModified: modified } : {}),
    },
  ];
  if (article)
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: title,
      description,
      url,
      datePublished: article.published,
      ...(article.modified ? { dateModified: article.modified } : {}),
      author: { '@id': personId },
      publisher: { '@id': personId },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      inLanguage: 'en-GB',
    });
  return { '@context': 'https://schema.org', '@graph': graph };
}
