<template>
  <div class="dashboard-container">
    <!-- Main Content Area -->
    <!-- Your main dashboard content -->
    <div class="content-section">
      <!-- Add more components/content as needed -->
      <div class="announcement-header">
        <h1 class="ps-header pt-0">Your Announcements</h1>
        <CButtonIcon class="btn-icon-custom" type="primary" size="sm" :disabled="true" btnIconLabel="New Announcement">
          <template #icon>
            <PlusCircleIcon />
          </template>
        </CButtonIcon>
      </div>
      <div class="card-container">
        <CardComp cardType="announcement" announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />

        <div class="divider-card"></div>

        <CardComp cardType="announcement" announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />

        <div class="divider-card"></div>

        <CardComp cardType="announcement" announcementTitle=" Computer science  workshop with Jacob  Anderson"
          announcementBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." announcementDate="2023-10-15"
          moduleImg="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?..." />
      </div>

      <hr />

      <h1 class="ps-header pt-5">This Weeks Schedule</h1>
      <CardComp cardType="module" moduleTitleLine1=" Computer science" moduleTitleLine2="Fundamentals Module"
        moduleEventLabel="Practical" moduleCode="CS101" moduleClassId="1E" moduleTime="9:00 - 12:00"
        moduleImg="https://picsum.photos/id/870/200/300?grayscale&blur=2" />
      <CardComp cardType="module" moduleTitleLine1=" Computer science" moduleTitleLine2="Fundamentals Module"
        moduleEventLabel="Practical" moduleCode="CS101" moduleClassId="2E" moduleTime="14:00 - 18:00"
        moduleImg="https://picsum.photos/id/870/200/300?grayscale&blur=2" />
    </div>

    <!-- Right Side Panel -->
    <aside class="side-panel">
      <div class="panel-content">
        <h3 class="text-center">Class Analytics</h3>
        <!-- Additional panel components can go here -->
        <div class="panel-section">
          <!-- Activity content -->
          <LecturerKnob />
          <ToDoComp />
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
// Admin-specific logic will go here
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
}

.side-panel {
  border-left: 1px solid #e5e7eb;
  padding-left: 2rem;
}

.card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
}
</style>