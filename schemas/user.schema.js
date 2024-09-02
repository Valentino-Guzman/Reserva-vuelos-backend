import z from 'zod'

const clientSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'El nombre tiene que ser un string',
        required_error: 'El nombre es requerido'
    }).min(3, 'La cadena no puede estar vacía'),
    apellido: z.string({
        invalid_type_error: 'El apellido tiene que ser un string',
        required_error: 'El apellido es requerido',
        
    }).min(3, 'La cadena no puede estar vacía'),
    contrasena: z.string({
        invalid_type_error: 'La contrasena tiene que ser un string',
        required_error: 'La contrasena es requerida',
        
    }).min(3, 'La cadena no puede estar vacía'),
    email: z.string({
        invalid_type_error: 'El email tiene que ser un string',
        required_error: 'El email es requerido',
        
    }).min(3, 'La cadena no puede estar vacía')
})

export function validateClient(input) {
    return clientSchema.safeParse(input)
}