import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Drawer, IconButton, Stack, Typography, Toolbar, Avatar, Tooltip, Modal, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import { useUsuarioProvider } from '../context/UsuarioContext';
import { useClienteProvider } from '../context/ClienteContext';
import { set } from 'react-hook-form';
import FormModalClientes from '../components/FormModalClientes';

const Usuario = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const [tabAtual, setTabAtual] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [clienteAtual, setClienteAtual] = useState(null);

    const handleCloseModal = () => {
        setClienteAtual(null);
        setOpenModal(false)};  // Função para fechar o modal de add
    const handleChange = (e) => {
        setClienteAtual({ ...clienteAtual, [e.target.name]: e.target.value });
    };

    // Função para abrir a barra lateral
    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    // Função de logout

    const { logout, usuario } = useUsuarioProvider();

    const { clientes, trazerClientes } = useClienteProvider();

    const fetchClientes = async () => {
        try {
            // Enviar a requisição para o backend
            const response = await fetch('http://localhost:3000/clientes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // Verifique se a resposta foi bem-sucedida
            if (response.ok) {
                const responseData = await response.json()  // Pega os dados da resposta JSON
                trazerClientes(responseData)
            } else {
                window.alert("Erro ao trazer os clientes!")
            }

        } catch (error) {
            window.alert("Erro de requisição")
            console.error(error)  // Exibe o erro no console para depuração
        }
    }
    useEffect(() => {
        fetchClientes();
    }, []);

    const addClick = async () => {
        const data = { ...clienteAtual };
        try {
            // Enviar a requisição para o backend
            const response = await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({    // Corrigido: Usar JSON.stringify() para converter em JSON
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                })
            })
            // Verifique se a resposta foi bem-sucedida
            if (response.ok) {
                const responseData = await response.json()  // Pega os dados da resposta JSON
                //window.alert("Cliente cadastrado com sucesso!");
                fetchClientes();
                setOpenModal(false);
                setClienteAtual(null);
            } else {
                window.alert("Erro ao trazer os clientes!")
            }
        } catch (error) {
            window.alert("Erro de requisição")
            console.error(error)  // Exibe o erro no console para depuração
            setOpenModal(false);
        }
    }

    const editClick = async (data) => {
        try {
            // Enviar a requisição para o backend
            const response = await fetch(`http://localhost:3000/clientes/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({    // Corrigido: Usar JSON.stringify() para converter em JSON
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                })
            })
            // Verifique se a resposta foi bem-sucedida
            if (response.ok) {
                const responseData = await response.json()  // Pega os dados da resposta JSON
                //window.alert("Cliente Editado com sucesso!");
                fetchClientes();
                setOpenModal(false);
                setClienteAtual(null);
            } else {
                window.alert("Erro ao trazer os clientes!")
            }
        } catch (error) {
            window.alert("Erro de requisição")
            console.error(error)  // Exibe o erro no console para depuração
            setOpenModal(false);
        }
    }

    const deleteClick = async (data) => {
        try {
            // Enviar a requisição para o backend
            const response = await fetch(`http://localhost:3000/clientes/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            // Verifique se a resposta foi bem-sucedida
            if (response.ok) {
                const responseData = await response.json()  // Pega os dados da resposta JSON
                window.alert("Cliente excluido com sucesso!");
                fetchClientes();
            } else {
                window.alert("Erro ao trazer os clientes!")
            }
        } catch (error) {
            window.alert("Erro de requisição")
            console.error(error)  // Exibe o erro no console para depuração
        }
    }




    const navigate = useNavigate();

    const handleLogout = () => {
        // Aqui você pode implementar a lógica para o logout, como limpar o estado do usuário ou redirecionar para a tela de login
        logout();
        navigate('/');
    };

    return (
        <Box>
            {/* Barra Superior */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        {/* Foto do Usuário */}
                        <Avatar sx={{ marginRight: 1 }} src="https://via.placeholder.com/40" alt="Foto do Usuário" />
                        {/* Nome do Usuário */}
                        <Typography variant="h6">{usuario?.name} </Typography>
                    </Box>
                    {/* Botão de Logoff */}
                    <IconButton color="inherit" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Barra Lateral (Drawer) */}
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{ width: 250, padding: 2 }}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <Typography variant="h6">Menu</Typography>
                    <Button
                        fullWidth
                        onClick={() => setTabAtual("Usuario")}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center', // Alinha o ícone e o texto verticalmente
                            textAlign: 'left' // Alinha o texto à esquerda
                        }}
                    >
                        <AccessibilityIcon sx={{ marginRight: 1 }} /> {/* Espaço entre o ícone e o texto */}
                        Usuários
                    </Button>

                    <Button
                        fullWidth
                        onClick={() => setTabAtual("Clientes")}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center', // Alinha o ícone e o texto verticalmente
                            textAlign: 'left' // Alinha o texto à esquerda
                        }}
                    >
                        <AccountBoxIcon sx={{ marginRight: 1 }} /> {/* Espaço entre o ícone e o texto */}
                        Clientes
                    </Button>
                </Box>
            </Drawer>

            {/* Conteúdo do usuário (pode ser substituído por outro conteúdo) */}
            {tabAtual === "Usuario" ?
                <Stack sx={{ padding: 2 }}>
                    <Typography variant="h4">Bem-vindo, {usuario?.name}  !</Typography>
                    <Typography>Conteúdo do usuário...</Typography>
                </Stack>
                :
                <Stack sx={{ padding: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                        <Typography variant="h4">Clientes</Typography>
                        <Tooltip title="Adicionar Cliente">
                            <AddBoxIcon onClick={() => setOpenModal(true)} sx={{ cursor: 'pointer' }} fontSize='large' color='primary' />
                        </Tooltip>
                    </Box>


                    {clientes?.map((cliente) => (

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2, border: '1px solid #ccc', padding: 2 }}>
                            {/* Foto do Cliente <Avatar sx={{ marginRight: 1 }} src="https://via.placeholder.com/40" alt="Foto do Cliente" />*/}
                            <Typography key={cliente.id}>{cliente.nome}</Typography>
                            <Box>
                                <ModeEditIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                    setClienteAtual(cliente);
                                    setOpenModal(true)}}  color='primary' />
                                <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => deleteClick(cliente)} color='error' />
                            </Box>
                        </Box>



                    ))}

                </Stack>
            }



           <FormModalClientes openModal={openModal} handleCloseModal={handleCloseModal} clienteAtual={clienteAtual} handleChange={handleChange} addClick={addClick} editClick={editClick} />


        </Box>
    );
};

export default Usuario;
