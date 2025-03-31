import type { MetadataRoute } from 'next';
import { HOST_URL } from '@/types/constants';

export default function sitemap(): MetadataRoute.Sitemap {


    let otherSitemap :MetadataRoute.Sitemap = [
        {
            url: `https://${HOST_URL}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `https://${HOST_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `https://${HOST_URL}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `https://${HOST_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `https://${HOST_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    return otherSitemap
}