import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../components/atoms/AppContainer/AppContainer";
import AppButton from "../../components/atoms/AppButton/AppButton";
import AppTextField from "../../components/atoms/AppTextField/AppTextField";
import AppHeadline from "../../components/molecules/AppHeadline/AppHeadline";
import { useForm } from "react-hook-form";
import AppAnonimCard from "../../components/organisms/AppAnonimCard/AppAnonimCard";
import AppCarousel from "../../components/atoms/AppCaraousel/AppCaraousel";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import AOS from "aos";
import type { UserFeedback } from "../../utils/types";
import { updateToastConfig } from "../../utils/helper";
import { toast } from "react-toastify";
import * as userRepository from "../../api/repository/userRepository";

const UserLookupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const { handleSubmit, control } = useForm<UserFeedback>();

  const handleUserLookup = async (data: UserFeedback) => {
    const toastId = toast.loading("Mencari Pengguna..");
    setIsLoading(true);
    try {
      const res = await userRepository.userLookup(data.targetUser as string);
      if (res.statusNumber === 200) {
        setUserData(res.data);
        console.log(userData);
        toast.update(
          toastId,
          updateToastConfig("Pengguna ditemukan", "success")
        );
      } else {
        toast.update(
          toastId,
          updateToastConfig(
            "Gagal mendapatkan link feedback untuk pengguna ini",
            "error"
          )
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.update(
        toastId,
        updateToastConfig(
          "Terjadi kesalahan saat menghubungi server. Coba lagi nanti.",
          "error"
        )
      );
    }
  };

  return (
    <AppContainer className="flex w-full h-screen bg-gradient-to-b from-blue-500 to-blue-600/90 relative">
      <AppContainer className="w-[35%] hidden sm:hidden md:flex lg:flex  xl:flex h-full  items-center justify-center px-[40px]">
        <AppContainer className="flex flex-col gap-[60px] w-full">
          <AppHeadline
            titleDataAos="fade-down"
            subtitleDataAos="fade-down"
            className="text-white font-unbounded text-center "
            subtitleClassName=" font-poppins text-[14px] text-center"
            title="Jangan Malu malu, Nanti Kamu jadi Anonim Loh"
            titleClassName="text-[24px] text-white font-bold mb-[10px]"
            subtitle="Luapkan Perasaanmu dengan Feedback yang Jujur dan Konstruktif! Yuk, kasih feedback ke orang yang kamu kenal!"
          />

          <AppCarousel>
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <AppAnonimCard
                  dataAos="flip-right"
                  dataAosDelay="200"
                  key={index}
                  text="Et illum similique iure ut recusandae facere quo natus cum. Mollitia itaque et quae temporibus sed voluptas sint. Et beatae sed at non doloribus ab quis dolorum est. Doloremque aut accusamus est qui natus aut quo quasi rem. Repellat ipsa atque fugiat eaque et occaecati. Fuga odio possimus adipisci commodi et ipsum neque."
                />
              );
            })}
          </AppCarousel>
        </AppContainer>
      </AppContainer>
      <AppContainer className=" w-full sm:w-full  md:w-[65%] lg:w-[65%] xl:w-[65%]   h-full bg-white flex items-center justify-center">
        <AppContainer className=" w-[90%] sm:w-[60%] md:w-[60%] lg:w-[60%]  xl:w-[60%] flex flex-col h-max gap-[20px]  ">
          <AppHeadline
            titleDataAos="fade-down"
            subtitleDataAos="fade-down"
            className="text-black font-unbounded text-center"
            subtitleClassName="text-black font-poppins text-[16px] text-center"
            title="Mau Kasih Feedback ke Siapa Nih?"
            subtitle="Tulis username atau ID unik orang yang mau kamu kasih feedback"
          />

          <AppContainer
            dataAos="fade-down"
            dataAosDelay={200}
            className="flex flex-col w-full h-max gap-[10px]"
          >
            <label className="text-black text-[14px] font-poppins">
              Username ID
            </label>
            <AppTextField
              control={control}
              name="targetUser"
              rules={{
                required: "Nama ID Pengguna Harus Diisi",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "format nama salah",
                },
              }}
              placeholder="cth:iganarendra atau user123abc"
              className="!text-black"
            />
          </AppContainer>
          <AppButton
            dataAos="zoom-in"
            dataAosDelay={300}
            className="bg-blue-500 font-poppins py-[15px]"
            text={isLoading ? "Mencari..." : "Lanjut Kasih Feedback"}
            type="submit"
            onClick={handleSubmit(handleUserLookup)}
            disabled={isLoading}
          />

          <p
            data-aos="flip-up"
            data-aos-delay={400}
            className="font-poppins text-[14px] text-black text-center"
          >
            Pastikan kamu tau username atau ID yang bener ya, biar feedbacknya
            nyampe ke orang yang tepat.
          </p>
        </AppContainer>
      </AppContainer>
      <Icon
        data-aos="fade-left"
        data-aos-delay={600}
        icon={"mdi:arrow-back"}
        className="text-black bg-white border-1 border-gray-300 rounded-full text-[36px] p-[4px] absolute z-90 top-3 left-3 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </AppContainer>
  );
};

export default UserLookupPage;
