import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

function Context({ children }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth,user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Context;
