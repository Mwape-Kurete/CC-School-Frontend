<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import ToggleSwitch from 'primevue/toggleswitch';



const value = ref(null);
const checked = ref(false);

</script>

<template>
  <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <FloatLabel>
        <InputText id="over_label" v-model="value1" />
        <label for="over_label">Email</label>
    </FloatLabel>

    <FloatLabel v-slot="$field" as="section" name="Password" initialValue="" class="flex flex-col gap-2">
        <Password v-model="value" />
        <label for="over_label">Password</label>
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FloatLabel>
    <ToggleSwitch v-model="checked" />

    <Button type="submit" severity="secondary" label="Submit" />
</Form>
</template>

<style scoped>

</style>