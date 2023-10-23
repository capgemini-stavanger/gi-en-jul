import ApiService from "../functions/apiServiceClass";

async function getLocations(): Promise<string[]> {
  const apiservice = new ApiService();
  const locations: string[] = await apiservice
    .get("event/SignUpLocations")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      console.error(e);
    });
  return locations ?? [];
}

export default getLocations;
