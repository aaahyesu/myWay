"use server";

export async function upload(formData: FormData) {
  const data = {
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  };
  console.log(data);

  return data;
}