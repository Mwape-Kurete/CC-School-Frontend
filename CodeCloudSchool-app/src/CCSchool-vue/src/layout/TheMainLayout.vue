<template>
  <div class="two-column-layout">
    <!-- Sidebar -->
    <aside class="temp-sidenav">
      <Navbar />
    </aside>

    <!-- Main content area -->
    <main class="main-page-cont">
      <ThePageHeader />
      <div class="content-wrapper">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import ThePageHeader from '@/components/ThePageHeader.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped lang="scss">
.two-column-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-areas: 'sidenav main';
  height: 100vh;
  background-color: #f7f6fb;
  gap: 0.5rem;
  padding: 0 1.5rem; // Horizontal padding to contain the gap

  @media (max-width: 1024px) {
    grid-template-columns: 250px 1fr;
    padding: 0 1rem; // Reduced padding for tablet
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'sidenav'
      'main';
    gap: 0;
    padding: 0;
  }
}

.main-page-cont {
  grid-area: main;
  background-color: white;
  border-radius: 30px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  color: #212121;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3rem); // Account for margins

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > * {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 768px) {
    margin: 0 0 1.5rem 0;
    border-radius: 0;
    min-height: auto;
  }
}

.temp-sidenav {
  grid-area: sidenav;
  padding: 1.5rem 1rem;
  height: calc(100vh - 3rem); // Account for margins
  overflow-y: auto;
  border-radius: 30px;

  @media (max-width: 1024px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    height: auto;
    margin: 0 0 1.5rem 0;
    border-radius: 0;
    padding: 1rem;
    width: 100%;
  }
}
</style>
