<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'
import FloatLabel from 'primevue/floatlabel'

const email = ref('')
const password = ref('')
const remember = ref(false)
</script>

<template>
    <Form>
        <div class="flex flex-col items-center p-6 w-full max-w-m mx-auto">
            <h2 class="text-2xl font-semibold mb-1">Welcome back, Gracie</h2>
            <p class="text-gray-500 mb-6">Welcome back, please enter your details</p>

            <Button label="Login with Google" icon="pi pi-google" class="w-full mb-4 google-btn" severity="secondary" />

            <Divider align="center" class="my-4">
                <span class="text-sm no-account "><Strong>or</Strong></span>
            </Divider>

            <div class="w-full mb-4">
                <FloatLabel>
                    <InputText id="email" v-model="email"
                        class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                    <label for="email">Email</label>
                </FloatLabel>
            </div>

            <div class="w-full mb-4">
                <FloatLabel>
                    <Password id="password" v-model="password" :feedback="true" toggleMask
                        class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                    <label for="password">Password</label>
                </FloatLabel>
            </div>

            <div class="flex items-center justify-between w-full text-sm mb-4">
                <div class="flex items-center">
                    <Checkbox inputId="remember" v-model="remember" :binary="true" />
                    <label for="remember" class="text-black ml-2">Remember me</label>
                </div>
                <Button label="Forgot password?" text class="p-0 text-sm forgot-pword-btn" />
            </div>

            <Button label="Login" class="w-full mb-4 login-btn" />

            <p class="text-sm text-gray-200 no-account">
                Don’t have an account?
                <Button label="Sign up here" text class="text-primary sign-up-link p-0" />
            </p>
        </div>
    </Form>
</template>



<style scoped>

.login-btn{
    background-color: black;
    border: 2px solid black;
    color: #f8f8f8;
    border-radius: 10px;
}

.google-btn{
    background-color: #f8f8f8;
    border: 2px solid black;
    color: black;
    border-radius: 10px;
}

.forgot-pword-btn{
    text-align: right;
    color: black;
}

.no-account{
    text-align: center;
    color: lightgray !important;
}

.sign-up-link{
    color: black !important; 
}

::v-deep(.p-inputtext),
::v-deep(.p-password-input) {
    background-color: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    padding-left: 0 !important;
}

::v-deep(.p-password-input){
    border: none !important;
}

::v-deep(.p-divider-content) {
    background-color: #f8f8f8 !important;
}

::v-deep(.p-float-label > label) {
    background-color: transparent !important;
}
</style>
