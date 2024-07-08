import React from "react";
import AddIcon from "../../../icons/categories/add";
import BriefcaseIcon from "../../../icons/categories/briefcase";
import BusIcon from "../../../icons/categories/bus";
import ClothesIcon from "../../../icons/categories/clothes";
import DonatesIcon from "../../../icons/categories/donates";
import EducationIcon from "../../../icons/categories/education";
import GamesIcon from "../../../icons/categories/games";
import HappyIcon from "../../../icons/categories/happy";
import LoveIcon from "../../../icons/categories/love";
import PawIcon from "../../../icons/categories/paw";
import PercentageIcon from "../../../icons/categories/percentage";
import PlaneIcon from "../../../icons/categories/plane";
import ShoppingIcon from "../../../icons/categories/shopping";
import SpoonIcon from "../../../icons/categories/spoon";
import StatsIcon from "../../../icons/categories/stats";
import WineIcon from "../../../icons/categories/wine";
import { cn } from "../../../../app/utils/cn";

type IconName =
  | "AddIcon"
  | "BriefcaseIcon"
  | "BusIcon"
  | "ClothesIcon"
  | "DonatesIcon"
  | "EducationIcon"
  | "GamesIcon"
  | "HappyIcon"
  | "LoveIcon"
  | "PawIcon"
  | "PercentageIcon"
  | "PlaneIcon"
  | "ShoppingIcon"
  | "SpoonIcon"
  | "StatsIcon"
  | "WineIcon";

type IconComponents = {
  [key in IconName]: React.FC<{ color: string; height: number; width: number }>;
};

const iconComponents: IconComponents = {
  AddIcon,
  BriefcaseIcon,
  BusIcon,
  ClothesIcon,
  DonatesIcon,
  EducationIcon,
  GamesIcon,
  HappyIcon,
  LoveIcon,
  PawIcon,
  PercentageIcon,
  PlaneIcon,
  ShoppingIcon,
  SpoonIcon,
  StatsIcon,
  WineIcon,
};

const CustomCategoryIcons = ({
  selectedIcon,
  handleChangeCategoryIcon,
  iconRef,
}: {
  selectedIcon: string;
  handleChangeCategoryIcon: (categoryIcon: string) => void;
  iconRef: React.RefObject<HTMLDivElement>;
}) => {
  const icons: IconName[] = [
    "AddIcon",
    "BriefcaseIcon",
    "BusIcon",
    "ClothesIcon",
    "DonatesIcon",
    "EducationIcon",
    "GamesIcon",
    "HappyIcon",
    "LoveIcon",
    "PawIcon",
    "PercentageIcon",
    "PlaneIcon",
    "ShoppingIcon",
    "SpoonIcon",
    "StatsIcon",
    "WineIcon",
  ];

  return (
    <div className="flex flex-wrap gap-5 overflow-x-auto max-w-[700px] custom-scrollbar pb-3">
      {icons.map((icon, index) => {
        const IconComponent = iconComponents[icon];
        return (
          <div
            key={index}
            className="flex-grow-0 flex-shrink-0 cursor-pointer"
            onClick={() => handleChangeCategoryIcon(icon)}
          >
            <figure
              className={cn(
                "rounded-full p-2 flex items-center justify-center max-w-12 max-h-12 h-12 w-12  ",
                icon === selectedIcon ? "bg-none border-2" : "bg-[#484849]"
              )}
              ref={icon === selectedIcon ? iconRef : null}
            >
              <IconComponent height={24} width={24} color="#F7F7F7" />
            </figure>
          </div>
        );
      })}
    </div>
  );
};

export default CustomCategoryIcons;
