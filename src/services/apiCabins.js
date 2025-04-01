import supabase, { supabaseUrl } from "./supabase";

export async function getAllCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
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
export async function createEditCabin(newObj, editID = "") {

  const hasImagePath = newObj?.image?.startsWith?.(supabase);

  //creating a cabin
  const imgName = `${Math.random()}-${newObj.image.name}`.replaceAll("/", "");

  const imgPath = hasImagePath
    ? newObj.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imgName}`;

  //reusing the query
  let query = supabase.from("cabins");

  if (!editID) {
    //if no edit id then insert data else edit data
    query = query
      .insert([{ ...newObj, image: imgPath }])
      .select()
      .single();
  } else {
    // if edit id present then update cabin using editID
    query = query
      .update({ ...newObj, image: imgPath })
      .eq("id", editID)
      .select()
      .single();
  }

  //executing query based on condition
  const { data: newData, error } = await query;

  //uploading image to the storage once the text data is successfully stored inside the cabins cable
  const { error: uploadError } = await supabase.storage
    .from("cabins")
    .upload(imgName, newData.image);

  //if any error while uploading then delete the cabin
  if (uploadError) {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", newData.id);
    console.error(uploadError);
    throw new Error("cabin couldnt  created and failed to upload image ");
  }

  if (error) throw new Error("failed to create the cabin...");
  return newData;
}
