<script setup>
import { ref, computed } from "vue";

const currentOffset = ref(0);
const windowSize = 4;
const paginationFactor = 340;
const items = ref([
  {
    name: "Case para Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Necessaire veneza pequena",
    image: "https://s3-alpha-sig.figma.com/img/c0c4/9744/de5abdcd33c0dde0ab15945509169039?Expires=1693785600&Signature=PSEt8BEhZKGaDaDA7qmuAG9ihNXP~b4aOMwCtkdJvYhHLtUOWDCgpCqRJf4R6ER26Hhcrvsy0iSU0ykOTLGjCQ~rEopqMOy6MMNAOpddX1xaAde~G8KY2X3Zau28CtMi13vtSXpjxh6ferk5TsMtLb6gcMBTh1KlMZWbMdvvCQ0oKKtLJ92oG0mNddMsmMNJdA0OGXgcFHc8gyY9sETiA1uLs1-MetFMLSHNYVkAHBwbSAp5HjIcENLnubd-iY~Oio-jCO9tAxIekOkc~XwNbdEURvG2J4zU2E0MlPH6nEZm3kbcZHmnL2xIwYEv7GZyeY3naxKIILpCu6Ccq1zcMQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Chaveiro em couro para chave de carro",
    image: "https://s3-alpha-sig.figma.com/img/85da/75a2/15a9afdb7159ce4659fa0ad9e54bc62e?Expires=1693785600&Signature=Sl50PKBiRgMireJtk56TmhoccCxBqDc4sIPObR3DYZdVosDxpX2LdPDrGkVUrhyLP26fnVLrva4~Sa-7ileSV2PByv7bgRwQI5mEc212qPvCBVVtGTNsXQfCypTFh4q1wBfz9mUlyiqytQNpPqSQVFrWPJOZPStsGohaqvVEI7uIHtZqo69Pz0ZSuFqDcCBnnxOccCaV9nYYHtE9mByXIKDRtio0wCx-bkhAfm~9bq6sa1BuSDJJmoDHiHlkHJUhbcoy52sawbCdTsWPOnEKpVwT8PXDI9grPn4YMmhMwDr~iYgajmfkXRagpb-B88tybULatT1TISh4fd0fjq0jVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Carteira feminina",
    image: "https://s3-alpha-sig.figma.com/img/2aed/3548/0d6a87808fb56acebdd04e3ff2a98328?Expires=1693785600&Signature=B4vY6t5ibMxfrk39g9cK8T20gn00YEFN-SfXeyMLXmkeyDebEuqHh8DXoe4UfwQchyF~mgP-oskKjghPqTboQCajcvC-4AcsbvtWUS5MAqDNDy-AtLyPfOypnfpCpQ~bClEa84vz-0YuiTwaxp0~i4uRY8prl7b-qxgXd0DEQMh~7SEMC2hX6tanDERYYBdlu1bOBprZu7QR6wnfvFiGQgLI7vV2ssZlxsLhRw9n4Jm8eFU4FHGHp8TkN9l00ktNQZbjwJvUb48rjHhlhkRGQWgPemvcVe0ridbODhp-2uvLt722T-kqHDxySmF4jyK8fdooGE0IRUEFvBYzSU9xdw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
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
.card-carousel-wrapper.col
  q-icon.cursor-pointer.q-mr-sm(
    name="chevron_left"
    size="2.5em"
    color="black"
    @click="moveCarousel(-1)"
  )
  .card-carousel
    .card-carousel--overflow-container
      .card-carousel-cards(:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}")
        .card-carousel--card(v-for="item in items" :key="item")
          img(:src="item.image")
          .card-carousel--card--footer.q-pa-sm.text-black
            p {{ item.name }}
            p.tag.text-bold(v-for="(tag,index) in item.tag" :key="index" :class="index > 0 ? 'secondary' : ''") {{ tag }}
  q-icon.cursor-pointer.q-ml-md(
    name="chevron_right"
    size="2.5em"
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
  height: 320px;
  width: 320px
  }
  *{
  color: black;
}
</style>
