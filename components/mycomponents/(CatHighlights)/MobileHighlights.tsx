
import CustomCatHighlight from "./CustomCatHighlight";

const MobileHighlights = () => {
  const MobileOptions = [
    {
      img: "/catHighlight/samsungphone.png",
      label: "سامسونگ",
      href: "/mobile/samsungPhone",
    },
    {
      img: "/catHighlight/iphone.png",
      label: "آیفون",
      href: "/mobile/iPhone",
    },
    {
      img: "/catHighlight/xiaomiphone.png",
      label: "شیائومی",
      href: "/mobile/XiaomiPhone",
    },
    {
      img: "/catHighlight/honorphone.png",
      label: "آنر",
      href: "/mobile/HonerPhone",
    },
  ];

  return (
    <CustomCatHighlight
      bgColor="#d6eaf8"
      label="موبایل"
      options={MobileOptions}
      
    />
  );
};
export default MobileHighlights;
