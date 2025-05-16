<script setup>
import ThePageHeader from '@/components/ThePageHeader.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="three-column-layout">
    <!-- Sidebar -->
    <aside class="temp-sidenav">
      <Navbar />
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <ThePageHeader />
      <div class="content-wrapper">
        <slot />
      </div>
    </main>

    <!-- Right Aside Slot -->
    <aside class="right-aside">
      <div class="aside-wrapper">
        <slot name="aside" />
      </div>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.three-column-layout {
  display: grid;
  grid-template-columns: 320px 1fr 300px;
  grid-template-areas: 'sidenav main aside';
  height: 100vh;
  background-color: #f7f6fb;

  @media (max-width: 1024px) {
    grid-template-columns: 250px 1fr;
    grid-template-areas: 'sidenav main';
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'sidenav'
      'main'
      'aside';
  }
}

/* Sidebar */
.temp-sidenav {
  grid-area: sidenav;
  padding: 1.5rem 1rem;
  height: 95%;
  width: 350px;
  margin-right: 1.5rem;
  overflow-y: auto;
}

/* Main content */
.main-content {
  grid-area: main;
  margin: 1.5rem;
  background-color: white;
  box-shadow:
    rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
  border-radius: 30px;
  padding: 1.5rem;
  overflow-y: auto;

  .content-wrapper {
    > * {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

/* Right aside */
.right-aside {
  grid-area: aside;
  margin: 1.5rem 1.5rem 1.5rem 0;
  padding: 1rem;
  background-color: #fff;
  box-shadow:
    rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
  border-radius: 30px;
  overflow-y: auto;

  .aside-wrapper {
    > * {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
