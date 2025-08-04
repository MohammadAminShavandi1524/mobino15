import CatHighlights from "./CatHighlights";

const MobileHighlights = () => {
  const MobileOptions = [
    {
      img: "https://www.technolife.com/image/static_phone_samsung_new.png",
      label: "سامسونگ",
      href: "/mobile/samsungPhone",
    },
    {
      img: "https://www.technolife.com/image/static_phone_iphone_new.png",
      label: "آیفون",
      href: "/mobile/iPhone",
    },
    {
      img: "https://www.technolife.com/image/static_phone_xiaomi_new.png",
      label: "شیائومی",
      href: "/mobile/XiaomiPhone",
    },
    {
      img: "https://www.technolife.com/image/static_phone_honor_new.png",
      label: "آنر",
      href: "/mobile/HonerPhone",
    },
  ];

  return <CatHighlights label="موبایل" options={MobileOptions} />;
};
export default MobileHighlights;
