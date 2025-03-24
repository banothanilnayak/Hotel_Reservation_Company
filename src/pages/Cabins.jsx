import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import styled from "styled-components";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { getAllCabins } from "../services/apiCabins";
import Spinner from "../ui/Spinner";
import { useQuery } from "@tanstack/react-query";

const GapBetweenTextAndTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function Cabins() {
  const [addNewCabin, setAddNewCabin] = useState(false);
  const {
    data: cabins,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    staleTime: 0,
    queryFn: getAllCabins,
  });
  if (isError) throw new Error("some error");
  if (isLoading) return <Spinner />;
  return (
    <Row type="horizontal">
      <GapBetweenTextAndTable>
        <Heading as="h1">All cabins</Heading>
        <CabinTable cabins={cabins} />
      </GapBetweenTextAndTable>
      <Button variation="primary" onClick={() => setAddNewCabin(!addNewCabin)}>
        Add New Cabin
      </Button>
      {addNewCabin && <CreateCabinForm />}
    </Row>
  );
}

export default Cabins;
