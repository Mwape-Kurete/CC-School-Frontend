<script setup>
import { PlusIcon } from 'lucide-vue-next'
import CButtonIcon from './ui/CButton-icon.vue'
import Dialog from 'primevue/dialog'
import CToDo from './ui/CToDo.vue'
import { ref } from 'vue'

const todos = ref(['Grade assignments', 'Prepare lecture notes', 'Meet with students'])
const visible = ref(false)
const newTask = ref('')

const removeTodo = (index) => {
  todos.value.splice(index, 1)
}

const addTodo = () => {
  if (newTask.value.trim()) {
    todos.value.push(newTask.value.trim())
    newTask.value = ''
    visible.value = false
  }
}
</script>

<template>
  <div class="checklist-container">
    <h3 class="text-center pb-2">Your To Do List</h3>

    <div class="add-container">
      <CButtonIcon
        label="Add Item"
        type="secondary"
        size="sm"
        btnIconLabel="Add New To Do Item"
        @click="visible = true"
      >
        <PlusIcon :size="16" />
      </CButtonIcon>

      <Dialog
        v-model:visible="visible"
        modal
        header="Add New Task"
        :style="{ width: '25rem' }"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      >
        <div class="input-container flex gap-2">
          <input
            v-model="newTask"
            type="text"
            id="task"
            placeholder="Add a new task..."
            class="flex-1 p-2 border new-task-dialog"
            @keyup.enter="addTodo"
          />
          <button id="add" class="px-4 py-2 add-dialog" @click="addTodo">Add</button>
        </div>

        <template #footer>
          <button class="px-4 py-2 cancel-add" @click="visible = false">Cancel</button>
        </template>
      </Dialog>
    </div>

    <div class="gen-to-dos">
      <CToDo
        v-for="(todo, index) in todos"
        :key="index"
        :to-do-item="todo"
        :index="index"
        @remove="removeTodo"
      />
    </div>
  </div>
</template>

<style scoped>
.add-container {
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: center;
}

.checklist-container {
  max-width: 500px;
  margin: 0 auto;
}

.gen-to-dos {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Dialog */
.p-dialog .p-dialog-header {
  border-bottom: 1px solid #e5e7eb;
}

.p-dialog .p-dialog-content {
  padding-bottom: 1.5rem;
}

.p-dialog .p-dialog-footer {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.cancel-add {
  border-radius: 30px;
  border: none;
  background-color: #d85863;
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
}

.cancel-add:hover {
  cursor: pointer;
  color: white;
  background-color: #df1d2d;
  font-weight: 600;
}

.add-dialog {
  border-radius: 30px;
  border: none;
  background-color: #d0dfcc;
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
}

.add-dialog:hover {
  cursor: pointer;
  color: #212121;
  background-color: #b4d4ab;
  font-weight: 600;
}

.new-task-dialog {
  border-radius: 30px;
  padding-left: 0.5rem;
}
</style>
