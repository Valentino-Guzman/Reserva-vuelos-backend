import z from 'zod'

const registerUser = z.object({
    email: z.string({
        invalid_type_error: 'El email tiene que ser un string',
        required_error: 'El email es requerido'
    }).min(1, 'La cadena no necesita mas de un caracter'),
    contrasena: z.string({
        invalid_type_error: 'La contrasena tiene que ser un string',
        required_error: 'La contrasena es requerida',
    }).min(6, 'Se necesita minimo seis caracteres de contraseña')
})

export function validateUser(input) {
    return registerUser.safeParse(input)
}