import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppContainer from "../../components/atoms/AppContainer/AppContainer";
import AppHeadline from "../../components/molecules/AppHeadline/AppHeadline";
import AppButton from "../../components/atoms/AppButton/AppButton";
import AppTextField from "../../components/atoms/AppTextField/AppTextField";
import AppRichTextButton from "../../components/molecules/AppRichTextButton/AppRichTextButton";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import AOS from "aos";
import type { Users } from "../../utils/types";
import { updateToastConfig } from "../../utils/helper";
import { toast } from "react-toastify";

import * as authRepository from "../../api/repository/authRepository";

const ForgotPasswordPage: React.FC = () => {
  const { handleSubmit, control } = useForm<Users>();
  const navigate = useNavigate();

  const handleForgotPass = async (data: Users) => {
    const toastId = toast.loading("Prosess Mengirim Email...");
    try {
      const payload = {
        email: data.email,
      };
      const res = await authRepository.forgotPass(payload);

      if (res.statusNumber == "OK") {
        toast.update(
          toastId,
          updateToastConfig("Email Telah Terkirim.", "success")
        );
        navigate("/login");
      } else {
        toast.update(
          toastId,
          updateToastConfig(
            res.message || "Gagal mengirim Email. Silahakn coba lagi.",
            "error"
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.update(
        toastId,
        updateToastConfig("Gagal mengirim Email. Silahakn coba lagi", "error")
      );
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <AppContainer className="w-full h-screen flex flex-col items-start justify-center  relative">
      <AppContainer className="bg-cover relative w-full h-screen bg-[url('https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg')] " />
      <AppContainer className="flex  items-center justify-start w-full h-full bg-gradient-to-r from-black from-50% to-black/40   absolute ">
        <AppContainer className=" w-full sm:w-full  md:w-[50%] lg:w-[50%]  xl:w-[50%] h-full flex-col flex items-center justify-center">
          <AppContainer className=" w-[95%] sm:w[95%]  md:w-[95%] lg:w-[80%] xl:w-[80%] h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl shadow-xl">
            <AppHeadline
              titleDataAos="fade-down"
              subtitleDataAos="fade-down"
              className="text-white font-unbounded"
              subtitleClassName="text-white font-poppins text-[16px] text-center w-full"
              title="Lupa Password ?"
              subtitle="Tidak apa apa, kita bantu untuk ulang password"
            />
            <AppContainer
              dataAos="fade-down"
              dataAosDelay={200}
              className="flex flex-col w-full h-max gap-[10px]"
            >
              <label className="text-white text-[14px] font-poppins">
                Email
              </label>
              <AppTextField
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Invalid email format",
                  },
                }}
                placeholder="Email"
              />
            </AppContainer>

            <AppButton
              dataAos="zoom-in"
              dataAosDelay={300}
              className="bg-blue-500 font-poppins py-[15px]"
              text="Reset Password"
              type="submit"
              onClick={handleSubmit(handleForgotPass)}
            />

            <AppRichTextButton
              dataAos="flip-up"
              dataAosDelay={300}
              title="Sudah ingat passwordnya?"
              subtitle="Masuk"
              onClick={() => {
                navigate("/login");
              }}
            />
          </AppContainer>
        </AppContainer>
        <Icon
          data-aos="fade-left"
          data-aos-delay={600}
          icon={"mdi:arrow-back"}
          className="text-black bg-white rounded-full text-[36px] p-[4px] absolute z-90 top-3 left-3 cursor-pointer"
          onClick={() => navigate("/login")}
        />
      </AppContainer>
    </AppContainer>
  );
};

export default ForgotPasswordPage;
