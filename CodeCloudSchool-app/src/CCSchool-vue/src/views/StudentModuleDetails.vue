<script setup>

</script>

<template>
    <div class="week1-container relative overflow-hidden">
        <h1 class="text-2xl font-semibold mb-4">Week 1: Theory</h1>
        <h4 class="mb-5">Welcome to your first lecture for Interactive Development as a third-year! In this lecture, we will
            have a nice
            meet-and-greet, and then have a look at the study guide and what you will be learning this year!
        </h4>

        <!-- google slides -->
        <iframe class="google-slides"
            src="https://docs.google.com/presentation/d/e/2PACX-1vRv0yvrenMRsJfwG9EmbZKFbGsVIvIeg8H4_Qobw_0iR2NTGm06PL33IWJS5S_DBSbY1BOnbXT9Q7k6/pubembed?start=false&loop=false&delayms=3000"
            frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

        <!-- Additional Resources -->
        <div class="divider mb-4"></div>
        <button class="px-6 py-2 rounded-full bg-red-300 text-gray-700 font-semibold mb-4">
            Additional Resources
        </button>
        <p class="mb-6 w-7"> - Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
            placerat. <br>
            - In id cursus mi pretium tellus <br>
            - duis convallis. Tempus leo
            eu aenean sed diam urna tempor. <br>
            - Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc <br>
            - posuere. Ut hendrerit semper 
            vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>


        <!-- Decorative Vector -->
        <img
        src="@/assets/CCVector.svg"
        alt="decorative vector"
        class="ccvector"
        />
    </div>
</template>

<style scoped>

.week1-container {
  /* position: relative; */
  /* padding-bottom: 4rem; */
}


.google-slides {
    width: 80%;
    height: 71vh;
    margin-left: 10%;
    border-radius: 15px;
    border: none;
}


.divider {
    height: 1px;
    background-color: #ccc;
    margin: 1rem 0;
}

/* Decorative vector styling */
.ccvector {
    position: absolute;
    right: 0;
    top: 70%;
    transform: translateX(10%);
    z-index: 100000;
    opacity: 0.8;
    max-height: 80%;
    pointer-events: none;
}
</style>