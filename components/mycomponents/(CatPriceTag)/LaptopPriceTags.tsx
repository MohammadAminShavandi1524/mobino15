import PriceTags from "./PriceTags";

const LaptopPriceTags = () => {
  const Options = [
    {
      priceTag: 25,
    },
    {
      priceTag: 40,
    },
    {
      priceTag: 60,
    },
    {
      priceTag: 90,
    },
    {
      priceTag: 120,
    },
    {
      priceTag: 150,
    },
  ];

  return (
    <PriceTags
      label="لپ تاپ"
      evenColor="#e7d7ee"
      oddColor="#ccaada"
      options={Options}
      type="laptop"
    />
  );
};
export default LaptopPriceTags;
