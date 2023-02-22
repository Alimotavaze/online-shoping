import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useApp } from "../../App";
import CartDetail from "./Components/CartDetails";
import TableItem from "./Components/TableItem";

export default function Cart() {
  const { cart } = useApp();

  if (cart.length < 1)
    return (
      <Typography variant="h5" textAlign={"center"} mt={10}>
        سبد خرید شما خالیست.
      </Typography>
    );

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell>نام محصول</TableCell>
                <TableCell>قیمت: تومان</TableCell>
                <TableCell>تعداد</TableCell>
                <TableCell>کل : تومان</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableItem item={item} key={item.id} />
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartDetail />
        </Grid>
      </Grid>
    </Box>
  );
}
