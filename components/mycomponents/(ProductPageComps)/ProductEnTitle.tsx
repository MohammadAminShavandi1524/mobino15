"use client";

interface ProductEnTitleProps {
  name: string;
}

const ProductEnTitle = ({ name }: ProductEnTitleProps) => {
  return <div className="text-[#385086] text-[14px] mb-4">{name}</div>;
};
export default ProductEnTitle;
