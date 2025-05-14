<script setup>
import TheMainLayout from '@/layout/TheMainLayout.vue'
import ThreeColumnLayout from '@/layout/ThreeColLayout.vue'
import AuthLayout from '@/layout/LoginRegLayout.vue'
</script>

<!-- <template>
  <TheMainLayout>
    <div class="content">
      <h1>the page content would go here</h1>
    </div>
  </TheMainLayout>
</template> -->

<template>
  <ThreeColumnLayout>
    <!-- This goes into (slot) -->
    <div>
      <h2>This is the main dashboard content</h2>
      <p>Welcome back, lecturer!</p>
    </div>

    <!-- This goes into (slot with the name #aside) -->
    <template #aside>
      <div>
        <h3>Notifications</h3>
        <ul>
          <li>📌 Mark attendance</li>
          <li>📌 Upload grades</li>
        </ul>
      </div>
    </template>
  </ThreeColumnLayout>
</template>

<!-- <template>
  <AuthLayout pageType="">
    <div class="form-cont">
      <h1>the form would go here</h1>
    </div>
  </AuthLayout>
</template> -->

<!-- <template>
  <AuthLayout pageType="login">
    <div class="form-cont">
      <h1>the form would go here</h1>
    </div>
  </AuthLayout>
</template> -->
