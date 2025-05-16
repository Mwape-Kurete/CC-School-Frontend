<script setup lang="ts">
import CreateModuleAssignmentForm from '@/components/CreateModuleAssignmentForm.vue';
import LoginSignUpForm from '@/components/LoginSignUpForm.vue';

</script>

<template>
    <LoginSignUpForm variant="login"/>
    <LoginSignUpForm variant="signup"/>
    <CreateModuleAssignmentForm variant="assignment" />
    <CreateModuleAssignmentForm variant="module" />
    <CreateModuleAssignmentForm variant="announcement" />
</template>

<style scoped>

</style>