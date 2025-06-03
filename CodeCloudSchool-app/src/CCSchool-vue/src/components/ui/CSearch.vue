<script setup>
import { SearchIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="search-form">
    <form class="f-search">
      <input type="search" name="searchbar" id="search" placeholder="search..." />
    </form>
    <button class="search-icon">
      <SearchIcon size="16" />
    </button>
  </div>
  <div class="results-container">
    <ul class="results-list" id="list-res"></ul>
  </div>
</template>

<style>
.search-form {
  display: flex;
  flex-direction: row;
  gap: 0.3rem;

  height: 2.2rem;
}

.f-search > #search {
  height: 2.2rem;
  border-radius: 20px;
  padding: 1rem;

  color: #212121;
  background-color: #f0f1a5;
  border: none;
}

.f-search > #search::placeholder {
  color: #212121;
}

.f-search > #search:focus {
  background-color: #eced68;
}

.search-icon {
  display: flex;
  align-items: center;

  width: 2.2rem;
  height: 2.2rem;

  padding: 0.5rem 0.6rem;

  border-radius: 50%;
  border: none;
  background-color: #f0f1a5;
}

.search-icon:hover {
  background-color: #eced68;
  cursor: pointer;
}
</style>
