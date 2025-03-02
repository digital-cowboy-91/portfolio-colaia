import ActivityCalendar from "react-activity-calendar";
import useDataResolver from "./data-provider/useDataResolver";

export default function Contributions() {
  const contributionsData = useDataResolver("contributions");

  const theme = {
    light: ["#ebedf010", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  };

  return (
    <ActivityCalendar data={contributionsData} blockRadius={20} theme={theme} />
  );
}
