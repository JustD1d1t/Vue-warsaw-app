export default {
  setStations(state, payload) {
    state.stations.push(payload);
  },
  findStations(state, payload) {
    const stations = state.stations;
    let street = payload;
    let number = null;
    if (payload.match(/.+\s\d\d/g)) {
      street = payload.slice(0, payload.length - 3);
      number = payload.slice(street.length + 1, payload.length);
    }
    let filteredStations = stations[0]
      .filter(
        (station) =>
          station.values[2].value.toLowerCase() === street.toLowerCase()
      )
      .map((station) => ({
        id: station.values[0].value,
        number: station.values[1].value,
        name: station.values[2].value,
        streetId: station.values[3].value,
        lat: station.values[4].value,
        lng: station.values[5].value,
        direction: station.values[6].value,
        from: station.values[7].value,
      }));
    if (number !== null) {
      filteredStations = filteredStations.filter(
        (station) => station.number === number
      );
    }
    if (filteredStations.length === 0) {
      throw new Error("Nie ma takiej ulicy");
    }
    state.filteredStations = filteredStations;
  },
  setTimetableArray(state, payload) {
    const allHoursAndMinutes = payload["result"]
      .map((e) => e["values"][5]["value"])
      .map((e) => {
        return { hour: e.substr(0, 2), minutes: e.substr(3, 2) };
      })
      .reduce((prevVal, currVal) => {
        if (prevVal[currVal.hour]) {
          return {
            ...prevVal,
            [currVal.hour]: [...prevVal[currVal.hour], currVal.minutes],
          };
        }
        return { ...prevVal, [currVal.hour]: [currVal.minutes] };
      }, {});

    const timetable = Object.keys(allHoursAndMinutes)
      .map((hour) => ({ hour, minutes: allHoursAndMinutes[hour] }))
      .sort((h1, h2) => h1.hour.localeCompare(h2.hour));
    state.timetable = timetable;
  },
};
