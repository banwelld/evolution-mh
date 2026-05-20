import { z } from 'zod';

const ServiceSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5)
      .catch('TITLE_UNAVAILABLE')
      .default('TITLE_UNAVAILABLE'),

    subtitle: z
      .string()
      .trim()
      .min(5)
      .catch('DESCRIPTION_UNAVAILABLE')
      .default('DESCRIPTION_UNAVAILABLE'),

    body: z
      .string()
      .trim()
      .min(5)
      .catch('SERVICE_ARTICLE_UNAVAILABLE')
      .default('SERVICE_ARTICLE_UNAVAILABLE'),

    imageDescription: z
      .string()
      .trim()
      .min(5)
      .catch('Image description unavailable.')
      .default('Image description unavailable.'),

    sortOrder: z.number().catch(0).default(0),
  })
  .transform((data) => {
    return {
      ...data,
      contentType: 'service-article',
    };
  });

export default ServiceSchema;
