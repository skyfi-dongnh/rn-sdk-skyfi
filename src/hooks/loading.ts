import { useContext } from "react";
import { ContextLoading } from "../components/common/loading";

export const useLoading = () => useContext(ContextLoading);

