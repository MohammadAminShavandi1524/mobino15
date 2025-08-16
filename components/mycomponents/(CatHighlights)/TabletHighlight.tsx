import CustomCatHighlight from "./CustomCatHighlight";

const TabletHighlight = () => {
  const TabletOptions = [
    {
      img: "/catHighlight/appletablet.png",
      label: "اپل",
      href: "/tablet/AppleTablet",
    },
    {
      img: "/catHighlight/samsungtablet.png",
      label: "سامسونگ",
      href: "/tablet/SamsungTablet",
    },
    {
      img: "/catHighlight/microsofttablet.webp",
      label: "مایکروسافت",
      href: "/tablet/MicrosoftTablet",
    },
    {
      img: "/catHighlight/xiaomitablet.png",
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
