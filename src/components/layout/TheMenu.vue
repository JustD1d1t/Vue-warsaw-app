<template>
  <nav :class="{ active: isActive }">
    <form @submit.prevent="findStation">
      <h2>Lista przystanków</h2>
      <div class="form-control">
        <label for="busStop"></label>
        <p v-if="streetError" class="error">{{ streetError }}</p>
        <input
          placeholder="Wyszukaj przystanek..."
          type="text"
          name="busStop"
          id="busStop"
          v-model.trim="busStop"
        />
      </div>
      <base-button>Wyszukaj</base-button>
    </form>
    <div class="stop-details" v-if="busStopInfo">
      <h2>{{ busStopInfo.name }} {{ busStopInfo.number }}</h2>
      <div class="stop-details__lines">
        <button
          v-for="line in busStopInfo.lines"
          :key="line"
          :ref="line"
          @click="displayTimetable(line)"
        >
          {{ line }}
        </button>
      </div>
    </div>
    <base-spinner v-if="isLoading"></base-spinner>
    <div class="timetable" v-else-if="hasTimetable && !isLoading">
      <h2>Rozkład jazdy dla {{ timetableLine }}</h2>
      <div class="timetable__time">
        <div class="time" v-for="hour in timetable" :key="hour">
          <span class="hour">{{ hour.hour }}</span>
          <span
            class="minutes"
            v-for="minutes in hour.minutes"
            :key="minutes"
            >{{ minutes }}</span
          >
        </div>
      </div>
    </div>
    <div class="timetable" v-else>
      <h2>Brak rozkładu jazdy</h2>
    </div>
  </nav>
  <button @click="toggleNav" class="hamburger" re :class="{ active: isActive }">
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script>
export default {
  props: ["busStopInfo"],
  emits: ["set-markers"],
  data() {
    return {
      isActive: false,
      busStop: "",
      activeNumber: null,
      timetableLine: null,
      isLoading: false,
      streetError: null,
    };
  },
  methods: {
    toggleNav() {
      this.isActive = !this.isActive;
    },
    findStation() {
      try {
        this.$store.dispatch("transport/findStations", this.busStop);
        this.$emit("set-markers");
        this.streetError = null;
      } catch (error) {
        this.streetError = error.message;
      }
    },
    async displayTimetable(line) {
      this.isLoading = true;
      this.timetableLine = line;
      await this.$store.dispatch("transport/loadTimetable", {
        line: line,
        id: this.busStopInfo.id,
        number: this.busStopInfo.number,
      });
      this.isLoading = false;
    },
    async getVehicles() {
      fetch(
        "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey=c75e7626-71c8-4084-9f70-741f9a32a421&type=1&line=507"
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
  computed: {
    active() {
      return this.activeNumber;
    },
    hasTimetable() {
      return this.$store.getters["transport/hasTimetable"];
    },
    timetable() {
      return this.$store.getters["transport/timetable"];
    },
  },
  mounted() {
    this.getVehicles();
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: 300px;
  position: fixed;
  top: 0;
  left: -300px;
  height: 100vh;
  background-color: white;
  z-index: 9;
  transition: left 0.3s ease-in-out;
  padding: 6rem 1rem;
  &.active {
    left: 0;
  }
}
button.hamburger {
  position: fixed;
  left: 2vw;
  top: 3vh;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  background-color: transparent;
  border: none;
  cursor: pointer;
  span {
    width: 100%;
    padding: 2px;
    background-color: black;
    border-radius: 25px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    &:first-child {
      transform-origin: 0% 0%;
    }
  }
  &.active span:first-child {
    transform: rotate(45deg) translate(10px, -4px);
  }
  &.active span:nth-child(2) {
    transform: rotate(0deg) scale(0, 0);
  }
  &.active span:last-child {
    transform: rotate(-45deg) translate(11px, -5px);
  }
}

.form-control {
  padding: 1rem 0;
}
input {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  border: 1px solid black;
  width: 100%;
}

form button {
  margin-left: auto;
  margin-right: 0;
  display: block;
}

div.stop-details {
  margin-top: 2rem;
  &__lines {
    display: grid;
    margin-top: 1rem;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    & button {
      border: 1px solid black;
      border-radius: 5px;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
      background-color: transparent;
      margin: 0.25rem;
      height: 50px;
      text-align: center;
      cursor: pointer;
    }
  }
}
.time {
  margin-bottom: 0.25rem;
}

div.timetable {
  margin-top: 2rem;
  &__time {
    margin-top: 1rem;
  }
  & .hour {
    margin: 0 0.25rem;
    padding: 0.25rem;
    background-color: #ddd;
    display: inline-block;
  }
  & .minutes {
    margin: 0 0.25rem;
  }
}

.error {
  font-size: 12px;
  font-weight: bold;
  color: red;
}
</style>
