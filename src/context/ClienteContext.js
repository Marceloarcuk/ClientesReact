import { createContext, use, useContext, useState } from "react";

const ClienteContext = createContext();

export const useClienteProvider = () => useContext(ClienteContext);

export const ClienteProvider = ({ children }) => {
    const [clientes, setClientes] = useState(null);

    const trazerClientes = (data) => {
        setClientes(data);
    };
     
    return (
        <ClienteContext.Provider value={{ clientes , trazerClientes }}>
            {children}
        </ClienteContext.Provider>
    );
    



}