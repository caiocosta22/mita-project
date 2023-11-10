<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const pageIndex = ref(1);
const emit = defineEmits(["atualizarPage"]);

const maximunPage = computed(() => {
  return Math.ceil(props.items.totalRows / 12);
});

const seeingProductsBetween = computed(() => {
  const menorValorQuePossoVer = pageIndex.value === 1 ? "01" : ((pageIndex.value - 1) * 12) + 1;
  const maiorValorQuePossoVer = pageIndex.value === 1 ? "12" : (pageIndex.value * 12) > props.items.totalRows ? props.items.totalRows : (pageIndex.value * 12);
  return `${menorValorQuePossoVer}-${maiorValorQuePossoVer}`;
});
function formatCurrency (value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
}

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
        totalRows: 12,
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
div.container
  div.containertabela.q-pt-lg.q-pl-md
    div.row.paginacao.q-px-sm
      p.produtos.q-mr-md(style="font-size: 18px; font-weight: 400;") Produtos {{ seeingProductsBetween }} de {{ items.totalRows }} resultados
      div.row.q-gutter-sm.q-px-md
        q-icon.cursor-pointer(
          name="chevron_left"
          size="1.5em"
          style="width:8px; heigth:16px"
          @click="pageIndex === 1 ? false : pageIndex --; emit('atualizarPage', pageIndex)"
        )
        p(style="font-weight: bold;") {{ pageIndex }}
        q-icon.cursor-pointer(
          name="chevron_right"
          size="1.5em"
          style="width:8px; heigth:15px;"
          @click="pageIndex === maximunPage ? false : pageIndex ++; emit('atualizarPage',pageIndex)"
        )
    div.grid.q-px-sm
      template(
        v-for="item in items.content"
        :key="item"
      )
        div.column.containerfoto
          q-img.cursor-pointer.foto(
            :src="item.image"
            @click="openProductPage(item)"
          )
          div.row.justify-between.q-pt-sm
            div.column.texto(style="width:50%;text-align:left;")
              span.text-black {{ item.name }}
            div.column.texto(style="width:50%; text-align:right")
              span.text-black(v-for="(tag,index) in item.tag" :key="index") {{ formatCurrency(tag) }}
</template>

<style scoped>
.grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
.containertabela{
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  flex-direction: column;
}
.containerfoto{
  max-width: 360px;
  padding-right: 20px;
  padding-bottom: 20px;
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
@media screen and (max-width: 1024px) {
    .grid{
      grid-template-columns: 1fr 1fr 1fr
    }
    .texto{
      font-size: 18px;
    }
}
@media screen and (max-width: 768px) {
  .grid{
      grid-template-columns: 1fr 1fr
    }
    .texto{
      font-size: 16px;
    }
}
@media screen and (max-width: 480px) {
  .grid{
      grid-template-columns: 1fr 1fr
    }
    .texto{
      font-size: 14px;
    }
}

</style>
