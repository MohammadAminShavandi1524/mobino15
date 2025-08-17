import CustomCatHighlight from "./CustomCatHighlight";

interface HeadphonesHighlightProps {}

const HeadphonesHighlight = ({}: HeadphonesHighlightProps) => {
  const HeadphoneOptions = [
    {
      img: "/catHighlight/beatsheadphone.png",
      label: "بیتس",
      href: "/Headphones/BeatsHeadphones",
    },
    {
      img: "/catHighlight/razerheadphone.png",
      label: "ریزر",
      href: "/Headphones/RazerHeadphones",
    },
    {
      img: "/catHighlight/ankerheadphone.png",
      label: "انکر",
      href: "/Headphones/AnkerHeadphones",
    },
    {
      img: "/catHighlight/tscoheadphone.png",
      label: "تسکو",
      href: "/Headphones/TscoHeadphones",
    },
  ];
  return (
    <CustomCatHighlight
      bgColor="#ffd8d1"
      label="هدفون"
      options={HeadphoneOptions}
    />
  );
};

export default HeadphonesHighlight;
