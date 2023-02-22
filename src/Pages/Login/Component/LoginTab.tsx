import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import usePost from "../../../Hooks/usePost";
import { toast } from "react-toastify";
import { useApp } from "../../../App";
import { useNavigate } from "react-router";

export default function LoginTab() {
  const router = useNavigate();
  const { updateUserInfo } = useApp();
  const { callPost, isLoading } = usePost("/users/login");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    const res = await callPost(data);
    if (res?.success) {
      updateUserInfo(res?.data.user, res?.data.token);
      toast("ورود با موفقیت انجام شد", { type: "success" });
      router("/");
    } else {
      toast("نام کاربری یا کلمه عبور شما معتبر نیست!", { type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} mt={4} sx={{ maxWidth: 500 }}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^\S+@\S+$/i,
          }}
          render={({ field, fieldState }) => (
            <TextField
              type={"email"}
              size={"small"}
              label={"ایمیل"}
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
              type={"password"}
              size={"small"}
              label={"کلمه عبور"}
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
      </Stack>
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        type="submit"
        disabled={isLoading}
      >
        ورود
      </Button>
    </form>
  );
}
