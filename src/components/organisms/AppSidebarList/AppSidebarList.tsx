"use client";

import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppSideBar from "../../molecules/AppSidebar/AppSidebar";

const AppSideBarList: React.FC = () => {
  //   const { push } = useRouter();
  //   const dipatch = useDispatch();

  //   const pathname = usePathname();
  //   const lastSegment = pathname.split("/").filter(Boolean).pop();

  //   const handleLogout = async () => {
  //     try {
  //       const res = await authRepository.logout();

  //       if (res.statusNumber === "OK") {
  //         dipatch(setToken(""));
  //         persistor.purge();
  //         push("auth/login");
  //       } else {
  //         toast.error(res.message || "Logout failed. Please try again.");
  //       }
  //     } catch (error) {
  //       toast.error("Internal server error. Please try again later.");
  //     }
  //   };

  return (
    <AppContainer className=" h-full flex flex-col gap-[30px] p-[10px]">
      <h1 className="h-max text-white text-center text-[24px] font-bold font-unbounded ">
        Jujurly
      </h1>
      <AppContainer className="h-full  w-full flex flex-col items-stretch justify-between">
        <AppSideBar
          icon="mdi:view-dashboard"
          text="Dashboard"
          isSelected={true}
        />
        <AppSideBar icon="mdi:logout" text="Logout" onClick={() => {}} />
      </AppContainer>
    </AppContainer>
  );
};

export default AppSideBarList;
