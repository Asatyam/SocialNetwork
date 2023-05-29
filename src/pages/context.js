import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

function Context({ children }) {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <AuthContext.Provider value={{ auth, setAuth,message, setMessage }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Context;
