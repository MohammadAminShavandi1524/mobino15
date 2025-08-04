import CatHighlights from "./CatHighlights";

const LaptopHighlights = () => {
  const LaptopOptions = [
    {
      img: "https://www.technolife.com/image/static_laptop_asus_new.png",
      label: "ایسوس",
      href: "/laptop/asusLaptop",
    },
    {
      img: "https://www.technolife.com/image/static_laptop_hp_new.png",
      label: "اچ پی",
      href: "/laptop/HPLaptop",
    },
    {
      img: "https://www.technolife.com/image/static_laptop_mac_new.png",
      label: "مک بوک",
      href: "/laptop/appleLaptop",
    },
    {
      img: "https://www.technolife.com/image/static_laptop_aser_new.png",
      label: "ایسر",
      href: "/laptop/AcerLaptop",
    },
  ];

  return <CatHighlights label="لپ تاپ" options={LaptopOptions} />;
};
export default LaptopHighlights;
