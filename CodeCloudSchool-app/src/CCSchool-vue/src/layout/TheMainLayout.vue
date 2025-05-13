<template>
  <div class="two-column-layout">
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

    <!-- Main content area -->
    <main class="main-page-cont">
      <ThePageHeader />
      <slot />
    </main>
  </div>
</template>

<script setup>
import ThePageHeader from '@/components/ThePageHeader.vue'
</script>

<style scoped>
.two-column-layout {
  display: flex;
  height: 100vh;
  background-color: #f7f6fb;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.main-page-cont {
  flex: 1;
  margin: 1.5rem;
  background-color: white;
  border-radius: 30px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  color: #212121;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/*temp sidebar */

.temp-sidenav {
  flex-basis: 250px;
  background-color: #212121;
  color: white;
  height: 95%;
  margin-top: 1.6rem;
  padding: 1.5rem 1rem;
  border-radius: 0 30px 30px 0;
}

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
</style>
