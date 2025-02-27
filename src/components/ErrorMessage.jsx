function ErrorMessage({ message }) {
  return (
    <div className='form__error --active'>
      <span className='icon-animate --red'>
        <span className='icon-animate__ping'></span>
        <span className='icon-animate__circle'></span>
      </span>
      {message && <div className='form__error--text'>{message}</div>}
    </div>
  );
}

export default ErrorMessage;
