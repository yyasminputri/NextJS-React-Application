import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/b1.png";


const benefitOne = {
  title: "Why Choose Powerpuff Recipe?",
  desc: "From home cooks to professional chefs, here’s why everyone loves using our app to make their favorite meals.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Easy-to-use interface for quick recipe browsing.",
      desc: "Then explain the first point breifly in one or two lines.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Save and share your favorite recipes with ease",
      desc: "Here you can add the next benefit point.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Browse recipes by ingredients, categories, and cuisine types",
      desc: "This will be your last bullet point in this section.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};




export {benefitOne};
