<template>
  <div class="latest_results box-shadow home_component">
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
import { ref, watchEffect } from "vue";
import getLatestResults from "../composables/getLatestResults";

export default {
  components: { Match },
  props: ["league_id", "round"],
  setup(props) {
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

    ///// FETCH RESULT DATA /////
    const { latestResults, error, loadLatestResults } = getLatestResults();
    // loadLatestResults(props.league_id);

    // call the API anytime the league_id is changed
    watchEffect(() => {
      loadLatestResults(props.league_id, props.round);
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
<style>
.latest_results {
  width: 100%;
  height: 170px;
  overflow: hidden;
}

.latest_results .title_line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.latest_results .title_line .slider_button {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 1rem;
  background-color: white;
  color: #a5a5a5;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 900;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  transition: box-shadow 0.4s;
}

.latest_results .title_line .slider_button:active {
  box-shadow: none;
}

.latest_results .title_line .switch_left {
  margin-right: 20px;
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
