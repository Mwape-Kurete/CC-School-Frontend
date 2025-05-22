<script setup>
import CButton from '@/components/ui/CButton.vue';
</script>

<template>

    <!-- lecturer info -->
    <div class="flex lecturer-info-con">
        <!-- img -->
        <img class="lecturer-img" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Lecturer Image" />
        <!-- name & email -->
         <div class="lec-name-email">
            <h2>Mikail Olivier</h2>
            <h4>Mikail@CCSchool.com</h4>
         </div>
    </div>


    <!-- announcement content -->
    <h1 class="mb-4 mt-4"> Workshop with Liam Rothballer: Communicating your Design Concepts</h1>
    <p class="w-9">Hi all,
        We'd like to encourage you all to attend a workshop this Friday (10am-11am) with Liam Rothballer, our Academic
        Literacy and theory support lecturer. The workshop will be hosted online (the linkLinks to an external site.).

        The workshop will focus on how to communicate your design concepts and intentions in rationale writing and
        presentations. This isn't about academic writing, it's about the early stages of the design process: from
        interpreting a brief, to organising your thoughts and presenting them clearly to peers, lecturers, and future
        clients.

        This kind of writing can be creative and fun! Developing this skill will help turn small ideas into something
        tangible and exciting. It will especially be useful when preparing your portfolios.

        Hope to see you all there!
    </p>

    <!-- go back button -->
    <CButton type="tertiary" size="md" class="mt-4" @click="$router.back()">
        Go Back
    </CButton>

</template>

<style scoped>
    .lecturer-info-con {
        display: flex;
        align-items: center;
    }

    .lecturer-img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
    }

</style>