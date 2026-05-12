export default function ToolTip({
  imageDetails,
  licenseDetails,
  sourceDetails,
}) {
  const { imageDescription, ownerName, ownerWebUrl } = imageDetails;
  const { infoPath, name: licenseName } = licenseDetails;
  const { name, knownFor } = sourceDetails;

  return (
    <div className='tooltip'>
      <p className='tooltip__description'>{imageDescription}</p>
      <a className='tooltip__owner-link' href={ownerWebUrl} target='_blank'>
        {ownerName}
      </a>
      <a className='tooltip__license-link' href={infoPath} target='_blank'>
        {licenseName}
      </a>
      <p className='tooltip__subject'>{`${name} (${knownFor})`}</p>
    </div>
  );
}
