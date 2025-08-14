import CustomCatHighlight from "./CustomCatHighlight";

const TabletHighlight = () => {
  const TabletOptions = [
    {
      img: "/CatHighlight/appletablet.png",
      label: "اپل",
      href: "/tablet/AppleTablet",
    },
    {
      img: "/CatHighlight/samsungtablet.png",
      label: "سامسونگ",
      href: "/tablet/SamsungTablet",
    },
    {
      img: "/CatHighlight/microsofttablet.webp",
      label: "مایکروسافت",
      href: "/tablet/MicrosoftTablet",
    },
    {
      img: "/CatHighlight/xiaomitablet.png",
      label: "شیائومی",
      href: "/tablet/XiaomiTablet",
    },
  ];
  return (
    <CustomCatHighlight
      bgColor="#d5f5e3"
      label="تبلت"
      options={TabletOptions}
    />
  );
};

export default TabletHighlight;
