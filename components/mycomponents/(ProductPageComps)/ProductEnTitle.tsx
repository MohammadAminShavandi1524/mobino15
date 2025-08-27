"use client";

interface ProductEnTitleProps {
  name: string;
}

const ProductEnTitle = ({ name }: ProductEnTitleProps) => {
  return (
    <div className="mb-4 text-[12px] text-[#385086] max-lg:w-full lg:text-[14px]">
      {name}
    </div>
  );
};
export default ProductEnTitle;
