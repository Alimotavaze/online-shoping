import React from "react";
import { Link as linkReact } from "react-router-dom";
import { Breadcrumbs, Stack, styled, Typography } from "@mui/material";

type PageHeaderType = {
  links: {
    title: string;
    href: string;
  }[];
  title?: string;
};
const Link = styled(linkReact)(({ theme }) => ({
  textDecoration: "none",
}));
export default function PageHeader({ links, title }: PageHeaderType) {
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      {title && (
        <Typography variant="h4" component={"h1"}>
          {title}
        </Typography>
      )}
      <Breadcrumbs>
        {links.map((item, index) => (
          <Link to={item.href} key={index}>
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  );
}
