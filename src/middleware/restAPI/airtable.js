import axios from "axios";
import encodeurl from "encodeurl";

export const getAllNews = async () => {
  const url =
    import.meta.env.VITE_AIRTABLE_BASE_URL +
    "/News?sort%5B0%5D%5Bfield%5D=date&sort%5B0%5D%5Bdirection%5D=desc";

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });

  return res.data.records;
};

export const getNews = async (newsId) => {
  const url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/News/" + newsId;

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });

  return res.data;
};

export const getAllFacility = async () => {
  const url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/Facility";

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  return res.data.records;
};

export const getFacility = async (facilityId) => {
  const url =
    import.meta.env.VITE_AIRTABLE_BASE_URL + "/Facility/" + facilityId;

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  return res.data;
};

export const getAllReservation = async () => {
  const url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/Reservation";

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  return res.data.records;
};
export const getReservationById = async (resId) => {
  const url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/Reservation/" + resId;

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  return res.data;
};

export const getReservationByUserId = async (userId) => {
  let url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/Reservation";
  url += `?filterByFormula=({userId}='${userId}')`;

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  console.log(res.data.records);
  return res.data.records;
};

export const getReservation = async (facilityName, date) => {
  let url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/Reservation";

  url += `?filterByFormula=({FacilityName}='${facilityName}')*(IS_SAME({date}, '${date}'))`;

  const res = await axios({
    method: "GET",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  return res.data.records;
};

export const removeReservation = async (resId) => {
  const url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/Reservation/" + resId;

  const res = await axios({
    method: "DELETE",
    url,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  return res.data;
};

export const addReservation = async (reservation, facilityName) => {
  const url = import.meta.env.VITE_AIRTABLE_BASE_URL + "/Reservation";

  const recordRes = await getReservation(facilityName, reservation.fields.date);

  if (recordRes.length > 0) {
    const error = new Error("その日はすでに予約されています。");
    throw error;
  }

  const res = await axios({
    method: "POST",
    url: url,
    data: reservation,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY,
    },
  });
  return res.data;
};
