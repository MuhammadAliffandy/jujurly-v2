// src/pages/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppContainer from "../../components/atoms/AppContainer/AppContainer";
import AppHeadline from "../../components/molecules/AppHeadline/AppHeadline";
import AppButton from "../../components/atoms/AppButton/AppButton";
import AppTextField from "../../components/atoms/AppTextField/AppTextField";
import AppRichTextButton from "../../components/molecules/AppRichTextButton/AppRichTextButton";
import type { Users } from "../../utils/types";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import AOS from "aos";
import { updateToastConfig } from "../../utils/helper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlices";
import * as authRepository from "../../api/repository/authRepository";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleLogin = async (data: Users) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await authRepository.login(data);
      if (res.statusNumber == 200) {
        dispatch(setToken(res.data.token));

        toast.update(toastId, updateToastConfig("Login berhasil!", "success"));
        navigate("/dashboard");
      } else {
        toast.update(
          toastId,
          updateToastConfig(
            res.message || "Login gagal! tolong check kembali data anda.",
            "error"
          )
        );
      }
    } catch (_error) {
      console.error(_error);
      toast.update(
        toastId,
        updateToastConfig("Login gagal! coba lagi nanti", "error")
      );
    }
  };

  const onSubmit = (data: object) => {
    handleLogin(data as Users);
  };

  return (
    <AppContainer className="w-full h-screen flex flex-col items-start justify-center  relative">
      <AppContainer className="bg-cover relative w-full h-screen bg-[url('https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg')] " />
      <AppContainer className="flex  items-center justify-start w-full h-full bg-gradient-to-r from-black from-50% to-black/40   absolute ">
        <AppContainer className=" w-full sm:w-full  md:w-[50%] lg:w-[50%]  xl:w-[50%] h-full flex-col flex items-center justify-center">
          <AppContainer className=" w-[95%] sm:w[95%]  md:w-[95%] lg:w-[80%] xl:w-[80%] h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl ">
            <AppHeadline
              titleDataAos="fade-down"
              subtitleDataAos="fade-down"
              className="text-white !text-center font-unbounded"
              subtitleClassName="text-white font-poppins text-[16px] text-center"
              title="Selamat datang di Jujurly !"
              subtitle="Masuk untuk memberikan feedback jujur"
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
            <AppContainer
              dataAos="fade-down"
              dataAosDelay={300}
              className="flex flex-col w-full h-max gap-[10px] "
            >
              <label className="text-white text-[14px] font-poppins ">
                Password
              </label>
              <AppTextField
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                placeholder="Password"
                type="password"
              />
            </AppContainer>

            <p
              data-aos="flip-up"
              data-aos-delay={400}
              className="text-white text-[14px] self-end cursor-pointer font-poppins"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Lupa Password ?
            </p>
            <AppButton
              dataAos="zoom-in"
              dataAosDelay={500}
              className="bg-blue-500 font-poppins py-[15px]"
              text="Masuk"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            />

            <AppRichTextButton
              dataAos="flip-up"
              dataAosDelay={500}
              title="Belum punya akun?"
              subtitle="Daftar"
              onClick={() => {
                navigate("/register");
              }}
            />
          </AppContainer>
          <Icon
            data-aos="fade-left"
            data-aos-delay={600}
            icon={"mdi:arrow-back"}
            className="text-black bg-white rounded-full text-[36px] p-[4px] absolute z-90 top-3 left-3 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </AppContainer>
      </AppContainer>
    </AppContainer>
  );
};

export default LoginPage;
