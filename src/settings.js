const WAW_API_BASE_URL =
  "https://api.um.warszawa.pl/api/" || process.env.WAW_API_BASE_URL;
const WAW_API_ALL_STOPS =
  "action/dbstore_get/?id=ab75c33d-3a26-4342-b36a-6e5fef0a3ac3&sortBy=id&apikey=";
const WAW_API_VEHICLES =
  "action/busestrams_get/?resource_id=f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey=";
const API_KEY = "c75e7626-71c8-4084-9f70-741f9a32a421";

export default {
  base: WAW_API_BASE_URL,
  allStops: WAW_API_ALL_STOPS,
  vehicles: WAW_API_VEHICLES,
  API: API_KEY,
};
