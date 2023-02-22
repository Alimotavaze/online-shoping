import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";

export default function Profile() {
  return (
    <>
      <Stack spacing={3}>
        <PageHeader
          title="سفارشات"
          links={[
            { title: "خانه", href: "/" },
            { title: "پروفایل", href: "#" },
          ]}
        />
      </Stack>
      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          <Card>
            <CardContent>
              <Link to="/profile/userInfo">اطلاعات کاربری</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Card>
            <CardContent>
              <Link to="/profile/orders">سفارشات</Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
