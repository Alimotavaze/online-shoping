import { Avatar, Box, Button, Divider, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../App";
import Popover from "@mui/material/Popover";

export default function LoginSection() {
  const { userInfo, logOut } = useApp();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const router = useNavigate();
  const handleLogin = () => {
    router("/login");
  };

  const handleProfile = () => {
    handleClose();
    router("/profile");
  };

  const handleLogout = () => {
    handleClose();
    logOut();
    router("/");
  };

  return (
    <Box>
      {!userInfo?.id && (
        <Button
          onClick={handleLogin}
          variant="text"
          sx={{ color: "common.white", fontFamily: "Anjoman" }}
        >
          ورود/ ثبت نام
        </Button>
      )}
      {userInfo?.id && (
        <>
          <Button
            variant="text"
            sx={{ color: "common.white" }}
            onClick={handleClick}
          >
            <Avatar alt={userInfo?.name} src={userInfo?.avatar} />
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} sx={{ width: 200 }}>
              <Button fullWidth variant="text" onClick={handleProfile}>
                مشاهده پروفایل
              </Button>
              <Divider />
              <Button fullWidth variant="text" onClick={handleLogout}>
                خروج
              </Button>
            </Stack>
          </Popover>
        </>
      )}
    </Box>
  );
}
