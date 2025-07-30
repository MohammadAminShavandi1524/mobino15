import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CustomCarousel = () => {
  return (
    <Carousel className="border border-yellow-600">
      <CarouselContent className="border border-blue-600">
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          1
        </CarouselItem>
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          2
        </CarouselItem>
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          3
        </CarouselItem>
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          4
        </CarouselItem>
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          5
        </CarouselItem>
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          6
        </CarouselItem>
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          7
        </CarouselItem>
        <CarouselItem className="w-25 h-25 max-w-25 max-h-25 border border-red-600">
          8
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default CustomCarousel;
