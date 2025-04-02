import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useGetSettingsHook";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { data, isLoading } = useSettings(); //custom hook created to fetch the settings
  const { handleSubmit, register, formState, getValues } = useForm();
  const { errors } = formState; //toget the errors
  const { isUpdating, settingsUpdateMutation } = useUpdateSettings();
  if (isLoading) return <Spinner />; // showing spinner while the appl.set. are being fetched
  function handleSubmitForm(data) {
    console.log("application settings", data);
    settingsUpdateMutation(data);
  }

  function handleError(error) {}

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm, handleError)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          error={
            errors?.minBookingLength?.message && (
              <Error message={errors.minBookingLength.message} />
            )
          }
          {...register("minBookingLength", {
            required: "This field is required",
          })}
          defaultValue={parseInt(data?.minBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          error={
            errors?.maxBookingLength?.message && (
              <Error message={errors.maxBookingLength.message} />
            )
          }
          {...register("maxBookingLength", {
            required: "This field is required",
          })}
          defaultValue={parseInt(data?.maxBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestPerBooking"
          disabled={isUpdating}
          error={
            errors?.maxGuestPerBooking?.message && (
              <Error message={errors.maxGuestPerBooking.message} />
            )
          }
          {...register("maxGuestPerBooking", {
            required: "This field is required",
          })}
          defaultValue={parseInt(data?.maxGuestPerBooking)}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          error={
            errors?.breakfastPrice?.message && (
              <Error message={errors.breakfastPrice.message} />
            )
          }
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
          defaultValue={parseInt(data?.breakfastPrice)}
        />
      </FormRow>
      <FormRow>
        <Button>Update</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
