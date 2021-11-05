<template>
  <nav class="component-spacer">
    <ul>
      <li class="selected">
        <router-link to="/">overview</router-link>
      </li>
      <li>
        <router-link to="/">table</router-link>
      </li>
      <li>
        <router-link to="/">matches</router-link>
      </li>
      <li>
        <router-link to="/">stats</router-link>
      </li>
    </ul>
    <hr />
  </nav>
</template>
<script>
export default {};
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
  margin-right: 5rem;
  cursor: pointer;
  transition: border-bottom 0.2s;
}

nav ul li:hover {
  border-bottom: 4px solid var(--light-accent-color);
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
  height: 2px;
  margin-top: -2px;
  background-color: var(--light-background-color);
}
</style>
