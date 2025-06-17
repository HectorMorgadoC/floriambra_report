<template>
    <div class="flex justify-center items-start h-screen m-20">
        <form 
            @submit.prevent="onLogin"
            class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md"
        >
            <h2 v-if="statusExceptionMessage" class="text-[#FC3B47] text-2xl">
                {{ exceptionMessage }}
            </h2>

            <!-- Cliente -->
            <div class="mb-4">
                <label 
                    for="client" 
                    class="block font-medium text-[#EEE0D3] my-2"
                >
                    Cliente
                </label>
                <input
                    @click="statusExceptionMessage = false"
                    v-model="myForm.email"
                    type="email"
                    id="email"
                    name="email"
                    ref="clientInputRef"
                    required
                    placeholder="Ingrese correo"
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
                <div class="relative">
                    <input
                        @click="statusExceptionMessage = false"
                        v-model="myForm.password"
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        name="password"
                        ref="passwordInputRef"
                        required
                        placeholder="Ingrese contraseña"
                        class="placeholder-gray-400 w-full px-4 py-3 pr-12 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                    />
                    <button
                        type="button"
                        @click="togglePassword"
                        class="absolute top-1/2 right-3 -translate-y-1/2 text-[#EEE0D3] hover:text-[#98B6B6] focus:outline-none"
                    >
                        <span class="text-xl">
                            {{ showPassword ? '🔓' : '🔒' }} 
                        </span>
                    </button>
                </div>
</div>


            <!-- Botón -->
            <button
                type="submit"
                class="w-full bg-[#FC3B47] text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Iniciar sesión
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { useAuthStore } from '../stores/auth.store';
    import { useRouter } from 'vue-router';
    import { useClientStorage } from '../composable/useClientStorage';

    const router = useRouter();
    const authStores = useAuthStore();
    const clientInputRef = ref<HTMLInputElement | null>(null);
    const passwordInputRef = ref<HTMLInputElement | null>(null);
    const statusExceptionMessage = ref<boolean>(false);
    const exceptionMessage = ref<string>('');
    const showPassword = ref(false);

    const togglePassword = () => {
        showPassword.value = !showPassword.value;
    };

    const { clearClient } = useClientStorage();
    clearClient();

    const myForm = reactive({
        email: '',
        password: '',
        remenberMe: false,
    });

    const onLogin = async () => {
        if (myForm.email === '') {
            return clientInputRef.value?.focus();
        }

        if (myForm.password === '') {
            return passwordInputRef.value?.focus();
        }

        const login = await authStores.login(myForm.email, myForm.password);

        if (!login) {
            exceptionMessage.value = authStores.message;
            statusExceptionMessage.value = true;
        }

        if (authStores.isAuthenticated) {
            router.replace({ name: 'menu' });
        }
    };
</script>
