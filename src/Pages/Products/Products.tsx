import {
  Box,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import ProductItems, { ProductType } from "../../Components/ProductItems";
import useFetch from "../../Hooks/useFetch";
type ProductItemType = {
  count: number;
  rows: ProductType[];
};
const PAGE_SIZE = 24;

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageQuery = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const [page, setPage] = useState(pageQuery);
  const [search, setSearch] = useState("");
  const query = `/products?pageSize=${PAGE_SIZE}&page=${page}${
    searchQuery ? "&q=" + searchQuery : ""
  }`;
  const {
    isError,
    isLoading,
    data: { count = 0, rows: products = [] } = {},
  } = useFetch<ProductItemType>(query);
  useEffect(() => {
    setPage(pageQuery);
    setSearch(searchQuery);
  }, [pageQuery, searchQuery]);
  const handleSearchItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    const search = e.target.search;
    setSearch(search.value);
    if (search.value) navigate(`/products?search=${search.value}`);
    else navigate(`/products`);
    console.log("count:" + count);
  };

  if (isError)
    return (
      <Box>
        مشکلی در بارگزاری اطلاعات رخ داده است. لطفا ارتباط خود با اینترنت را
        بازبینی کنید.{" "}
      </Box>
    );
  if (isLoading) return <Box>در حال بارگزاری ...</Box>;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="محصولات"
        links={[
          { title: "خانه", href: "/" },
          { title: "محصولات", href: "#" },
        ]}
      />
      <form onSubmit={handleSearchItem}>
        <Stack direction="row" spacing={2}>
          <TextField
            defaultValue={search}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی محصول..."
            name="search"
            type="search"
          />
          <IconButton type="submit">
            <FaSearch />
          </IconButton>
        </Stack>
      </form>
      {count === 0 && <Box>جستجوی شما نتیجه‌ای دربر نداشت.</Box>}
      <Grid container spacing={{ md: 2, xs: 1, lg: 4 }}>
        {products.map((item) => (
          <Grid item xs={12} md={4} lg={3} key={item.id}>
            <ProductItems item={item} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        page={page}
        count={Math.ceil(count / PAGE_SIZE)}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`?page=${item.page}`}
          />
        )}
      />
    </Stack>
  );
}
