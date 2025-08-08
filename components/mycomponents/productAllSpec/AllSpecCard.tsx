"use client";

interface AllSpecCardProps {
  title: string;
  value: string | number;
}

const AllSpecCard = ({ title, value }: AllSpecCardProps) => {
  return (
    <div className="flex flex-col gap-y-2 px-10.5 py-4 bg-[#f3f8fd] rounded-lg">
      <span>{title} :</span>
      <span className="text-[#000511] text-[15px] font-light pr-0.5">{value}</span>
    </div>
  );
};

export default AllSpecCard;
