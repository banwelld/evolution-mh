export default function QuoteText({ text, sourceName }) {
  return (
    <div className='quote__text-container'>
      <p className='quote__text'>{text}</p>
      <cite className='quote__citation'>{sourceName}</cite>
    </div>
  );
}
