<template>
  <div class="latest_results component-spacer">
    <div class="title_line">
      <h2>Latest Results</h2>
      <div class="controls">
        <button @click="scrollLeft" class="switch_left slider_button">
          &lt
        </button>
        <button @click="scrollRight" class="switch_right slider_button">
          >
        </button>
      </div>
    </div>
    <h3 v-if="error">Sorry there was an error: {{ error }}</h3>
    <h3 v-if="!latestResults">Loading latest round data...</h3>
    <div v-else ref="container" class="carousel_container">
      <div ref="slider" class="carousel">
        <Match v-for="match in latestResults" :key="match.id" :match="match" />
      </div>
    </div>
  </div>
</template>
<script>
import Match from "./Match.vue";
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import getLatestResults from "../composables/getLatestResults";

export default {
  components: { Match },
  setup() {
    ///// SLIDER FUNCTIONALITY /////
    const slider = ref(null);
    const container = ref(null);
    const INCREMENT = 380;
    let slideAmount = 0;

    // right button functionality
    const scrollRight = () => {
      // find amount of space hidden for sliding
      const availableSpace = Math.abs(
        container.value.clientWidth - slider.value.clientWidth
      );
      // check if we have slid more than the amount of hidden space
      if (slideAmount >= availableSpace.value) return;
      // check if the amount able to slide is less then INCREMENT
      // if true, only slide the available amount
      if (INCREMENT > availableSpace - slideAmount) {
        slideAmount += availableSpace - slideAmount;
        slider.value.style.transform = `translateX(-${slideAmount}px)`;
        return;
      }
      // slide normallly
      slideAmount += INCREMENT;
      slider.value.style.transform = `translateX(-${slideAmount}px)`;
    };

    // left button functionality
    const scrollLeft = () => {
      // if slider is at the beginning, don't slide
      if (slideAmount <= 0) return;
      // if slider is near the beginning, slide to the very beginning
      if (slideAmount - INCREMENT < 0) {
        slideAmount = 0;
        slider.value.style.transform = `translateX(-${slideAmount}px)`;
        return;
      }
      // normal slide
      slideAmount -= INCREMENT;
      slider.value.style.transform = `translateX(-${slideAmount}px)`;
    };

    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    ///// FETCH RESULT DATA /////
    const { latestResults, error, loadLatestResults } = getLatestResults();

    // call the API anytime the league_id is changed
    watchEffect(() => {
      loadLatestResults(
        currentLeague.value.id,
        currentLeague.value.current_round_id
      );
    });

    return {
      scrollRight,
      scrollLeft,
      slider,
      INCREMENT,
      slideAmount,
      container,
      latestResults,
      error,
    };
  },
};
</script>
<style scoped>
.latest_results {
  width: 100%;
  height: fit-content;
  overflow: hidden;
}

.title_line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.slider_button {
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 90%;
}

.slider_button:hover {
  background-color: transparent;
}

.switch_left {
  margin-right: 25px;
}

.carousel_container {
  margin: 0 auto;
  display: flex;
  white-space: wrap;
  overflow: hidden;
  margin-top: 0.8rem;
}

.carousel {
  width: auto;
  display: flex;
  transition: transform 0.75s;
}
</style>
