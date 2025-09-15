import React from "react";
import Container from "../components/layout/Container";
import { useGetAllProductsQuery } from "../service/api";
const Dashboard = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  if (error) {
    return (
      <div className="text-red-500 flex justify-center items-center">
        Something Went Wrong
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-red-500 flex justify-center items-center">
        Data is Loading...
      </div>
    );
  }
  return (
    <Container>
      <div className="flex  h-[calc(100vh-70px)] md:w-[calc(100% - 280px)] text-white flex-col items-center">
        {data?.products.map((items) => (
          <div
            key={items.id}
            className="h-[50px] border-2 border-white/50 p-5 flex justify-center items-center rounded-lg m-3 shadow-md shadow-white/40 hover:shadow-none duration-500 hover:text-white/70 hover:border-white"
          >
            {items.title}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;
