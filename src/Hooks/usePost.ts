import { useState } from "react";

function usePost(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const callPost = async (body?: object) => {
    setIsLoading(true);
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      ...(body ? { body: JSON.stringify(body) } : {}),
      headers: {
        "content-type": "application/json",
        ...(token ? { Authorization: "Bearer" + token } : {}),
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        return {
          success: false,
          error: err,
        };
      })
      .finally(() => {
        setIsLoading(false);
      });

    return response;
  };
  return {
    isLoading,
    callPost,
  };
}
export default usePost;
