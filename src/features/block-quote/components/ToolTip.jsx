import { Error } from '../../../config/constants';

export default function ToolTip({
  imageDetails,
  licenseDetails,
  sourceDetails,
}) {
  return (
    <div className='image__tooltip'>
      <p className='image__tooltip--description'>
        {`${imageDetails?.description ?? Error.MISSING_DESCRIPTION}`}
      </p>
      <a
        className='image__tooltip--owner-link'
        href={imageDetails?.owner?.path ?? '/'}
        target='_blank'>
        {imageDetails?.owner?.name ?? Error.MISSING_NAME}
      </a>
      <a
        className='image__tooltip--license-link'
        href={licenseDetails?.infoPath ?? '/'}
        target='_blank'>
        {licenseDetails?.name ?? Error.MISSING_NAME}
      </a>
      <p className='image__tooltip--subject'>
        {`${sourceDetails?.name ?? Error.MISSING_NAME} (${sourceDetails?.knownFor ?? ''})`}
      </p>
    </div>
  );
}
