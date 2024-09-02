import z from 'zod'

const bookingSchema = z.object({
    cliente_id: z.number({
        invalid_type_error: 'el id del cliente tiene que ser number',
        required_error: 'el id del cliente es requerido'
    }),
    origen: z.string({
        invalid_type_error: 'El origen tiene que ser un string',
        required_error: 'El origen es requerido'
    }).min(1, 'La cadena no puede estar vacía'),
    destino: z.string({
        invalid_type_error: 'El destino tiene que ser un string',
        required_error: 'El destino es requerido',
        
    }).min(1, 'La cadena no puede estar vacía'),
    fecha_ida: z.string({
        invalid_type_error: 'La fecha ida tiene que ser un string',
        required_error: 'La fecha ida es requerida',
        
    }),
    fecha_vuelta: z.string({
        invalid_type_error: 'La fecha_vuelta tiene que ser un string',
        required_error: 'La fecha_vuelta es requerida',
        
    })
})

export function validateBooking(input) {
    return bookingSchema.safeParse(input)
}