import { useState, useEffect } from "react";

const LiveTimer = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const
      };

      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const timerInterval = setInterval(updateDateTime, 1000);

    return () => clearInterval(timerInterval); 
  }, []);

  return (
    <div className="text-center">
      <div className="text-5xl font-semibold text-blue-200 mb-2">{time}</div>
      <div className="text-sm text-blue-300">{date}</div>
    </div>
  );
};

export default LiveTimer;
