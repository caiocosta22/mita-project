<script setup>
import { ref, computed } from "vue";

const currentOffset = ref(0);
const windowSize = 6;
const paginationFactor = 180;
const items = ref([
  {
    name: "NECESSAIRES",
    image: "https://s3-alpha-sig.figma.com/img/a406/8cf6/c3969af25371904ee133db7f7932cc2c?Expires=1693785600&Signature=XGsj0SROdMKg866S1crWJswTOjNerOvVcvKNVrw8Lf-f4Xod5eDej4ntRwMB8kVxA9I6NUIOvfr9RStDAZFUGwm15pjj4xW~IKb5mnQ0D3Cc8baBkk5-eP7lT54RAvDElOtQY4bwJk8X5EFI7tvQcfDnhF2FksaVH0M9Yn426sTMY4Hl2WRu8EdTDilXzlX6C1xo1ot~foV61ImANRtSNlbeE4akxU5JWtUZw14Sep6kMeLyT9pEyTpUn~Zj0ngX7CIPcK~iV9fumQIASlADhZxzChp-6vwbh8cJhqkraTmECYXfFhqWvbga~Wlt1MI~LMOqZ9rTyE7t-gVnQtmdlQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "CAPAS",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "CHAVEIROS",
    image: "https://s3-alpha-sig.figma.com/img/35bc/5ade/671680adefa17016aa3f91a08f45763b?Expires=1693785600&Signature=qOBiKc4RJOP7ZzoTe1AKQB4Sf5RvBoXeXPfBulknfBVt1cRo7yNsZcOII81IA4lmUb4w7QCHxg4SpH9iMAymoBnfOqo5Ft~l664b0~Lv3dVZOJc5pNy6TC3MDpvpMiFILOWPmOO54ohp~KYO6uxUZ7O1yvF5B2jVo6mFoJewfF~uqvcwTTflxm9J8jFPH177TiG2ocS4zY4bZdmsav~xabeUzJSp~OVxOMpcBp41tu5EQzJqzoLduYmGQCQ4FTvnIvEs0La2HmAaAT8KWKF-g-e8n8r02hXtkjPTKKZ6SYMFOiwl6ISn0dX6BbHmF53CM1P6j4L46KrTyX5Blnfvqw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "BOLSAS",
    image: "https://s3-alpha-sig.figma.com/img/18d0/5164/aae8458f5fbb00bd9ba09f2d542cc3c8?Expires=1693785600&Signature=YZZZQmOaZEnNukFp-yOaWr4IqHe3HZKMHEm2lxzO~u0YNX6oNjBDke1JP3xWosMMWtWIxIPbW-Fupa8Ga80bqpkC1tcIyPe1Jr63CynfxcTvnCNao4GzLeP7NLveAQPNpfI-2x7MaICnME-ZgOPZ-pERG-B34MFhr43EEF63n5JHmeA4hNDAFRcP0Dsv2N9yx6pX3bgePxFazRGyEMKtrdeTy0~uxrjU40cGGPiCd-UzytHgzGTxmES1q5Z4r9EOgEhukQq2nnQuBaclltQjfy6lPTceP4lbIGSV1VyxnANnTMeBwR~dTYcI5-526A4tPAYbB4OhF3E1F-aYUM6JgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "GARRAFAS",
    image: "https://s3-alpha-sig.figma.com/img/e0f9/949c/ca6b2d11f284282aea9c403c98f899e6?Expires=1693785600&Signature=VbyEhq-ezxbOYbehGBmrh1mjdpBG90TMoI19yZl-PqgZ7BCLK41CItisKFqaItm6Nb38rcmppZpvpRevbDiYmoPbX914zs2fN-D8cKl9GffywYDR7zWwv4U1BnTXB8p1hpcvmyTNsJHqiC31BVb6w-SDQ9LanTBoWmJniD88ZHBd8TiuG5VVRPhFfj3m7gmgUEhYz2zzF6SI9UTE1MmIytmjiErHC6MtAJRbbNpmSgZY0FBEIR38RG~HTsk2mepBlBsfFkRzBVKpQfhz5-tX9O~Crvc8bjztDSBeczRAA4pK9ARsddj6ynXDovzOlSReHDFHY1KW2XsCknV3dqBRNQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "CARTEIRAS",
    image: "https://s3-alpha-sig.figma.com/img/9f52/17f8/77fe2b21fb96197db6bd302ed0d475fe?Expires=1693785600&Signature=jeHO75wmdAf~VSQirTLIZicxfuJKGiOmowKUcvwQaWJowcfK8aZYpFC-nmQ2~sJ550ZQLBwK1~HtrW8V1l0UsoxDXsLFKRhGGVbv-K0kprfl~yv2fyJMDQcjGSJgTtiWxj-x1MBee-uHQB1xFcbMZp6NRqBIOk-Tm9fwTAdLqaS1oElUAJ1efCJwyFiIMlcoOnUbfCR0obhntu4ZivEVXD6bifCJKJlwl4fJHwoYMcGGQ8LBowxT5XAdWR0poSPd~EQfdTRD9YvF75dlzuIPKkfiEx8N9vtd53YsCtEupEVbF957RjEDK~eH0wq3Z5xycwGAY7IsePEgB6nS9IGqxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "NECESSAIRES",
    image: "https://s3-alpha-sig.figma.com/img/a406/8cf6/c3969af25371904ee133db7f7932cc2c?Expires=1693785600&Signature=XGsj0SROdMKg866S1crWJswTOjNerOvVcvKNVrw8Lf-f4Xod5eDej4ntRwMB8kVxA9I6NUIOvfr9RStDAZFUGwm15pjj4xW~IKb5mnQ0D3Cc8baBkk5-eP7lT54RAvDElOtQY4bwJk8X5EFI7tvQcfDnhF2FksaVH0M9Yn426sTMY4Hl2WRu8EdTDilXzlX6C1xo1ot~foV61ImANRtSNlbeE4akxU5JWtUZw14Sep6kMeLyT9pEyTpUn~Zj0ngX7CIPcK~iV9fumQIASlADhZxzChp-6vwbh8cJhqkraTmECYXfFhqWvbga~Wlt1MI~LMOqZ9rTyE7t-gVnQtmdlQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "CAPAS",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    name: "CHAVEIROS",
    image: "https://s3-alpha-sig.figma.com/img/35bc/5ade/671680adefa17016aa3f91a08f45763b?Expires=1693785600&Signature=qOBiKc4RJOP7ZzoTe1AKQB4Sf5RvBoXeXPfBulknfBVt1cRo7yNsZcOII81IA4lmUb4w7QCHxg4SpH9iMAymoBnfOqo5Ft~l664b0~Lv3dVZOJc5pNy6TC3MDpvpMiFILOWPmOO54ohp~KYO6uxUZ7O1yvF5B2jVo6mFoJewfF~uqvcwTTflxm9J8jFPH177TiG2ocS4zY4bZdmsav~xabeUzJSp~OVxOMpcBp41tu5EQzJqzoLduYmGQCQ4FTvnIvEs0La2HmAaAT8KWKF-g-e8n8r02hXtkjPTKKZ6SYMFOiwl6ISn0dX6BbHmF53CM1P6j4L46KrTyX5Blnfvqw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  }
]);

const atEndOfList = computed(() => {
  return currentOffset.value <= (paginationFactor * -1) * (items.value.length - windowSize);
});

const atHeadOfList = computed(() => {
  return currentOffset.value === 0;
});

const moveCarousel = (direction) => {
  if (direction === 1 && !atEndOfList.value) {
    currentOffset.value -= paginationFactor;
  } if (direction === -1 && !atHeadOfList.value) {
    currentOffset.value += paginationFactor;
  }
};
</script>

<template lang="pug">
.card-carousel-wrapper2
  q-icon.cursor-pointer.q-mr-md(
    name="chevron_left"
    size="3.5em"
    color="black"
    @click="moveCarousel(-1)"
  )
  .card-carousel2
    .card-carousel--overflow-container
      .card-carousel-cards(:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}")
        .card-carousel--card(v-for="item in items" :key="item")
          img(
            style="width: 160px; height: 160px;"
            :src="item.image"
          )
          .card-carousel--card--footer.text-bold.text-black.text-center
            p.q-pa-sm {{ item.name }}
            p.tag(v-for="(tag,index) in item.tag" :key="index" :class="index > 0 ? 'secondary' : ''") {{ tag }}
  q-icon.cursor-pointer.q-mr-md(
    name="chevron_right"
    size="3.5em"
    color="black"
    @click="moveCarousel(1)"
  )
</template>

<style scoped>
img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
  height: 160px;
  width: 160px;
}
</style>
