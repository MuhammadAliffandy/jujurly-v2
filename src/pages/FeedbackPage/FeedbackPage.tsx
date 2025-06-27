// src/pages/FeedbackPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import FeedbackForm from "../../pages/FeedbackPage/FeedbackForm";
import type { UserFeedback } from "../../utils/types";
import { updateToastConfig } from "../../utils/helper";
import { toast } from "react-toastify";
import * as userRepository from "../../api/repository/userRepository";

const FeedbackPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setUserExists(false);
      return;
    }

    handleUserLookup({ targetUser: userId });
  }, [userId]);

  const handleUserLookup = async (data: UserFeedback) => {
    setChecking(true);
    const toastId = toast.loading("Proses Pendaftaran...");

    try {
      const res = await userRepository.userLookup(data.targetUser as string);
      if (res.statusNumber === 200) {
        toast.update(
          toastId,
          updateToastConfig("Pendaftaran berhasil, Mulai masuk...", "success")
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
      setChecking(false);
    } catch (error) {
      setChecking(false);
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

  useEffect(() => {
    if (userExists === false) {
      navigate("/ke", { state: { userNotFound: true } });
    }
  }, [userExists, navigate]);

  if (!userId) {
    console.warn("No userId found in URL, redirecting to landing page.");
    return <Navigate to="/" replace />;
  }
  if (checking) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Mengecek pengguna...
      </div>
    );
  }
  if (userExists === false) {
    return null; // Will redirect
  }
  return <FeedbackForm userId={"1"} />;
};

export default FeedbackPage;
