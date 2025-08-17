import React from "react";
import MultiSelect from "./components/MultiSelect";

const App: React.FC = () => {
  const options = [
    { label: "Education 🎓", value: "education" },
    { label: "Yeeeah, science! 🔬", value: "science" },
    { label: "Art 🎨", value: "art" },
    { label: "Sport ⚽", value: "sport" },
    { label: "Games 🎮", value: "games" },
    { label: "Health 🏋️‍♂️", value: "health" },
  ];

  return (
    <div style={{ padding: "50px" }}>
      <MultiSelect options={options} placeholder="Choose categories..." />
    </div>
  );
};

export default App;
