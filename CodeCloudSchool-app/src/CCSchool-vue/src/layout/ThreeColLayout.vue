<script setup>
import ThePageHeader from '@/components/ThePageHeader.vue'
</script>

<template>
  <div class="three-column-layout">
    <!-- Sidebar -->
    <aside class="temp-sidenav">
      <nav class="temp-sidebar">
        <ul>
          <li><a href="#">🏠 Dashboard</a></li>
          <li><a href="#">📄 Reports</a></li>
          <li><a href="#">👤 Profile</a></li>
          <li><a href="#">⚙️ Settings</a></li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <ThePageHeader />
      <slot />
    </main>

    <!-- Right Aside Slot -->
    <aside class="right-aside">
      <slot name="aside" />
    </aside>
  </div>
</template>

<style scoped lang="scss">
.three-column-layout {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
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
  background-color: #212121;
  color: white;
  padding: 1.5rem 1rem;
  border-radius: 0 30px 30px 0;
  height: 95%;
  margin-top: 1.6rem;
  overflow-y: auto;
}

/* Sidebar styling */
.temp-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.temp-sidebar li {
  margin-bottom: 1rem;
}

.temp-sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  transition: background-color 0.2s ease;
}

.temp-sidebar a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}

/* Main content */
.main-content {
  grid-area: main;
  margin: 1.5rem;
  background-color: white;
  border-radius: 30px;
  padding: 1.5rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  overflow-y: auto;
}

/* Right aside */
.right-aside {
  grid-area: aside;
  margin: 1.5rem 1.5rem 1.5rem 0;
  padding: 1rem;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: none; /* Hide on smaller screens */
  }
}
</style>
