<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'
import FloatLabel from 'primevue/floatlabel'
import CDropdown from './ui/CDropdown.vue'
import Dropdown from 'primevue/dropdown'




// import api service
import { AdminAuthService, AuthService, LectAuthService } from '@/api/auth'

const props = defineProps({
    variant: {
        type: String,
        default: 'login'
    },
})

const currentFormVariant = ref(props.variant);

// Toggle function
const toggleVariant = () => {
    currentFormVariant.value = currentFormVariant.value === 'login' ? 'signup' : 'login'
}

const email = ref('')
const password = ref('')
const remember = ref(false)

const name = ref('')
const surname = ref('')
const gender = ref(null)
const phoneNo = ref('')
const address = ref('')
const agree = ref(false)

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
]


const role = ref('student'); // default value

const roleOptions = [
    { label: 'Student', value: 'student' },
    { label: 'Lecturer', value: 'lecturer' },
    { label: 'Admin', value: 'admin' },
];

// functions
// ==========================================================
const login = async () => {

    loading.value = true
    errorMessage.value = ''

    if (!email.value || !password.value) {
        errorMessage.value = 'Please fill in both email and password.'
        loading.value = false
        return
    }

    try {
        console.log('Attempting to login...')
        const response = await AuthService.login({
            email: email.value,
            password: password.value,
            role: role.value, // must be 'student' | 'admin' | 'lecturer'
        })

        if (typeof response === 'string') {
            // Login failed, show message
            errorMessage.value = response
        } else {
            // Login successful, response is a User object
            console.log('Login successful:', response)
            // Redirect or store user session here


            const user = response;


            // store user role in local storage
            localStorage.setItem('userRole', user.role);
            if (user.role === 'Student') {
                // user obj only has email, not studentNumber => get the student number out the email
                user.studentNumber = user.email.split('@')[0];
                console.log('Student number:', user.studentNumber);

                localStorage.setItem('studentNumber', user.studentNumber);
                router.push({ name: 'dashboard' });
            } else if (user.role === 'Lecturer') {
                localStorage.setItem('lectId', user.lecturerId);
                router.push({ name: 'lecturer-dash' });
            } else {
                console.warn('Unknown user role:', user.role);
                // Optional: Redirect to a generic page or show an error
            }
        }
    } catch (error) {
        errorMessage.value = 'Login failed. Please check your credentials.'
    } finally {
        loading.value = false
    }
}


const signUp = async () => {
    loading.value = true
    errorMessage.value = ''

    if (!name.value || !surname.value || !password.value || !gender.value || !phoneNo.value || !address.value) {
        errorMessage.value = 'Please fill in all fields.'
        loading.value = false
        return
    }
    if (!agree.value) {
        errorMessage.value = 'You must agree to the terms and conditions.'
        loading.value = false
        return
    }

    console.log(role.value);

    if (role.value === 'student') {
        try {
            console.log('Attempting to sign up...')
            const response = await AuthService.signUpStudent({
                name: name.value,
                lastName: surname.value,
                password: password.value,
                gender: typeof gender.value === 'object' ? gender.value.value : gender.value, // extract actual string
                address: address.value,
                phoneNumber: phoneNo.value,
                enrollmentDate: new Date().toISOString(), // REQUIRED
                yearLevel: "1st Year", // or bind this to a form field
                PrivateEmail: email.value
            })


            console.log(response.includes('Verification email sent. Please check your inbox.'));
            if (!response.includes('Verification email sent. Please check your inbox.')) {
                // sign up failed, show message
                errorMessage.value = response;
            } else {
                // sign up successful and email sent, response is a string
                console.log('sign up successful:', response);
                // redirect user 2fa screen
                localStorage.setItem('userRole', role.value);

                router.push({ name: '2FAView' });
            }
        } catch (error) {
            errorMessage.value = 'Sign Up failed. Please check your credentials.'
        } finally {
            loading.value = false
        }
    }
    else if (role.value === 'lecturer') {
        try {
            console.log('Attempting to sign up lecturer');
            const response = await LectAuthService.signUpLecturer({
                lectName: name.value,
                lecLastName: surname.value,
                name: name.value,
                PrivateEmail: email.value,
                lastName: surname.value,
                password: password.value,
                phoneNumber: phoneNo.value,
                department: "",
                dateOfJoining: new Date().toISOString(),
                isActive: true
            });

            console.log('Sign up response:', response);

            if (typeof response === 'string' && response.includes('Verification email sent')) {
                // success case
                console.log('Sign up successful');
                localStorage.setItem('userRole', role.value);
                router.push({ name: '2FAView' });
            } else {
                // failure case
                errorMessage.value = typeof response === 'string' ? response : 'Sign-up failed.';
            }
        } catch (error) {
            errorMessage.value = 'Sign Up failed. Please check your credentials.';
        } finally {
            loading.value = false;
        }
    }

    else if (role.value === 'admin') {
        try {
            console.log('Attempting to sign up admin');
            const response = await AdminAuthService.signUpAdmin({
                FName: name.value,
                LName: surname.value,
                Password: password.value,
                phoneNumber: phoneNo.value,
                AdminRole: "superadmin",
                Department: "IT",
                PrivateEmail: email.value     
            });

            console.log('Admin sign-up response:', response);

            if (!response.includes('Verification email sent. Please check your inbox.')) {
                errorMessage.value = response;
            } else {
                console.log('Sign up successful:', response);
                localStorage.setItem('userRole', role.value);
                router.push({ name: '2FAView' });
            }
        } catch (error) {
            errorMessage.value = 'Sign Up failed. Please check your credentials.';
        } finally {
            loading.value = false;
        }
    }

}

</script>

<template>
    <form @submit.prevent>
        <div class="flex flex-col items-center p-6 w-full max-w-md mx-auto">
            <!-- LOGIN FORM -->
            <template v-if="currentFormVariant === 'login'">
                <h1 class=" font-bold mb-1">Welcome back</h1>
                <p class="text-gray-500 mb-6">Please enter your details</p>

                <Button label="Login with Google" icon="pi pi-google" class="w-full mb-4 google-btn"
                    severity="secondary" />

                <Divider align="center" class="my-4">
                    <span class="text-sm no-account"><strong>or</strong></span>
                </Divider>

                <Dropdown placeholder="Are you a Student, Lecturer, or Admin?" v-model="role" :options="roleOptions"
                    optionValue="value" optionLabel="label" class="minimal-dropdown w-full mb-4" />


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

                <div v-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</div>
                <Button @click="login" :loading="loading" label="Login" class="w-full mb-4 login-btn" />

                <p class="text-sm text-gray-200 no-account">
                    Don’t have an account?
                    <Button @click.prevent="toggleVariant" label="Sign up here" text
                        class="text-primary sign-up-link p-0" />
                </p>
            </template>

            <!-- SIGN UP FORM -->
            <template v-else>
                <h2 class="text-2xl font-semibold mb-6">Create an account</h2>

                <Dropdown placeholder="Are you a Student, Lecturer, or Admin?" v-model="role" :options="roleOptions"
                    optionValue="value" optionLabel="label" class="minimal-dropdown w-full mb-2" />

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
                            <InputText id="phone" v-model="phoneNo"
                                class="w-full border-0 border-b-2 border-gray-300 focus:border-gray-500 rounded-none" />
                            <label for="phone">Phone Number</label>
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

                <div v-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</div>
                <Button @click="signUp" :loading="loading" label="Create an account" class="w-full mb-4 login-btn" />

                <p class="text-sm text-gray-200 no-account">
                    Already have an account?
                    <Button @click.prevent="toggleVariant" label="Login here" text
                        class="text-primary sign-up-link p-0" />
                </p>
            </template>
        </div>
    </form>
</template>

<style scoped>
.role-dropdown {
    border: 1px solid #212121;
    border-radius: 25px !important;
}

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

/* Target the visible dropdown container */
::v-deep(.minimal-dropdown.p-dropdown) {
    border: none;
    border-bottom: 1px solid #9ca3af;
    /* Tailwind gray-400 */
    border-radius: 0;
    box-shadow: none;
    padding: 0.5rem 0;
}

/* Remove inner padding to match inputs */
::v-deep(.minimal-dropdown .p-dropdown-label) {
    padding-left: 0;
    padding-right: 0;
}

/* Optional: caret down icon alignment */
::v-deep(.minimal-dropdown .p-dropdown-trigger) {
    padding-right: 0;
}

/* Optional: Dropdown open panel */
::v-deep(.p-dropdown-panel) {
    border-radius: 0.25rem;
    border: 1px solid #d1d5db;
    /* Tailwind gray-300 */
}
</style>
