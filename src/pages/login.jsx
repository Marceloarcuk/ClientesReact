import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUsuarioProvider } from '../context/UsuarioContext'

const Login = () => {
    const form = useForm({
        defaultValues: {
            usuario: '',
            senha: ''
        }
    })

    const { register, handleSubmit, formState: { errors } } = form
    const navigate = useNavigate()
    const { login } = useUsuarioProvider()

    const onSubmit = async (data) => {
        try {
            // Enviar a requisição para o backend
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({    // Corrigido: Usar JSON.stringify() para converter em JSON
                    email: data.usuario,
                    password: data.senha
                })
            })
    
            // Verifique se a resposta foi bem-sucedida
            if (response.ok) {
                const responseData = await response.json()  // Pega os dados da resposta JSON
                login(responseData)
                navigate('/home')

            } else {
                window.alert("Erro ao fazer login!")
            }
    
        } catch (error) {
            window.alert("Erro de requisição")
            console.error(error)  // Exibe o erro no console para depuração
        }
    }
    

    return (
        <Stack>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    margin: 4,
                    padding: 4,
                    border: '1px solid black',
                    borderRadius: 4

                }}
                component={'form'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    variant='h5'
                    sx={{
                        alignSelf: 'flex-start'
                    }}
                >
                    Faça seu Login:

                </Typography>
                <TextField
                    id="outlined-basic"
                    label="User"
                    variant="outlined"
                    fullWidth
                    {...register('usuario', {
                        required: 'Campo obrigatório',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Por favor, insira um email válido'
                        }
                    })}
                    error={!!errors.usuario} // Mostra erro se houver
                    helperText={errors.usuario?.message} // Exibe mensagem de erro
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type='password'
                    fullWidth
                    {...register('senha', {
                        required: 'Campo obrigatório',

                    })}
                    error={!!errors.senha} // Mostra erro se houver
                    helperText={errors.senha?.message} // Exibe mensagem de erro
                />

                <Stack
                    direction='row'
                    spacing={2}
                    sx={{
                        alignSelf: 'flex-end'
                    }}>
                    <Button
                        variant='contained'
                    >
                        Registre-se
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                    >
                        Enviar
                    </Button>

                </Stack>

            </Box>


        </Stack>
    )
}

export default Login