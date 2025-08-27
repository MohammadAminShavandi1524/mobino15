"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, MessageCircleMore, Share2 } from "lucide-react";
import { Link } from "react-scroll";
import { toast } from "sonner";

interface LikeAndShareBtnsProps {}

const LikeAndShareBtns = ({}: LikeAndShareBtnsProps) => {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("لینک در کلیپ‌بورد کپی شد", {
        position: "top-right",
      });
    } catch (err) {
      toast.error("خطا در کپی لینک", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex items-center gap-x-10">
      <Tooltip>
        <TooltipTrigger>
          <Link
            to="reviews"
            offset={-30}
            spy={true}
            smooth={true}
            duration={500}
            className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-white shadow-lg 2xl:size-8.5"
          >
            <div className="max-xl:hidden">
              <MessageCircleMore strokeWidth={1.5} color="#D48F1E" size={22} />
            </div>
            <div className="xl:hidden">
              <MessageCircleMore strokeWidth={1.5} color="#D48F1E" size={20} />
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={12}
          className="rounded-full bg-[#ffffff] px-4 py-2 text-[14px] text-black shadow-md"
        >
          <div className="rounded-lg">نظرات کاربران</div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() => handleShare()}
            className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-white shadow-lg 2xl:size-8.5"
          >
            <div className="max-xl:hidden">
              <Share2 strokeWidth={1.5} color="#0079b1" size={22} />
            </div>
            <div className="xl:hidden">
              {" "}
              <Share2 strokeWidth={1.5} color="#0079b1" size={20} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={12}
          className="rounded-full bg-[#ffffff] px-4 py-2 text-[14px] text-black shadow-md"
        >
          <div className="rounded-lg">اشتراک گذاری</div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <div className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-white shadow-lg 2xl:size-8.5">
            <div className="max-xl:hidden">
              <Heart color="#da1e28" size={22} />
            </div>
            <div className="xl:hidden">
              <Heart color="#da1e28" size={20} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={12}
          className="rounded-full bg-[#ffffff] px-4 py-2 text-[14px] text-black shadow-md"
        >
          <div className="rounded-lg">مورد علاقه</div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default LikeAndShareBtns;
