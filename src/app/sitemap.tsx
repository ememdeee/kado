import { createClient } from '@/prismicio';
import { MetadataRoute } from 'next';

// Function to fetch content data
async function fetchContent() {
  const client = createClient();
  const blogs = await client.getAllByType('blog');
  const products = await client.getAllByType('product');
  const pages = await client.getAllByType('page');

  return { blogs, products, pages };
}

// Function to generate the sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  const { blogs, products, pages } = await fetchContent();

  const blogUrls = blogs.map(blog => ({
    url: `https://isikado.com/blog/${blog.uid}`,
    lastModified: new Date(blog.last_publication_date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const productUrls = products.map(product => ({
    url: `https://isikado.com/${product.uid}`,
    lastModified: new Date(product.last_publication_date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const pageUrls = pages.map(page => ({
    url: `https://isikado.com/${page.uid}`,
    lastModified: new Date(page.last_publication_date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: 'https://isikado.com',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...pageUrls,
    ...blogUrls,
    ...productUrls
  ];
}
