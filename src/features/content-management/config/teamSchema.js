import { z } from 'zod';

const TeamSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5)
      .catch('NAME_UNAVAILABLE')
      .default('NAME_UNAVAILABLE'),

    roleDescription: z
      .string()
      .trim()
      .min(5)
      .catch('ROLE_UNAVAILABLE')
      .default('ROLE_UNAVAILABLE'),

    credentials: z
      .string()
      .trim()
      .min(2)
      .catch('CREDENTIALS_UNAVAILABLE')
      .default('CREDENTIALS_UNAVAILABLE'),

    body: z
      .string()
      .trim()
      .min(5)
      .catch('TEAM_ARTICLE_UNAVAILABLE')
      .default('TEAM_ARTICLE_UNAVAILABLE'),

    imageDescription: z
      .string()
      .trim()
      .min(5)
      .catch('Image description unavailable.')
      .default('Image description unavailable.'),

    sortOrder: z.number().catch(0).default(0),
  })
  .transform((data) => {
    data.title = data.name;
    delete data.name;

    data.subtitle = data.roleDescription;
    delete data.roleDescription;

    return {
      ...data,
      contentType: 'team-article',
    };
  });

export default TeamSchema;
