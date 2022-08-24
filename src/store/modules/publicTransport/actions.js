import settings from "../../../settings";
export default {
  async loadStations(context) {
    const response = await fetch(
      `${settings.base}${settings.allStops}${settings.API}`
    );
    if (!response.ok) {
      //
    }
    const data = await response.json();

    context.commit("setStations", data.result);
  },
  findStations(context, data) {
    context.commit("findStations", data);
  },
  async loadTimetable(context, data) {
    const response = await fetch(
      `${settings.base}action/dbtimetable_get/?id=e923fa0e-d96c-43f9-ae6e-60518c9f3238&busstopId=${data.id}&busstopNr=${data.number}&line=${data.line}&apikey=${settings.API}`
    );
    const responseData = await response.json();
    context.commit("setTimetableArray", responseData);
  },
};
