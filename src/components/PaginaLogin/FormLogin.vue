<script setup>
</script>

<template lang="pug">
div.container
    div
        span.titulo LOGIN
    div.boxprincipal
        div.boxsecundaria
            div
                span EMAIL
                q-input
            div
                div.row
                    span SENHA
                    a ESQUECEU A SENHA?
                q-input
            div
                q-btn
</template>

<style scoped>
.container{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    align-items: center;
}
.titulo{
    color: #000;
  text-align: center;
  font-family: Catamaran;
  font-size: 35px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}
</style>
