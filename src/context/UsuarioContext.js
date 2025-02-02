import { createContext, use, useContext, useState } from "react";

const UsuarioContext = createContext();

export const useUsuarioProvider = () => useContext(UsuarioContext);

export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    const login = (data) => {
        setUsuario(data.user);
        localStorage.setItem('token', JSON.stringify(data.token)); 
    };
     
    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('token');
    }; 

    return (
        <UsuarioContext.Provider value={{ usuario, login, logout }}>
            {children}
        </UsuarioContext.Provider>
    );
    



}