import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      fetch("/api/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.valid) {
            localStorage.removeItem("token");
            router.push("/login");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/login");
        });
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
