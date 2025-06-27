interface AppChipSentimentProps {
  type: "positif" | "negatif" | "netral";
  className?: string;
}

const AppChipSentiment: React.FC<AppChipSentimentProps> = (props) => {
  return (
    <p
      className={`${
        props.className != null && props.className
      } text-[10px] text-white py-[3px] font-bold px-[8px] rounded-xl ${
        props.type === "positif"
          ? "bg-green-300"
          : props.type === "negatif"
          ? "bg-red-300"
          : "bg-blue-300"
      } `}
    >
      {props.type === "positif" && "Positif"}
      {props.type === "negatif" && "Negatif"}
      {props.type === "netral" && "Netral"}
    </p>
  );
};

export default AppChipSentiment;
