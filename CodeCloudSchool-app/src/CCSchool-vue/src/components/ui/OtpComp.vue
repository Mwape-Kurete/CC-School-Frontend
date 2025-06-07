<script setup>
import { ref } from 'vue';
import Button from 'primevue/button'
import { AuthService } from '@/api/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const digits = ref(["", "", "", "", "", ""]);

const userRole = ref(localStorage.getItem('userRole') || 'student');
userRole.value = userRole.value.toLocaleLowerCase();
console.log("User Role:", userRole.value);

const handleInput = (event, index) => {
    const value = event.target.value;
    if (!/^\d$/.test(value)) {
        digits.value[index] = "";
        return;
    }

    digits.value[index] = value;

    // Move focus to the next input
    if (index < digits.value.length - 1) {
        event.target.nextElementSibling?.focus();
    }
};

const handleBackspace = (event, index) => {
    if (digits.value[index] === "") {
        if (index > 0) {
            event.target.previousElementSibling?.focus();
        }
    }
};


// functions 
const verifyOtp = async (otp) => {
    if (userRole.value === 'student') {
        try {
            console.log("Verifying OTP for student:", otp);
            const response = await AuthService.verifyEmail(otp, userRole.value);
            if (response.status === 200) {
                console.log("OTP verified successfully");

                // then redirect to course selected page
                router.push({ name: 'RegisterMajors' });
            } else {
                console.error("OTP verification failed");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    }
    else if (userRole.value === 'lecturer') {
        try {
            console.log("Verifying OTP for lecturer:", otp);
            const response = await AuthService.verifyEmail(otp, 'lecturerreg');
            if (response.status === 200) {
                console.log("OTP verified successfully");

                // then redirect to course selected page
                router.push({ name: 'lecturer-dash' });
            } else {
                console.error("OTP verification failed");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    }
    else if (userRole.value === 'admin') {
        try {
            console.log("Verifying OTP for admin:", otp);
            const response = await AuthService.verifyEmail(otp, userRole.value);
            if (response.status === 200) {
                console.log("OTP verified successfully");

                // then redirect to course selected page
                router.push({ name: 'lecturer-dash' });
            } else {
                console.error("OTP verification failed");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    }

}

const submitOtp = () => {
    const otp = digits.value.join("");
    if (otp.length === 6) {
        // Call the API to verify the OTP
        console.log("Submitting OTP:", otp);
        verifyOtp(otp);
    } else {
        console.error("Please enter a valid 6-digit OTP");
    }
}
</script>

<template>
    <div class="otp-form-con">
        <h1 class=" font-bold mb-1">Please Check your Email</h1>
        <p class="text-gray-500 mb-6">You will receive a 6 digit OTP soon</p>
        <div class="otp-con flex gap-2">
            <input v-for="(digit, index) in digits" :key="index" v-model="digits[index]"
                @input="handleInput($event, index)" @keydown.backspace="handleBackspace($event, index)" maxlength="1"
                type="text" class="otp-input" />
        </div>
        <Button @click="submitOtp" label="Submit OTP" class="w-full mt-6 mb-4 login-btn" />
    </div>
</template>



<style scoped>
.otp-form-con {
    width: 60% !important;
    margin-left: 20% !important;
    height: 60%;
    margin-top: 20%;

}

.opt-con {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.otp-input {
    border: 1px solid #212121 !important;
    border-radius: 15px;
    background-color: F7F6FB !important;
    width: 40% !important;
    height: 5rem !important;
    padding: 1% !important;
    font-size: 2rem !important;
    text-align: center !important;
    font-family: 'QuickSand', sans-serif !important;
}

.login-btn {
    background-color: black;
    border: 2px solid black;
    color: #f8f8f8;
    border-radius: 10px;
}
</style>
