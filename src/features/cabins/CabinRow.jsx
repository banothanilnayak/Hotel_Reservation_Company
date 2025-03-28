import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [editCabin, setEditCabin] = useState(false);
  console.log(editCabin);
  const {
    id: cabinID,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  const queryClient = useQueryClient(); //queryclient to invalidate the queries so that once the data is deleted it will refresh the data by invalidating the query

  //useMutation to delete the row
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} members.</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setEditCabin(!editCabin)}>Edit</button>
          <button disabled={isDeleting} onClick={() => mutate(cabinID)}>
            Delete
          </button>
        </div>
      </TableRow>
      <div>
        {editCabin && (
          <CreateCabinForm cabinData={cabin} editCabin={editCabin} />
        )}
      </div>
    </>
  );
}

export default CabinRow;
