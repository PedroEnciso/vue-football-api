<template>
  <nav class="component-spacer">
    <ul>
      <li class="selected">
        <router-link
          :to="{
            name: 'Overview',
            params: { idType: 'league', id: `${currentLeague.id}` },
          }"
          >overview</router-link
        >
      </li>
      <li>
        <router-link
          :to="{
            name: 'Table',
            params: { idType: 'league', id: `${currentLeague.id}` },
          }"
          >table</router-link
        >
      </li>
      <li>
        <router-link
          :to="{
            name: 'Matches',
            params: { idType: 'league', id: `${currentLeague.id}` },
          }"
          >matches</router-link
        >
      </li>
      <li>
        <router-link
          :to="{
            name: 'Stats',
            params: { idType: 'league', id: `${currentLeague.id}` },
          }"
          >stats</router-link
        >
      </li>
    </ul>
    <hr />
  </nav>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    console.log(currentLeague.value.id);
    return { currentLeague };
  },
};
</script>
<style scoped>
nav {
  width: 100%;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 3.5rem;
  cursor: pointer;
}

.selected {
  color: var(--accent-color);
  cursor: auto;
  border-bottom: 4px solid var(--accent-color);
}

.selected:hover {
  border-bottom: 4px solid var(--accent-color);
}

hr {
  border: none;
  height: 3px;
  margin-top: -3px;
  background-color: var(--light-background-color);
}
</style>
