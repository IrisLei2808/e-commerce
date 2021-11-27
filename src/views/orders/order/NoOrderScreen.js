import React from 'react';

const NoOrderScreen = () => {
  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      <img
        src="./images/order.png"
        style={{ width: 70, height: 70 }}
        className="mr-3"
      />
      Chưa có đơn hàng
    </div>
  );
};

export default NoOrderScreen;
