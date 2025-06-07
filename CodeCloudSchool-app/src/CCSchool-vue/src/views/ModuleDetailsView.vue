<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { ModulesServices } from '@/api/modules';
import type { Modules } from '@/api/modules';

const route = useRoute();
const moduleId = Number(route.params.moduleId);
const module = ref<Modules | null>(null);

onMounted(async () => {
    try {
        const result = await ModulesServices.fetchModuleById(moduleId);
        if (typeof result === 'object' && result !== null) {
            module.value = result;
        } else {
            console.error('Unexpected response:', result);
            module.value = null;
        }
    } catch (error) {
        console.error('Failed to load module:', error);
    }
});


</script>

<template class="module-content">
    <div v-if="module">
        <h1 class="module-title mt-2 mb-4">{{ module.title }}</h1>
        <p class="module-desc mb-4"><strong>Description:</strong> {{ module.description }}</p>

        <div v-if="module.slideUrl" class="slides-con mt-4">
            <iframe :src="module.slideUrl" frameborder="0" width="960" height="569" allowfullscreen="true"
                mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>

        <div class="divider"></div>

        <div v-if="module.additionalResources && module.additionalResources.length">
            <p><strong>Additional Resources:</strong></p>
            <ul>
                <li v-for="(resource, index) in module.additionalResources" :key="index">{{ resource }}</li>
            </ul>
        </div>
    </div>

    <div v-else>
        <p>Loading module details...</p>
    </div>
</template>

<style>
.module-title {
    font-size: 28px;
    font-weight: 600;
    font-family: "Quicksand", sans-serif !important;
}

.module-desc {
    font-size: 16px;
    font-weight: 400;
    font-family: "Quicksand", sans-serif !important;
}

.slides-con {
    display: flex;
    justify-content: center;
    border-radius: 15px;
}

.divider {
    height: 1px;
    background-color: #e0e0e0;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
}
</style>
