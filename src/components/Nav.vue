<template>
  <nav class="component-spacer">
    <ul>
      <li :class="routeName === 'Overview' ? 'selected' : ''">
        <router-link
          :to="{
            name: 'Overview',
            params: { idType: 'league', id: `${currentLeague.id}` },
          }"
          >overview</router-link
        >
      </li>
      <li :class="routeName === 'Table' ? 'selected' : ''">
        <router-link
          :to="{
            name: 'Table',
            params: { idType: 'league', id: `${currentLeague.id}` },
          }"
          >table</router-link
        >
      </li>
      <li :class="routeName === 'Matches' ? 'selected' : ''">
        <router-link
          :to="{
            name: 'Matches',
            params: { idType: 'league', id: `${currentLeague.id}` },
          }"
          >matches</router-link
        >
      </li>
      <li :class="routeName === 'Stats' ? 'selected' : ''">
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
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);
    const route = useRoute();

    // set the route name as a ref
    // use this ref to determine which Nav link to highlight
    const routeName = ref(route.name);

    // change the value of routeName when the route changes
    watchEffect(() => {
      routeName.value = route.name;
    });

    return { currentLeague, routeName };
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

@media only screen and (max-width: 700px) {
  nav ul {
    justify-content: space-between;
  }

  nav ul li {
    margin: 0rem;
  }
}
</style>
