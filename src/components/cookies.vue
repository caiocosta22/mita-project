<script setup>
import { onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
function positioned () {
  $q.dialog({
    title: "Alerta de Cookies.",
    message: "Ao clicar em Ok, você concorda com nossos Cookies e políticas de privacidade.",
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: "negative"
    },
    persistent: true,
    position: "bottom"
  });
}
onMounted(() => {
  positioned();
});
</script>
