import PriceTags from "./PriceTags";

const MobilePriceTags = () => {
  const Options = [
    {
      priceTag: 15,
    },
    {
      priceTag: 30,
    },
    {
      priceTag: 50,
    },
    {
      priceTag: 75,
    },
    {
      priceTag: 100,
    },
    {
      priceTag: 150,
    },
  ];

  return (
    <PriceTags
      label="گوشی"
      evenColor="#6bb4e5"
      oddColor="#cde6f6"
      options={Options}
    />
  );
};
export default MobilePriceTags;
