import { z } from 'zod';
import ImageLicense from '../../section-transition/config/imageLicense';

export const QuoteSchema = z.object({
  body: z
    .string()
    .trim()
    .min(5)
    .catch('QUOTE_TEXT_UNAVAILABLE')
    .default('QUOTE_TEXT_UNAVAILABLE'),

  name: z
    .string()
    .trim()
    .min(5)
    .catch('NAME_UNAVAILABLE')
    .default('NAME_UNAVAILABLE'),

  knownFor: z
    .string()
    .trim()
    .min(5)
    .catch('CREDITS_UNAVAILABLE')
    .default('CREDITS_UNAVAILABLE'),

  imageDescription: z
    .string()
    .trim()
    .min(5)
    .catch('Image description unavailable.')
    .default('Image description unavailable.'),

  ownerName: z
    .string()
    .trim()
    .min(5)
    .catch('OWNER_NAME_UNAVAILABLE')
    .default('OWNER_NAME_UNAVAILABLE'),

  ownerWebUrl: z.url().catch('#').default('#'),

  licenseKey: z
    .enum(Object.keys(ImageLicense))
    .catch('KEY_UNKNOWN')
    .default('KEY_UNKNOWN'),
});
