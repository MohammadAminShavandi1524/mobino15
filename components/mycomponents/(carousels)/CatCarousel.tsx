import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const categoriesCarouselOptions = [
  {
    img: "/categoriesCarousel/iphoneCat.webp",
    label: "گوشی آیفون",
    href: "/mobile/iPhone",
  },
  {
    img: "/categoriesCarousel/macbookCat.webp",
    label: "مک بوک",
    href: "/laptop/appleLaptop",
  },
  {
    img: "/categoriesCarousel/tabletCat.jpg",
    label: "تبلت",
    href: "/tablet",
  },
  {
    img: "/categoriesCarousel/headphonesCat.jpg",
    label: "هدفون",
    href: "/Headphones",
  },
  {
    img: "/categoriesCarousel/samsungPhoneCat.webp",
    label: "گوشی سامسونگ",
    href: "/mobile/samsungPhone",
  },
  {
    img: "/categoriesCarousel/monitorCat.webp",
    label: "مانیتور",
    href: "/Monitor",
  },
  {
    img: "/categoriesCarousel/smartWatchCat.webp",
    label: "ساعت هوشمند",
    href: "/SmartWatch",
  },
  {
    img: "/categoriesCarousel/laptopCat.png",
    label: "لپ تاپ",
    href: "/laptop",
  },
  {
    img: "/categoriesCarousel/xiaomiPhoneCat.png",
    label: "گوشی شیائومی",
    href: "/mobile/XiaomiPhone",
  },
];

const CatCarousel = () => {
  return (
    <Carousel autoplay interval={7000} className="">
      <CarouselContent className="px-4 ml-0">
        {categoriesCarouselOptions.map((option, index) => {
          return (
            <CarouselItem
              key={index}
              className="flex justify-center basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6  2xl:basis-1/7 3xl:basis-1/8 px-2 select-none"
            >
              <Link
                className="flex flex-col items-center gap-y-5 pt-1 group"
                href={option.href}
              >
                <div className="flex justify-center items-center size-32 border border-[#14a0de]   group-hover:border-3  rounded-full">
                  <div className="size-28 overflow-hidden rounded-full">
                    <div className="flex justify-center items-center overflow-hidden size-[112px] border-1 border-[#c7cbdb] rounded-full">
                      <Image
                        className={cn(
                          "transition-all group-hover:scale-115 object-cover"
                        )}
                        src={option.img}
                        alt={option.label}
                        width={78}
                        height={78}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-[#1b3570]">{option.label}</div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="top-[63px] -right-10 max-md:hidden" />
      <CarouselNext className="top-[63px] -left-12 max-md:hidden" />
    </Carousel>
  );
};
export default CatCarousel;
