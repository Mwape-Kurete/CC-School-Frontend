<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const rawCourseId = route.params.courseId;
const courseId = Array.isArray(rawCourseId) ? Number(rawCourseId[0]) : Number(rawCourseId);
import { ModulesServices } from '@/api/modules';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter();

import type { Modules } from '@/api/modules';

const modules = ref<Modules[] | null>(null);
const groupedModules = ref<Record<string, { title: string; moduleId: number }[]>>({});

// for visuals
import AccordionCard from '@/components/AccordionCard.vue';

onMounted(async () => {
  await fetchModulesByCourseId();
})

// functions
const fetchModulesByCourseId = async (): Promise<void> => {
  const courseIdParam = route.params.courseId;
  const courseId = Array.isArray(courseIdParam) ? Number(courseIdParam[0]) : Number(courseIdParam);

  try {
    const response = await ModulesServices.fetchModulesByCourseID(courseId);

    if (typeof response === 'string') {
      console.error('Failed to fetch modules:', response);
    } else {
      const extracted = (response as any)["$values"];
      if (Array.isArray(extracted)) {
        modules.value = extracted as Modules[];
      } else {
        console.error('Unexpected response format:', response);
        return;
      }



      // Group modules by groupTitle
      const groups: Record<string, { title: string; moduleId: number }[]> = {};
      for (const mod of modules.value) {
        if (!groups[mod.groupTitle]) {
          groups[mod.groupTitle] = [];
        }
        groups[mod.groupTitle].push({ title: mod.title, moduleId: mod.moduleId });

      }

      groupedModules.value = groups;
    }
  } catch (error) {
    console.error('Failed to fetch modules:', error);
  }
};


const handleModuleClick = (item: { title: string; moduleId: number }) => {
  console.log("Clicked Card")
  router.push({ name: 'ModuleDetail', params: { moduleId: item.moduleId } });
};


</script>


<template>
  <div class="course-modules">
    <h1>{{ courseId }} - Modules</h1>
  </div>

  <div class="card-con">
    <AccordionCard v-for="(items, groupTitle) in groupedModules" :key="groupTitle" :header="groupTitle"
      :items="items" @item-clicked="handleModuleClick" />
  </div>
</template>



<style scoped>
.card-con {
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
}
</style>