function PropertyList({ property }) {
  return (
    <ul className='basket-item__properties'>
      {property.map((item, index) => (
        <li key={index} className='basket-item__property'>
          <span className='basket-item__property-name'>{item.NAME}</span>
          <span className='basket-item__property-value'>{item.VALUE}</span>
        </li>
      ))}
    </ul>
  );
}

export default PropertyList;
