<template>
  <LoginRegLayout :isLogin="true">
    <template #login-form>
      <!-- Your login form components here -->
      <div>
        <h1>Hi</h1>
        <div class="form">
          <h2>form goes here</h2>
        </div>
      </div>
      <LoginForm />
    </template>
  </LoginRegLayout>
</template>

<script>
import LoginRegLayout from '@/layout/LoginRegLayout.vue'
</script>
