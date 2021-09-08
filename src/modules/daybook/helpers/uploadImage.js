import axios from "axios";

export default async function uploadImage(file) {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("upload_preset", "curso-vue");
    formData.append("file", file);

    const url = "https://api.cloudinary.com/v1_1/dmjxpnr5g/image/upload";
    const { data } = await axios.post(url, formData);

    return data.secure_url;
  } catch (error) {
    console.error("Error de cargar de imagen");
    console.error(error);
    return null;
  }
}
