import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../components/atoms/AppContainer/AppContainer";
import AppSideBarList from "../../components/organisms/AppSidebarList/AppSidebarList";
import { useForm } from "react-hook-form";
import type { FeedbackItem } from "../../utils/types";
import { convertDateString } from "../../utils/helper";
import AppFeedbackCard from "../../components/organisms/AppFeedbackCard/AppFeedbackCard";
import AppFeedbackView from "../../components/organisms/AppFeedbackView/AppFeedbackView";
import AppFilterFeedback from "../../components/molecules/AppFilterFeedback/AppFilterFeedback";
import AppToolbarDashboard from "../../components/organisms/AppToolbarDashboard/AppToolbarDashboard";
import AppMiniToolbar from "../../components/molecules/AppMiniToolbar/AppMiniToolbar";
import AOS from "aos";
import { toast } from "react-toastify";
import * as userRepository from "../../api/repository/userRepository";
import * as feedbackRepository from "../../api/repository/feedbackRepository";

const DashboardPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [currentFeedbacks, setCurrentFeedbacks] = useState<FeedbackItem[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: 1,
      sender: "Rina",
      timestamp: "2025-06-25T10:30:00Z",
      context: "Landing Page",
      sentiment: "positif",
      summary: "Tampilan landing page terlihat menarik dan bersih.",
      constructiveCriticism:
        "Coba tambahkan CTA (Call To Action) yang lebih menonjol di atas lipatan.",
    },
    {
      id: 2,
      sender: "",
      timestamp: "2025-06-25T11:15:00Z",
      context: "Formulir Kontak",
      sentiment: "negatif",
      summary: "Formulir terlihat membingungkan.",
      constructiveCriticism:
        "Sederhanakan form dengan mengurangi jumlah field dan tambahkan label yang jelas.",
    },

    {
      id: 3,
      sender: "Anonim",
      timestamp: "2025-06-25T13:45:00Z",
      context: "-",
      sentiment: "netral",
      summary: "Fitur sudah berjalan baik namun belum ada yang menonjol.",
      constructiveCriticism:
        "Bisa ditambahkan animasi atau transisi kecil untuk memberi kesan interaktif.",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [feedbackViewOpen, setfeedbackViewOpen] = useState<boolean>(false);
  const [, setFeedback] = useState<FeedbackItem | null>(null);
  const [user, setUser] = useState<{ username?: string; email: string }>({
    email: "",
  });
  const [checkedMode, setCheckedMode] = useState<boolean>(false);
  const [, setAllChecked] = useState<boolean>(false);
  const [selectedFeedbackIds, setSelectedFeedbacks] = useState<number[]>([]);
  const navigate = useNavigate();
  const { control, watch } = useForm({});
  const searchValue = watch("search");

  const getUser = async () => {
    try {
      const res = await userRepository.getUser();
      if (res.statusNumber === 200) {
        setUser(res.data);
        console.log(user);
      } else {
        toast.error(res.message || "Gagal Menemukan Pengguna.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Gagal Menemukan Pengguna.");
    }
  };

  const handleFeedbackList = async () => {
    setIsLoading(true);
    console.log(isLoading);
    try {
      const res = await feedbackRepository.getFeedbacks();
      if (res.statusNumber == 200) {
        setFeedbacks(res.data);
        setCurrentFeedbacks(res.data);
      } else {
        toast.error(res.message || "Gagal Mengambil data Feedbacks");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Gagal Mengambil data Feedbacks");
      setIsLoading(false);
    }
  };

  const handleFeedbackSelected = (value: boolean, feedbackId: number) => {
    if (value) {
      setSelectedFeedbacks((prev) => [...prev, feedbackId]);
    } else {
      setSelectedFeedbacks((prev) => prev.filter((id) => id !== feedbackId));
    }
  };

  const handleSelectAll = (value: boolean) => {
    setAllChecked(value);
    if (value) {
      setSelectedFeedbacks(feedbacks.map((data: FeedbackItem) => data.id));
    } else {
      setSelectedFeedbacks([]);
    }
  };

  const handleFeedbackSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFeedbacks(currentFeedbacks);
      return;
    }

    const filteredNotes = currentFeedbacks.filter((fb) =>
      fb.context.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFeedbacks(filteredNotes);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFeedbackList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchValue !== undefined) {
      handleFeedbackSearch(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <AppContainer className="w-full flex h-screen max items-stretch bg-white overflow-y-hidden relative">
      <AppContainer
        dataAos="fade-right"
        className={`w-[50%] sm:w-[50%] md:w-[30%] lg:w-[20%] xl:w-[15%] h-full  bg-blue-400  ${
          sidebarOpen &&
          " block sm:block md:block lg:block left-0 z-20 absolute sm:absolute md:absolute lg:absolute"
        }  ${!sidebarOpen && " hidden sm:hidden md:hidden lg:hidden"} xl:block`}
      >
        <AppSideBarList />
      </AppContainer>
      {/*  */}
      <AppContainer
        className="w-full h-full flex flex-col items-stretch flex-grow"
        onClick={() => {
          if (sidebarOpen) setSidebarOpen(false);
        }}
      >
        <AppToolbarDashboard
          dataAos="fade-down"
          username="Rina"
          control={control}
          onAddFeedbackClick={() => {
            navigate("/beri-feedback");
          }}
          onClickSidebar={() => setSidebarOpen(true)}
        />

        {/*  */}
        <AppContainer className="w-full h-full max-h-[90vh]   flex items-stretch bg-gray-100 gap-[10px] p-[10px] flex-grow ">
          <AppContainer
            dataAos="flip-left"
            dataAosDelay={300}
            className={`
              ${
                feedbackViewOpen
                  ? "!hidden sm:!hidden md:!flex lg:!flex xl:!flex"
                  : "flex"
              }
              w-full sm:w-full md:w-[45%] lg:w-[45%] xl:w-[45%]
              h-full flex flex-col gap-[10px] p-[20px] bg-white  rounded-2xl shadow-xl
            `}
          >
            <AppMiniToolbar
              onChangeCheckedMode={(setMode) => setCheckedMode(setMode)}
              onChecked={(checked) => {
                handleSelectAll(checked);
              }}
            />
            <AppFilterFeedback />
            <AppContainer className="flex flex-col items-start  gap-[10px] overflow-y-auto flex-grow  ">
              {feedbacks.map((fb) => (
                <AppFeedbackCard
                  key={fb.id}
                  checkMode={checkedMode}
                  checked={selectedFeedbackIds.includes(fb?.id || 0)}
                  sender={fb.sender}
                  sentiment={fb.sentiment as "positif" | "negatif" | "netral"}
                  context={fb.context}
                  summary={fb.summary}
                  constructiveCriticism={fb.constructiveCriticism}
                  timestamp={convertDateString(fb.timestamp)}
                  onClickCard={() => {
                    setFeedback(fb as FeedbackItem);
                    setfeedbackViewOpen(true);
                  }}
                  onChecked={(value: boolean) => {
                    handleFeedbackSelected(value, fb.id || 0);
                  }}
                />
              ))}
            </AppContainer>
          </AppContainer>
          {/*  */}
          <AppContainer
            className={`
            ${feedbackViewOpen ? "!flex" : "hidden"}
            w-full h-full
            hidden sm:hidden md:flex lg:flex  xl:flex flex-col gap-[20px] rounded-2xl shadow-xl flex-grow   `}
          >
            <AppContainer
              className="flex flex-col w-full h-full gap-[10px] rounded-2xl "
              dataAos="flip-right"
              dataAosDelay={300}
            >
              <AppFeedbackView
                id={1}
                sender="Rina"
                sentiment="positif"
                context="Landing Page"
                summary="Necessitatibus illum soluta quam consequatur eos. Quos dignissimos molestias qui quis quasi voluptatem a sit. Velit aut quia deleniti quasi ea accusantium. Et ut nemo quia tempore necessitatibus accusantium qui vitae explicabo. Alias cum quia laudantium expedita. Et placeat doloremque suscipit culpa magni consectetur.
                  
                  Ipsa sit voluptatem neque quaerat aut sapiente quis culpa. Rem iure corrupti sit. Error et qui. Consectetur placeat blanditiis itaque est qui non et et. Ea omnis est quis blanditiis consequatur ab quae et nisi. Iusto expedita sunt repudiandae qui molestias et.
                  
                  Enim quo provident sed inventore impedit praesentium. Natus reiciendis harum qui. Ipsa et est."
                constructiveCriticism="Coba tambahkan CTA (Call To Action) yang lebih menonjol di atas lipatan."
                timestamp="2025-06-25T10:30:00Z"
                onClose={() => setfeedbackViewOpen(false)}
              />
            </AppContainer>
          </AppContainer>
        </AppContainer>
      </AppContainer>
    </AppContainer>
  );
};

export default DashboardPage;
