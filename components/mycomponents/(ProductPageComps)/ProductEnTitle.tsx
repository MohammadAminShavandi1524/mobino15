"use client";

interface ProductEnTitleProps {
  name: string;
}

const ProductEnTitle = ({ name }: ProductEnTitleProps) => {
  return <div className="mb-4 text-[14px] text-[#385086]">{name}</div>;
};
export default ProductEnTitle;
