// component/FormatPrice.js or FormatPrice.tsx

import React from 'react';

type FormatPriceProps = {
  value: any;
  currency?: string;
  locale?: string;
};

const FormatPrice: React.FC<FormatPriceProps> = ({ value, currency = 'Rp.', locale = 'id-ID' }) => {
  // Format the price using Intl.NumberFormat
  const formattedPrice = new Intl.NumberFormat(locale, { 
    style: 'decimal' 
  }).format(value);

  return (
    <span>
      {currency} {formattedPrice}
    </span>
  );
};

export default FormatPrice;
