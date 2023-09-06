<script setup>
import { ref } from "vue";
import Topo from "./Topo.vue";
const items = ref([
  {
    name: "Case para Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case para Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case para Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case para Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case para Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case para Iphone",
    image: "https://s3-alpha-sig.figma.com/img/c849/cc71/fda4a87fd5a01a082e7cd5a2a16b2c38?Expires=1693785600&Signature=omWKdVpVl7H9CxSUZJqrS7cVRtViDhLB1mV7y3Pofu1BQcpmZQIDtQXp~N4rNEFerK8hoZK50kOTgQNYQ-p~95ZlmcVyAHlE1SsDnNUbA9YsVJluOVFIyaV9-lcNX~gbzWLiPlv9IFhJ3RlfPZrFKuOqv9jKC6JDd~rDg7qUL98uA8-SvRIRknV41pLrMOdNRTYkQ~oVUmuCE-UHrxDaH04c9Fjx9q5XIlUo6h8KgtCwwEY6y09jZhuuY7h8Ibuqh6J3-hh9jOA1wuvSt6HDpwRsUkI0Zf~JR46D5I6Vj1yi1c7TxEV7C1P13o5tN4LwYYQycjWmceDqjT5seSAUaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  }
]);
</script>

<template lang="pug">
.container
  Topo
  .foto(v-for="item in items" :key="item" style="width:200px")
    img(:src="item.image" style="width:300px; height:300px")
    .texto
      p {{ item.name }}
      p.texto2(v-for="(tag,index) in item.tag" :key="index") {{ tag }}
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.foto {
  flex-basis: calc(33%); /* 33.33% para 3 produtos por linha, com um espaçamento de 20px */
  margin-bottom: 20px;
  box-sizing: border-box;
}
.texto {
  color:black;
  font-weight:bold
}
.texto2 {
  color:black;
  font-weight: bolder;
}

</style>
