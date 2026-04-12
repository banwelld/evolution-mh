import QuoteImage from './components/QuoteImage';
import QuoteText from './components/QuoteText';
import ToolTip from './components/ToolTip';
import { Error } from '../../config/constants';
import ImageLicenseInfo from './config/imageLicenseInfo';

const rawContent = import.meta.glob('./content/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
});

const sourceImages = import.meta.glob('./assets/images/*.webp', {
  eager: true,
  import: 'default',
});

// frontmatter parser
const parseFrontmatter = (rawMd) => {
  const match = rawMd.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!match) return { metadata: {}, content: rawMd };

  const [, yaml, content] = match;
  const metadata = Object.fromEntries(
    yaml
      .split('\n')
      .filter((line) => line.includes(':'))
      .map((line) => {
        const [key, ...val] = line.split(':');
        return [key.trim(), val.join(':').trim()];
      }),
  );

  return { metadata, content: content.trim() };
};

export default function BlockQuote({ sourceKey }) {
  const rawText = rawContent[`./content/${sourceKey}.md`];

  if (!rawText)
    return (
      <p className='error-text'>
        {Error.MISSING_QUOTE} ({sourceKey})
      </p>
    );

  const { metadata, content: quoteText } = parseFrontmatter(rawText);

  const imageDetails = {
    description: metadata.imageDescription,
    licenseKey: metadata.licenseKey,
    owner: {
      name: metadata.ownerName,
      path: metadata.ownerPath,
    },
  };

  const sourceDetails = {
    name: metadata.name,
    knownFor: metadata.knownFor,
  };

  const licenseDetails = ImageLicenseInfo[metadata.licenseKey] ?? {};

  const imagePath = sourceImages[`./assets/images/${sourceKey}.webp`];

  const imageProps = {
    image: imagePath,
    description: imageDetails?.description ?? Error.MISSING_DESCRIPTION,
    InfoView: (
      <ToolTip
        imageDetails={imageDetails}
        licenseDetails={licenseDetails}
        sourceDetails={sourceDetails}
      />
    ),
  };

  return (
    <blockquote className='quote' aria-label='a quote about mental health'>
      <QuoteImage {...imageProps} />
      <QuoteText
        text={quoteText}
        sourceName={sourceDetails?.name ?? Error.MISSING_NAME}
      />
    </blockquote>
  );
}
