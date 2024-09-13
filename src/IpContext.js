import React, { createContext, useContext, useState } from 'react';
const IpContext = createContext();
export const IpProvider = ({ children }) => {
  const [ip, setIp] = useState('');
  return (
    <IpContext.Provider value={[ip, setIp]}>
      {children}
    </IpContext.Provider>
  );
};
export const useIp = () => {
  return useContext(IpContext);
};
