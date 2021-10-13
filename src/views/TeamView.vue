<template lang="">
    <div>
        <h1>This club is {{team_id}}</h1>
    </div>
</template>
<script>
import { onMounted } from "vue";
export default {
  props: ["team_id"],
};
</script>
<style lang="">
</style>