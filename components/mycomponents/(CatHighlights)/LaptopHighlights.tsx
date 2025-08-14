
import CustomCatHighlight from "./CustomCatHighlight";

const LaptopHighlights = () => {
  const LaptopOptions = [
    {
      img: "/catHighlight/asuslaptop.png",
      label: "ایسوس",
      href: "/laptop/asusLaptop",
    },
    {
      img: "/catHighlight/hplaptop.png",
      label: "اچ پی",
      href: "/laptop/HPLaptop",
    },
    {
      img: "/catHighlight/macbook.png",
      label: "مک بوک",
      href: "/laptop/appleLaptop",
    },
    {
      img: "/catHighlight/lenovolaptop.png",
      label: "لنوو",
      href: "/laptop/lenovoLaptop",
    },
  ];

  return (
    <CustomCatHighlight
      bgColor="#e7d8ee"
      label="لپ تاپ"
      options={LaptopOptions}
    />
  );
};
export default LaptopHighlights;
