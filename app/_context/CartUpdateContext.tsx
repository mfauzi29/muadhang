import { createContext, Dispatch, SetStateAction } from "react";

interface CartUpdateContextData {
  updateCart: boolean;
  setUpdateCart: Dispatch<SetStateAction<boolean>>;
}

// Provide a default value that matches the shape of CartUpdateContextData
export const CartUpdateContext = createContext<CartUpdateContextData>({
  updateCart: false,
  setUpdateCart: () => {}, // This is a no-op function as the default for setUpdateCart
});
