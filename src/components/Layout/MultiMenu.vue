<script setup>
import { ref } from "vue";

const menuList = [
  {
    icon: "inbox",
    label: "Inbox",
    separator: true
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false
  },
  {
    icon: "error",
    label: "Spam",
    separator: true
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false
  }
];
const drawer = ref(false);
</script>

<template lang="pug">
.multimenu
  q-drawer(
    overlay
    v-model="drawer"
    show-if-above
    :width="200"
    height="400px"
    :breakpoint="200"
    bordered
    side="right"
    )
    q-scroll-area(class="fit")
      q-list
        template(v-for="(menuItem, index) in menuList" :key="index")
          q-item(clickable :active="menuItem.label === 'Outbox'" v-ripple)
            q-item-section(avatar)
              q-icon(:name="menuItem.icon")
            q-item-section {{ menuItem.label }}
          q-separator(:key="'sep' + index"  v-if="menuItem.separator")
</template>

<style scoped>
@media screen and (min-width: 1026px) {
  .multimenu{
    width:0px;
    height: 0px;
    display:none
  }
}
</style>
