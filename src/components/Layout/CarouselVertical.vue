<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
// Dessa forma, ele tá aplicado pra mostrar 2 em 2 fotos, o que já é suficiente.
</script>

<template lang="pug">
div.splide
    Splide(
        :options="{ direction: 'ttb', slidesPerView: 1, arrows: true,  height   : '400px', perPage: 2 }"
    )
        SplideSlide
            q-img.slide(
                src="https://agenciaalastrar.com.br/wp-content/uploads/2023/05/image-of-happy-asian-woman-reading-message-on-mobi-FKGGSJ9-e1650561666821.png"
            )
        SplideSlide
            q-img.slide(
                src="https://agenciaalastrar.com.br/wp-content/uploads/2023/05/image-of-happy-asian-woman-reading-message-on-mobi-FKGGSJ9-e1650561666821.png"
            )
        SplideSlide
            q-img.slide(
                src="https://agenciaalastrar.com.br/wp-content/uploads/2023/05/image-of-happy-asian-woman-reading-message-on-mobi-FKGGSJ9-e1650561666821.png"
            )
        SplideSlide
            q-img.slide(
                src="https://agenciaalastrar.com.br/wp-content/uploads/2023/05/image-of-happy-asian-woman-reading-message-on-mobi-FKGGSJ9-e1650561666821.png"
            )
</template>

<style scoped>
.splide {
    width: 50%;
    height: 400px;
    justify-content: center;
    margin: 0 auto;
    overflow: auto;
}
.slide {
    height: 200px;
}
</style>
