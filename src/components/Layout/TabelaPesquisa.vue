<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const pageIndex = ref(1);
const emit = defineEmits(["atualizarPage"]);

const maximunPage = computed(() => {
  const calc = (props.items.totalRows % 12) + 1;
  return calc;
});

const seeingProductsBetween = computed(() => {
  const menorValorQuePossoVer = pageIndex.value === 1 ? "01" : ((pageIndex.value - 1) * 12) + 1;
  const maiorValorQuePossoVer = pageIndex.value === 1 ? "12" : (pageIndex.value * 12) > props.items.totalRows ? props.items.totalRows : (pageIndex.value * 12);
  return `${menorValorQuePossoVer}-${maiorValorQuePossoVer}`;
});

const props = defineProps({
  items: {
    type: Object,
    default: () => {
      return {
        content: [
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
        ],
        totalRows: 6,
        currentPage: 1
      };
    }
  },
  loading: {
    type: Boolean,
    default: true
  },
  bannerUrlCategorie: {
    type: String,
    default: () => ""
  }
});

function openProductPage (product) {
  if (product.slug) {
    const url = "/produtos/" + product.slug;
    router.push(url);
  }
}

watch(() => pageIndex.value, (val) => {
  emit("atualizarPage", val);
});

</script>

<template lang="pug">
.container
  div.containertabela
    div.row.paginacao.q-px-sm.q-pt-xl
      p.produtos.q-mr-md(style="font-size: 18px;") Produtos {{ seeingProductsBetween }} de {{ items.totalRows }} resultados
      div.row.q-gutter-sm
        q-icon.cursor-pointer(
          name="chevron_left"
          size="1.5em"
          style="width:8px; heigth:16px"
          @click="pageIndex === 1 ? false : pageIndex--"
        )
        p(style="font-weight: bold;") {{ pageIndex }}
        q-icon.cursor-pointer(
          name="chevron_right"
          size="1.5em"
          style="width:8px; heigth:15px;"
          @click="pageIndex === maximunPage ? false : pageIndex++"
        )
    div.grid1.q-px-sm
      template(
        v-for="item in items.content"
        :key="item"
      )
        div.column.q-pr-sm(style="max-width: 350px;")
          q-img.cursor-pointer.foto(
            :src="item.image"
            style=";"
            @click="openProductPage(item)"
          )
          div.row.justify-between.q-pt-sm
            div.column(style="width:50%;text-align:left;font-size:14px")
              span.text-black {{ item.name }}
            div.column(style="width:50%; text-align:right;font-size:14px")
              span.text-black(v-for="(tag,index) in item.tag" :key="index") {{ tag }}
</template>

  <style scoped>
  .grid1{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 0 auto;
  }
  .containertabela{
    flex-direction: column;
    width: 84%;
    margin: 0 auto;
  }

  .foto {
    max-width: 100%;
    display: block;
  }

  .paginacao{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
  }

  .texto {
    color:black;
    font-size:14px;
  }

  .texto2 {
    color:black;
    font-size: 14px;
  }
  </style>
