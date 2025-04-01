import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useState } from "react";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

//intialized to empty so that does not show error missing prop validation inside the  function
function CreateCabinForm({ cabinData = {}, editCabin = "" }) {
  const {
    handleSubmit,
    register,
    getValues,
    formState,
    reset: resetForm,
  } = useForm({
    defaultValues: editCabin ? cabinData : {},
  });

  const { errors } = formState;
  const queryClient = useQueryClient();

  //creating a new cabin
  const { mutate: create, isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("successfully created a cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //editing the cabin
  const { mutate: edit, isEditing } = useMutation({
    mutationFn: ({ newData, editID }) => createEditCabin(newData, editID),
    onSuccess: () => {
      toast.success("successfully Edited a cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmitForm(data) {
    if (data?.id) {
      const { id: editID, ...newData } = data;
      edit({ newData, editID });
    } else {
      create(data);
    }
  }

  function onErrorHandle(error) {
    //has no work with this can use whenever need to monitor the error
    // console.log("iam reaching here");
    // console.log("errors", error);
  }

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm, onErrorHandle)}>
      <FormRow
        htmlFor="name"
        label="name"
        error={errors?.name?.message && <Error>{errors.name.message}</Error>}
      >
        <Input
          type="text"
          disabled={isCreating || isEditing}
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="maxCapacity"
        label="Maximum capacity"
        error={
          errors?.maxCapacity?.message && (
            <Error>{errors.maxCapacity.message}</Error>
          )
        }
      >
        
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="regularPrice"
        label="Regular price"
        error={
          errors?.regularPrice?.message && (
            <Error>{errors.regularPrice.message}</Error>
          )
        }
      >
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 100,
              message:
                "Minimum regular price should be greater then or equal to 100",
            },
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="discount"
        label="Discount"
        error={
          errors?.discount?.message && <Error>{errors.discount.message}</Error>
        }
      >
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              return (
                value <= Number(getValues().regularPrice) ||
                "Discount should be less then or equal to the regular price"
              );
            },
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        htmlFor="description"
        label="Description for website"
        error={
          errors?.description?.message && (
            <Error>{errors.description.message}</Error>
          )
        }
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating || isEditing}
          name="description"
          {...register("description", {
            required: "This field is required",
          })}
          defaultValue=""
        />
      </FormRow>

      <FormRow htmlFor="image" label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating || isEditing}
          {...register("image", {
            required: editCabin ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button> {editCabin ? `Edit cabin` : `Create New Cabin`}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
