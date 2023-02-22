import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import PageHeader from "../../Components/PageHeader";
import useFetch from "../../Hooks/useFetch";
type DataType = {
  count: number;
  rows: {
    Address: string;
    createAt: string;
    date: string | null;
    id: number;
    quantity: number;
    status: string;
    statusTitle: string;
    total: number;
  }[];
};
export default function Orders() {
  const {
    isError,
    isLoading,
    data: { count, rows } = {},
  } = useFetch<DataType>("/orders");
  return (
    <>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <PageHeader
          title="سفارشات"
          links={[
            { title: "خانه", href: "/" },
            { title: "پروفایل", href: "/profile" },
            { title: "سفارشات", href: "#" },
          ]}
        />
      </Stack>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>شماره سفارش</TableCell>
              <TableCell>تاریخ سفارش</TableCell>
              <TableCell>وضعیت سفارش</TableCell>
              <TableCell>تعداد کل</TableCell>
              <TableCell>قیمت کل</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {new Date(item.createAt).toLocaleString()}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.total.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
