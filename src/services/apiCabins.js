import supabase, { supabaseUrl } from "./supabase";

export async function getAllCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  console.log("getAllCabins", error);
  if (error) throw new Error("failed fetching the cabins..");
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("failed to delete the cabin...");
  }
  return data;
}

//https://tbcqrlrgetvgxzialkex.supabase.co/storage/v1/object/public/cabins//cabin-001.jpg
export async function createEditCabin(newObj) {
  console.log("newObj pritnting", newObj);
  //creating a cabin
  const imgName = `${Math.random()}-${newObj.image.name}`.replaceAll("/", "");
  const imgPath = `${supabaseUrl}/storage/v1/object/public/cabins/${imgName}`;

  const { data: newData, error } = await supabase
    .from("cabins")
    .insert([{ ...newObj, image: imgPath }])
    .select()
    .single();

  console.log("newdata image url", newData);
  //uploading image
  const { error: uploadError } = await supabase.storage
    .from("cabins")
    .upload(imgName, newData[0].image);

  //if any error while uploading then delete the cabin
  if (uploadError) {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", newData[0].id);
    console.error(uploadError);
    throw new Error("cabin couldnt  created and failed to upload image ");
  }

  if (error) throw new Error("failed to create the cabin...");
  return newData;
}
