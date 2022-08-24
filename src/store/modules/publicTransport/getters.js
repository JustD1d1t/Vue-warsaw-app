export default {
  stations(state) {
    return state.stations;
  },
  filteredStations(state) {
    return state.filteredStations;
  },
  hasTimetable(state) {
    return state.timetable !== null && state.timetable.length > 0;
  },
  timetable(state) {
    return state.timetable;
  },
};
