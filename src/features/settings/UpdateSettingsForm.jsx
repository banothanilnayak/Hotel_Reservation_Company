import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useGetSettingsHook";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useUpdateSettings } from "./useUpdateSettings";
import styled from "styled-components";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateSettingsForm() {
  const { data, isLoading } = useSettings(); //custom hook created to fetch the settings
  console.log("ank data", data);
  const { handleSubmit, register, formState } = useForm();
  const { errors } = formState; //toget the errors
  console.log(errors);
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
              <Error>{errors.minBookingLength.message} </Error>
            )
          }
          {...register("minBookingLength", {
            required: "This field is required",
          })}
          defaultValue={Number(data?.minBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          error={
            errors?.maxBookingLength?.message && (
              <Error>{errors.maxBookingLength.message}</Error>
            )
          }
          {...register("maxBookingLength", {
            required: "This field is required",
          })}
          defaultValue={Number(data?.maxBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestPerBooking"
          disabled={isUpdating}
          error={
            errors?.maxGuestPerBooking?.message && (
              <Error>{errors.maxGuestPerBooking.message}</Error>
            )
          }
          {...register("maxGuestPerBooking", {
            required: "This field is required",
          })}
          defaultValue={Number(data?.maxGuestPerBooking)}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          error={
            errors?.breakfastPrice?.message && (
              <Error>{errors.breakfastPrice.message} </Error>
            )
          }
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
          defaultValue={Number(data?.breakfastPrice)}
        />
      </FormRow>
      <FormRow>
        <Button>Update</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
