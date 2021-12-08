<template>
  <div>
    <h2>This is the matches page</h2>
  </div>
</template>

<script>
import { computed } from "vue";
// mport {useStore} from 'vuex'
import getAllFixtures from "../composables/getAllFixtures";
export default {
  setup() {
    const { allFixtures, error, loadAllFixtures } = getAllFixtures();
    loadAllFixtures();
  },
};
</script>