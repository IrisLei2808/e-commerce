import React from 'react';

const NoMappingScreen = () => {
  return (
    <div
      style={{
        display: 'flex',
        padding: 50,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <i class="far fa-times-circle mr-3" style={{ fontSize: 40 }}></i>
      <span style={{ fontWeight: 'bold' }}>Chưa có gợi ý trao đổi nào</span>
    </div>
  );
};

export default NoMappingScreen;
