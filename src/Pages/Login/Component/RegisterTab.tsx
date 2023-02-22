import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../../App";
import usePost from "../../../Hooks/usePost";

export default function RegisterTab() {
  const router = useNavigate();
  const { updateUserInfo } = useApp();
  const { callPost, isLoading } = usePost("/users/register");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      family: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    const res = await callPost(data);
    if (res?.success) {
      updateUserInfo(res?.data?.user, res?.data?.token);
      router("/");
      toast("ورود با موفقیت انجام شد", { type: "success" });
    } else {
      toast("نام کاربری یا کلمه عبور شما معتبر نیست!", { type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} mt={4} sx={{ maxWidth: 500 }}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <TextField
              size="small"
              label="نام"
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name="family"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <TextField
              size="small"
              label="نام خانوادگی"
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              size="small"
              label="تلفن همراه"
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^\S+@\S+$/i,
          }}
          render={({ field, fieldState }) => (
            <TextField
              type="email"
              size="small"
              label="ایمیل"
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <TextField
              type="password"
              size="small"
              label="کلمه عبور"
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
      </Stack>
      <Button type="submit" sx={{ mt: 4 }} variant="contained">
        ثبت نام
      </Button>
    </form>
  );
}
