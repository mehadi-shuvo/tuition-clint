import toast from "react-hot-toast";

export const imageHosting = async (imageData: FormData) => {
  let imgInfo;

  await fetch(
    `https://api.imgbb.com/1/upload?key=21897cb44b377f386ccb3fa22c86f096`,
    {
      method: "POST",
      body: imageData,
    }
  )
    .then((res) => res.json())
    .then((imgHostInfo) => (imgInfo = imgHostInfo))
    .catch((err) =>
      toast.error(
        "Failed to upload image. Please try again later. Error: " + err.message
      )
    );

  return imgInfo;
};
