<script setup>
import { ref, defineProps } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'
import FloatLabel from 'primevue/floatlabel'
import Dropdown from 'primevue/dropdown'

const props = defineProps({
    variant: {
        type: String
    },
})

const email = ref('')
const password = ref('')
const remember = ref(false)

const name = ref('')
const surname = ref('')
const gender = ref(null)
const postalCode = ref('')
const address = ref('')
const agree = ref(false)

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
]
</script>

<template>
    <form>
        <div class="flex flex-col items-center p-6 w-full max-w-md mx-auto">
            <!-- LOGIN FORM -->
            <template v-if="variant === 'login'">
                <h2 class="text-2xl font-semibold mb-1">Welcome back, Gracie</h2>
                <p class="text-gray-500 mb-6">Welcome back, please enter your details</p>

                <Button label="Login with Google" icon="pi pi-google" class="w-full mb-4 google-btn"
                    severity="secondary" />

                <Divider align="center" class="my-4">
                    <span class="text-sm no-account"><strong>or</strong></span>
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
            </template>

            <!-- SIGN UP FORM -->
            <template v-else>
                <h2 class="text-2xl font-semibold mb-6">Create an account</h2>

                <div class="grid w-full gap-4 mb-4 one-row">
                    <div class="col-6">
                        <FloatLabel>
                            <InputText id="name" v-model="name"
                                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                            <label for="name">First Name</label>
                        </FloatLabel>
                    </div>

                    <div class="col-6">
                        <FloatLabel>
                            <InputText id="surname" v-model="surname"
                                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                            <label for="surname">Last Name</label>
                        </FloatLabel>
                    </div>
                </div>

                <div class="w-full mb-4">
                    <FloatLabel>
                        <InputText id="signup-email" v-model="email"
                            class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                        <label for="signup-email">Email</label>
                    </FloatLabel>
                </div>

                <div class="grid w-full gap-4 mb-4 one-row">
                    <div class="col-6">
                        <FloatLabel>
                            <Dropdown id="gender" v-model="gender" :options="genderOptions" optionLabel="label"
                                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                            <label for="gender">Gender</label>
                        </FloatLabel>
                    </div>

                    <div class="col-6">
                        <FloatLabel>
                            <InputText id="postal" v-model="postalCode"
                                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                            <label for="postal">Postal Code</label>
                        </FloatLabel>
                    </div>
                </div>

                <div class="w-full mb-4">
                    <FloatLabel>
                        <InputText id="address" v-model="address"
                            class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                        <label for="address">Home Address</label>
                    </FloatLabel>
                </div>

                <div class="w-full mb-4">
                    <FloatLabel>
                        <Password id="signup-password" v-model="password" :feedback="true" toggleMask
                            class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                        <label for="signup-password">Enter your password</label>
                    </FloatLabel>
                </div>

                <div class="flex items-center w-full text-sm mb-4">
                    <Checkbox inputId="agree" v-model="agree" :binary="true" />
                    <label for="agree" class="text-black ml-2">I agree to the Terms & Conditions</label>
                </div>

                <Button label="Create an account" class="w-full mb-4 login-btn" />

                <p class="text-sm text-gray-200 no-account">
                    Already have an account?
                    <Button label="Login here" text class="text-primary sign-up-link p-0" />
                </p>
            </template>
        </div>
    </form>
</template>

<style scoped>
.login-btn {
    background-color: black;
    border: 2px solid black;
    color: #f8f8f8;
    border-radius: 10px;
}

.google-btn {
    background-color: #f8f8f8;
    border: 2px solid black;
    color: black;
    border-radius: 10px;
}

.forgot-pword-btn {
    text-align: right;
    color: black;
}

.no-account {
    text-align: center;
    color: lightgray !important;
}

.sign-up-link {
    color: black !important;
}

.one-row {
    width: 100%;
    padding: 0;
    display: flex !important;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: space-between;
}


::v-deep(.p-inputtext),
::v-deep(.p-password-input),
::v-deep(.p-dropdown) {
    background-color: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    padding-left: 0 !important;
}

::v-deep(.p-password-input) {
    border: none !important;
}

::v-deep(.p-divider-content) {
    background-color: #f8f8f8 !important;
}

::v-deep(.p-float-label > label) {
    background-color: transparent !important;
}
</style>
