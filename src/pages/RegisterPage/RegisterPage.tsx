// src/pages/RegisterPage.tsx
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
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlices";
import * as authRepository from "../../api/repository/authRepository";

const RegisterPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { handleSubmit, control, getValues } = useForm<Users>();

  const handleRegister = async (data: Users) => {
    const toastId = toast.loading("Proses Pendaftaran...");
    try {
      const res = await authRepository.register(data as Users);
      if (res.statusNumber === 201) {
        toast.update(
          toastId,
          updateToastConfig("Pendaftaran berhasil, Mulai masuk...", "success")
        );

        const loginData = await authRepository.login({
          email: data.email,
          password: data.password,
        });

        if (loginData.statusNumber === 200) {
          dispatch(setToken(loginData.data.accessToken));
          navigate("/dashboard");
        } else {
          toast.error(
            loginData.message || "Pendaftaran gagal! Silahkan coba lagi"
          );
        }
      } else {
        toast.update(
          toastId,
          updateToastConfig("Pendaftaran gagal! Silahkan coba lagi", "error")
        );
      }
    } catch (error) {
      console.log(error);
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
    <AppContainer className="w-full h-screen flex flex-col items-stretch justify-center    relative">
      <AppContainer className="bg-cover relative w-full   h-screen bg-[url('https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg')] " />
      <AppContainer className="flex  items-center justify-end w-full h-full bg-gradient-to-l from-black from-50% to-black/40   absolute overflow-y-auto">
        <AppContainer className=" w-full sm:w-full  md:w-[50%] lg:w-[50%]  xl:w-[50%] h-full flex-col flex items-center justify-start sm:justify-start md:justify-center lg:justify-center xl:justify-center relative">
          <AppContainer
            className="w-[95%] sm:w[95%]  md:w-[95%] lg:w-[80%] xl:w-[80%] 
          h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl
          py-[100px] sm:py-[100px] md:py-[100px] lg:py-[0px] xl:py-[0px] 
          "
          >
            <AppHeadline
              titleDataAos="fade-down"
              subtitleDataAos="fade-down"
              className="text-white font-unbounded text-center"
              subtitleClassName="text-white font-poppins text-[16px] text-center"
              title="Hallo, Selamat datang di Jujurly"
              subtitle="Daftarkan dirimu sekarang"
            />
            <AppContainer
              dataAos="fade-down"
              dataAosDelay={200}
              className="flex flex-col w-full h-max gap-[10px]"
            >
              <label className="text-white text-[14px] font-poppins ">
                Name
              </label>
              <AppTextField
                control={control}
                name="name"
                rules={{
                  required: "Name is required",
                  pattern: { value: "", message: "Invalid email format" },
                }}
                placeholder="Name"
              />
            </AppContainer>
            <AppContainer
              dataAos="fade-down"
              dataAosDelay={300}
              className="flex flex-col w-full h-max gap-[10px]"
            >
              <label className="text-white text-[14px] font-poppins ">
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
              dataAosDelay={400}
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
            <AppContainer
              dataAos="fade-down"
              dataAosDelay={400}
              className="flex flex-col w-full h-max gap-[10px] "
            >
              <label className="text-white text-[14px] font-poppins ">
                Konfirmasi Password
              </label>
              <AppTextField
                control={control}
                name="confirmPassword"
                rules={{
                  required: "Password confirmation is required",
                  validate: (value: string) =>
                    value === getValues("password") || "Password tidak cocok",
                }}
                placeholder="Confirm Password"
                type="password"
              />
            </AppContainer>

            <AppButton
              dataAos="zoom-in"
              dataAosDelay={500}
              className="bg-blue-500 font-poppins py-[15px]"
              text="Daftar"
              type="submit"
              onClick={handleSubmit(handleRegister)}
            />

            <AppRichTextButton
              title="Sudah punya akun?"
              subtitle="Masuk"
              onClick={() => {
                navigate("/login");
              }}
            />
          </AppContainer>
          <Icon
            data-aos="fade-right"
            data-aos-delay={600}
            icon={"mdi:arrow-back"}
            className="text-black bg-white rounded-full text-[36px] p-[4px] absolute z-90 top-3 right-3 cursor-pointer"
            onClick={() => navigate("/login")}
          />
        </AppContainer>
      </AppContainer>
    </AppContainer>
  );
};

export default RegisterPage;
