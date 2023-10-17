<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
</script>

<template lang="pug">
div.splide
    Splide(
        :options="{ direction: 'ttb', slidesPerView: 1, arrows: true }"
    )
        SplideSlide
            q-img(
                src="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png"
            )
            p ESTE É O SLIDE 1
        SplideSlide
            q-img(
                src="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png"
            )
            p ESTE É O SLIDE 1
        SplideSlide
            q-img(
                src="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png"
            )
            p ESTE É O SLIDE 1
</template>

<style scoped>
.splide {
    width: 50%;
    height: 300px;
    justify-content: center;
    margin: 0 auto
}
</style>
