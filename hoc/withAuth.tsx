import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const { isAuthenticated } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default withAuth;
