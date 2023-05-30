import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

function Context({ children }) {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Context;
