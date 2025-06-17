<template>
    <div class="flex justify-center items-start h-screen m-20">
        <form class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <div class="mb-4">
                <label 
                    for="client" 
                    class="block font-medium text-[#EEE0D3] my-2"
                >
                    Cliente
                </label>
                <input
                    type="client"
                    id="client"
                    name="client"
                    required
                    placeholder="Ingrese nombre del cliente"
                    class="placeholder-gray-400 w-full px-4 py-3 text-[#98B6B6] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-4">
                <label 
                    for="password" 
                    class="block font-medium text-[#EEE0D3] my-2"
                >
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Ingrese contraseña"
                    class="placeholder-gray-400 w-full px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <button
                type="submit"
                class="w-full bg-[#FC3B47] text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Iniciar sesión
            </button>
        </form>
    </div>
</template>