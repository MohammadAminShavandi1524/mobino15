import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const MainCarousel = () => {
  const mainCarouselOptions = [
    {
      img: "/mainCarousel/iphone.webp",
      alt: "iphone",
      href: "/mobile/iPhone",
    },
    {
      img: "/mainCarousel/laptop.webp",
      alt: "laptop",
      href: "/laptop",
    },
    {
      img: "/mainCarousel/samsung.png",
      alt: "samsung",
      href: "/mobile/samsungPhone",
    },
    {
      img: "/mainCarousel/smartwatch.webp",
      alt: "smartwatch",
      href: "/SmartWatch",
    },
    {
      img: "/mainCarousel/tablet.webp",
      alt: "tablet",
      href: "/tablet",
    },
    {
      img: "/mainCarousel/samANDxia.webp",
      alt: "samANDxia.webp",
      href: "/mobile?brand=samsung,xiaomi",
    },
  ];

  return (
    <Carousel autoplay interval={5000} className="w-screen group">
      <CarouselContent className="">
        {mainCarouselOptions.map((option, index) => {
          return (
            <CarouselItem key={index} className="w-full">
              <Link
                className="relative w-full h-[450px]  block"
                href={option.href}
              >
                <Image
                  className="object-cover"
                  fill
                  src={option.img}
                  alt={option.alt}
                />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="opacity-0 invisible group-hover:opacity-100 group-hover:visible flex justify-center items-center transition-all bottom-[25px] right-[40px] size-10 [&>*]:size-7 max-md:hidden" />
      <CarouselNext className="opacity-0 invisible group-hover:opacity-100 group-hover:visible flex justify-center items-center transition-all bottom-[25px] right-[90px] size-10 [&>*]:size-7 max-md:hidden" />
    </Carousel>
  );
};
export default MainCarousel;
