<script setup lang="ts">
import { useToast } from 'vue-toastification'
import axios from 'axios'

const toast = useToast()

async function registrarCliente() {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.post('/api/client', {
      name: 'Juan',
      email: 'juan@email.com'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    toast.success('Cliente registrado exitosamente')  // ✅ Registro OK
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status

      switch (status) {
        case 401:
          toast.error('No autenticado. Inicia sesión.') // ❌ No autenticado
          break
        case 403:
          toast.warning('No autorizado para realizar esta acción') // ⚠️ No autorizado
          break
        case 404:
          toast.info('El registro no existe') // 🔍 No encontrado
          break
        case 400:
          toast.error('Datos inválidos o cliente ya registrado') // ❌ Ya existe o error validación
          break
        case 500:
          toast.error('Error en el servidor. Intenta más tarde') // 💥 Server error
          break
        default:
          toast.error('Ocurrió un error inesperado') // ⚠️ Otros
      }
    } else {
      toast.error('No se pudo conectar al servidor') // 🌐 Fallo de red u otro
    }
  }
}
</script>

<template>
  <button @click="registrarCliente" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Registrar Cliente
  </button>
</template>
