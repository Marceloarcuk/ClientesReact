import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const FormModalClientes = ({ openModal, handleCloseModal, clienteAtual, handleChange, addClick, editClick }) => {
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Cadastrar Cliente
                </Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Nome"
                        name="nome"
                        value={clienteAtual?.nome}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={clienteAtual?.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Telefone"
                        name="telefone"
                        value={clienteAtual?.telefone}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={
                        clienteAtual?.id ? () => editClick(clienteAtual) : () => addClick}>
                        Salvar
                    </Button>
                </Stack>
            </Box>
        </Modal>)
}

export default FormModalClientes



