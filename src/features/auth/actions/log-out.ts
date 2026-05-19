'use server'

import { cookies } from 'next/headers'


export async function logout(){
    try{
        const cookiesStore = await cookies()
        cookiesStore.delete('jwt')

        return {
            ok: true,
            message: 'Cierre de sesión exitoso'
        }
    }catch(error){
        return {
            ok: false,
            error: error instanceof Error ? error.message : 'Error al cerrar sesión'
        }
    }
}