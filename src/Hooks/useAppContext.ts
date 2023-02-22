import { useState } from "react";
export type UserInfoType = {
  id: number;
  name: string;
  family: string;
  email: string;
  phone?: string;
  avatar?: string;
};

export type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type AppContextType = {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeCart: (id: number) => void;
  updateCart: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartItem: (id: number) => CartItemType | null;
  userInfo: UserInfoType;
  updateUserInfo: (value: UserInfoType, token: string) => void;
  logOut: () => void;
};

function useAppContext() {
  const cartItem = localStorage.getItem("cart") || "[]";
  const [cart, setCart] = useState<CartItemType[]>(JSON.parse(cartItem));

  const userInfoStorage = localStorage.getItem("userInfo") || "{}";
  const [userInfo, setUserInfo] = useState<UserInfoType>(
    JSON.parse(userInfoStorage)
  );

  const updateUserInfo = (userInfo: UserInfoType, token: string) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("token", token);
    setUserInfo(userInfo);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUserInfo({} as UserInfoType);
  };

  const addToCart = (item: CartItemType) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItem = JSON.parse(cart);
      const index = cartItem.findIndex((cartItem: CartItemType) => {
        return cartItem.id === item.id;
      });
      if (index === -1) {
        cartItem.push(item);
      } else {
        cartItem[index].quantity += item.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(cartItem));
      setCart(cartItem);
    } else {
      localStorage.setItem("cart", JSON.stringify([item]));
      setCart([item]);
    }
  };
  const removeCart = (id: number) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItem = JSON.parse(cart);
      const index = cartItem.findIndex((cartItem: CartItemType) => {
        return cartItem.id === id;
      });
      cartItem.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItem));
      setCart(cartItem);
    }
  };
  const updateCart = (id: number, quantity: number) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItem = JSON.parse(cart);
      const index = cartItem.findIndex((cartItem: CartItemType) => {
        return cartItem.id === id;
      });
      cartItem[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cartItem));
      setCart(cartItem);
    }
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const getCartItem = (id: number) => {
    return cart.find((f) => f.id === id) || null;
  };
  return {
    cart,
    addToCart,
    removeCart,
    updateCart,
    clearCart,
    getCartItem,
    userInfo,
    updateUserInfo,
    logOut,
  };
}
export default useAppContext;
