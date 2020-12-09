import { useEffect } from "react";
import { useRouter } from "next/router";

const Redirect = ({ to, query }) => {
  const router = useRouter();

  useEffect(() => {
    // redirection message will be added as URL query string (...?message=NOT_AUTHORISED)
    router.push({ pathname: to, query });
  });

  return null;
};

export default Redirect;
