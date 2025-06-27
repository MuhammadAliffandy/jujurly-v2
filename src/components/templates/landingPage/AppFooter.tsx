import AppContainer from "../../atoms/AppContainer/AppContainer";
import { Icon } from "@iconify/react";

const AppFooter: React.FC = () => {
  return (
    <footer className=" h-full lg:h-[20vw]  xl:h-[20vw] bg-blue-500 w-full flex items-center justify-center       py-[100px] sm:py-[100px] md:py-[100px] lg:py-[0px] xl:py-[0px]">
      <AppContainer className="flex flex-col items-center gap-[20px]">
        <AppContainer className="flex flex-col items-center justify-center gap-[10px]">
          <h3
            data-aos="fade-down"
            className="text-[28px] text-white font-unbounded font-bold"
          >
            Jujurly
          </h3>
          <p
            data-aos="fade-down"
            data-aos-delay="200"
            className="text-[16px] font-poppins w-fit text-white"
          >
            Feedback jujur, biar makin mujur
          </p>
        </AppContainer>
        <AppContainer className="flex items-center gap-[10px]">
          <Icon
            data-aos="fade-down"
            data-aos-delay="400"
            icon={"mdi:instagram"}
            className="text-[40px] text-white rounded-full border-2 border-white p-[5px]"
          />
          <Icon
            data-aos="fade-down"
            data-aos-delay="500"
            icon={"mdi:facebook"}
            className="text-[40px] text-white rounded-full border-2 border-white p-[5px]"
          />
          <Icon
            data-aos="fade-down"
            data-aos-delay="600"
            icon={"mdi:twitter"}
            className="text-[40px] text-white rounded-full border-2 border-white p-[5px]"
          />
          <Icon
            data-aos="fade-down"
            data-aos-delay="700"
            icon={"mdi:linkedin"}
            className="text-[40px] text-white rounded-full border-2 border-white p-[5px]"
          />
        </AppContainer>
        <p className="text-[14px] font-poppins text-center text-white/70 w-[60%]">
          Officia ab ut qui voluptas. Tempora autem earum accusamus ducimus
          saepe et sed totam rem.
        </p>
      </AppContainer>
    </footer>
  );
};
export default AppFooter;
