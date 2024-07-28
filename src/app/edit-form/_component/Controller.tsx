import gradientBg from "@/app/_data/gradientBg";
import style from "@/app/_data/style";
import themes from "@/app/_data/themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";

const Controller = ({
  setSelectedTheme,
  setSelectBackground,
  selectedBackground,setSelectStyle
}: any) => {
  const [showMore, setShowMore] = useState(6);
  return (
    <div>
      {/* Theme selection Controller */}
      <h2>Themes</h2>
      <Select onValueChange={(value) => setSelectedTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme, index) => (
            <SelectItem value={theme.theme} key={index}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className="h-5 w-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                  <div
                    className="h-5 w-5 rounded-r-md"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Background selection controller */}
      <h2 className="mt-8 my-1">Background</h2>
      <div className="grid grid-cols-3 gap-5">
        {gradientBg.map(
          (bg, index) =>
            index < showMore && (
              <div
                key={index}
                onClick={() => setSelectBackground(bg.gradient)}
                className={`w-full h-[70px] rounded-lg cursor-pointer hover:border-black hover:border-2 flex items-center justify-center ${
                  selectedBackground === bg.gradient &&
                  "border-blue-300 border-4"
                }`}
                style={{ background: bg.gradient }}
              >
                {index === 0 && "None"}
              </div>
            )
        )}
      </div>


      <Button
        onClick={() => setShowMore(showMore > 6 ? 6 : 20)}
        variant={"ghost"}
        size={"sm"}
        className="mt-2 w-full"
      >
        {showMore > 6 ? "Show less" : "Show More"}
      </Button>

      {/* Style selection controller */}
<h2 className="mt-8 my-1">Style</h2>
<div className="grid grid-cols-3 gap-3">
{
    style.map((item,index)=>(
        <div >
            <div className="cursor-pointer hover:border-2 rounded-lg" onClick={() => setSelectStyle(item)}>
                <Image src={item.img} width={600} height={600} alt="item image"/>
            </div>
            <h2 className="text-center">{item.name}</h2>
        </div>
    ))
}
</div>
    </div>
  );
};

export default Controller;
