import { useState } from "react";
import Intro from "./Intro";
import Tutorial1 from "./Tutorial1";
import Tutorial2 from "./Tutorial2";
import Tutorial3 from "./Tutorial3";

export default function Home() {
  const [slide, setSlide] = useState(0);

  console.log("slide: ", slide);

  return (
    <div className="bg-image h-full text">
      <Intro slide={slide} setSlide={setSlide} />
      <Tutorial1 slide={slide} setSlide={setSlide} />
      <Tutorial2 slide={slide} setSlide={setSlide} />
      <Tutorial3 slide={slide} setSlide={setSlide} />
    </div>
  );
}
