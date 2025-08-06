"use client";

interface ProductFaTitleProps {
  label: string;
}

const ProductFaTitle = ({ label }: ProductFaTitleProps) => {
  return (
    <div className="text-black text-[20px]/[40px] font-medium mb-4">
      {label}
    </div>
  );
};
export default ProductFaTitle;
