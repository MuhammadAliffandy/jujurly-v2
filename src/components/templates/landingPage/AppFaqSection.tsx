import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppAccordion from "../../molecules/AppAccordion/AppAccordion";
const AppFaqSection: React.FC = () => {
  return (
    <section
      className="w-full h-full bg-white flex flex-col gap-[20px] items-center justify-center 
   
      px-[20px] sm:px-[20px] md:px-[20px] lg:px-[100px] xl:px-[100px] 
      py-[100px] sm:py-[100px] md:py-[100px] lg:py-[0px] xl:py-[0px]"
      id="faq"
    >
      <h3 data-aos="zoom-in" className="text-[28px] font-unbounded text-center">
        Ingin <strong>Tahu</strong> lebih <strong>dekat</strong> ? <br></br>{" "}
        Berikut <strong>Pertanyaan yang Sering Diajukan</strong>
      </h3>
      <AppContainer className=" w-full sm:w-full  md:w-full lg:w-[80%] xl:w-[80%] flex flex-col items-center gap-[15px]">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <AppAccordion
              key={index}
              dataAos="fade-up"
              dataAosDelay={index * 200}
              title={`Pertanyaan ${index + 1}`}
              subtitle={`Ini adalah jawaban untuk pertanyaan ${
                index + 1
              }. Kami sangat menghargai setiap pertanyaan yang masuk dan berusaha memberikan jawaban yang jelas dan informatif. Jika ada pertanyaan lain, jangan ragu untuk menghubungi kami.`}
            />
          );
        })}
      </AppContainer>
    </section>
  );
};
export default AppFaqSection;
