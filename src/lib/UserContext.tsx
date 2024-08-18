import { createContext, useContext } from "react";

export type UserType = {
  id: number;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  isPremium: boolean;
  expiryDate: Date | null;
  subscriptionType: 'Monthly'|'Yearly'|null
};

export const UserContext = createContext<UserType | undefined>(undefined);

export const useContextUser = () => useContext(UserContext);
