"use client";

import Skeleton from "../Skleton";

const SellerAuthSkeleton = ({}) => {
  const bigCirclesStyle = {
    background:
      "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%)",
    boxShadow: "inset 0 0 80px rgba(0,0,0,0.15)",
  };

  const mediumCirclesStyle = {
    background:
      "linear-gradient(135deg, #d1d5db 0%, #9ca3af 50%, #6b7280 100%)",
    boxShadow: "inset 0 0 80px rgba(0,0,0,0.2)",
  };

  const smallCirclesStyle = {
    background:
      "linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%)",
    boxShadow: "inset 0 0 80px rgba(0,0,0,0.25)",
  };

  return (
    <div className="w-full">
      <div className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* دایره‌ها */}
        {/* top right */}
        <div className="absolute -top-[30vw] -right-[30vw] transition-all duration-200 max-sm:hidden">
          <div
            className="h-[60vw] w-[60vw] rounded-full opacity-45"
            style={bigCirclesStyle}
          />
          <div
            className="absolute top-[7vw] right-[7vw] h-[46vw] w-[46vw] rounded-full opacity-35"
            style={mediumCirclesStyle}
          />
          <div
            className="absolute top-[14vw] right-[14vw] h-[32vw] w-[32vw] rounded-full opacity-25"
            style={smallCirclesStyle}
          />
        </div>

        {/* bottom left */}
        <div className="absolute -bottom-[20vw] -left-[20vw] transition-all duration-200 max-sm:hidden">
          <div
            className="h-[40vw] w-[40vw] rounded-full opacity-40"
            style={bigCirclesStyle}
          />
          <div
            className="absolute bottom-[4vw] left-[4vw] h-[32vw] w-[32vw] rounded-full opacity-30"
            style={mediumCirclesStyle}
          />
          <div
            className="absolute bottom-[8vw] left-[8vw] h-[24vw] w-[24vw] rounded-full opacity-20"
            style={smallCirclesStyle}
          />
        </div>

        <div className="relative z-10 flex size-full flex-col overflow-hidden bg-white sm:size-[86%] sm:rounded-[30px] sm:shadow-2xl">
          {/* inner left */}

          <div className="absolute top-1/2 -left-[40vw] -translate-y-1/2 transition-all duration-200 max-lg:hidden xl:top-1/2 xl:-left-[27.5vw] 2xl:-left-[25vw]">
            <div
              className="absolute top-1/2 left-[7vw] size-[70vw] -translate-y-1/2 rounded-full opacity-45 xl:left-[5vw] xl:size-[60vw] 2xl:left-[2.5vw] 2xl:size-[60vw]"
              style={bigCirclesStyle}
            />
            <div
              className="absolute top-1/2 left-[0vw] size-[70vw] -translate-y-1/2 rounded-full opacity-35 xl:left-[0.5vw] xl:size-[60vw] 2xl:left-[2.75vw] 2xl:size-[55vw]"
              style={mediumCirclesStyle}
            />

            <div
              className="absolute top-1/2 -left-[10vw] size-[70vw] -translate-y-1/2 rounded-full opacity-35 xl:-left-[3vw] xl:size-[55vw] 2xl:left-[6vw] 2xl:size-[43vw]"
              style={smallCirclesStyle}
            />
          </div>

          {/* max lg  */}

          <>
            {/* top left  */}

            <div className="absolute -top-[10vw] -left-[10vw] transition-all duration-200 max-sm:hidden lg:hidden">
              <div
                className="h-[20vw] w-[20vw] rounded-full opacity-30"
                style={bigCirclesStyle}
              />
              <div
                className="absolute top-[2vw] left-[2vw] h-[16vw] w-[16vw] rounded-full opacity-20"
                style={mediumCirclesStyle}
              />
              <div
                className="absolute top-[4vw] left-[4vw] h-[12vw] w-[12vw] rounded-full opacity-10"
                style={smallCirclesStyle}
              />
            </div>

            {/* bottom right  */}
            <div className="absolute -right-[15vw] -bottom-[15vw] transition-all duration-200 max-sm:hidden lg:hidden">
              <div
                className="h-[30vw] w-[30vw] rounded-full opacity-35"
                style={bigCirclesStyle}
              />
              <div
                className="absolute right-[3.5vw] bottom-[3.5vw] h-[23vw] w-[23vw] rounded-full opacity-25"
                style={mediumCirclesStyle}
              />
              <div
                className="absolute right-[7vw] bottom-[7vw] h-[16vw] w-[16vw] rounded-full opacity-15"
                style={smallCirclesStyle}
              />
            </div>
          </>

          {/* content */}
          {/* header */}
          <div className="flex w-full items-center gap-x-8 pt-8 pb-5 transition-all duration-200 max-xl:relative max-lg:justify-center lg:pr-10">
            <div className="max-xl:hidden">
              <Skeleton className="size-[60px] xl:ml-4" />
            </div>

            <div className="max-s:hidden max-lg:absolute max-lg:top-1/2 max-lg:right-10 max-lg:-translate-y-1/2 max-lg:pt-3 xl:hidden">
              <Skeleton className="size-[44px] xl:ml-4" />
            </div>

            <Skeleton className="h-7 w-[91.5px] xl:h-8 xl:w-[102.5px]" />
            <Skeleton className="h-7 w-[76px] xl:h-8 xl:w-[85.5px]" />
            <Skeleton className="h-7 w-[97px] xl:h-8 xl:w-[109px]" />
          </div>

          <div className="flex flex-col">
            {/* sign up - login */}

            <div className="min-h-[calc(86vh-112px)] w-full max-lg:flex max-lg:flex-col max-lg:items-center xl:grid xl:grid-cols-10">
              {/* right side */}
              <div className="flex w-90 flex-col items-center lg:mr-[calc(5vw+16px)] xl:col-span-6 xl:mr-[calc(8vw+16px)]">
                <div className="flex">
                  <Skeleton className="s:hidden mt-7.5 ml-1.5 size-10" />
                  <Skeleton className="s:hidden mt-7.5 h-10 w-21" />
                </div>

                {/* ورود یا ثبت نام */}

                <div className="s:mt-15 mt-10 mb-10 flex items-center gap-x-5 transition-all 2xl:mt-25">
                  <Skeleton className="h-8 w-[36px] xl:w-[40px]" />
                  <Skeleton className="h-8 xl:w-0.5" />
                  <Skeleton className="h-8 w-[63px] xl:w-[70px]" />
                </div>

                {/* form */}
                <div className="max-s:items-center flex w-full flex-col gap-y-4">
                  <Skeleton className="s:mr-2 mr-5 h-[18px] w-[30px] self-baseline" />
                  <Skeleton className="xss:w-[340px] h-[48px] w-80 sm:w-90 lg:w-[340px]" />
                  <Skeleton className="s:mr-2 mr-5 h-[18px] w-[30px] self-baseline" />
                  <Skeleton className="xss:w-[340px] h-[48px] w-80 sm:w-90 lg:w-[340px]" />
                  <Skeleton className="xss:w-[340px] mt-5 h-[48px] w-80 sm:w-90 lg:w-[340px]" />
                </div>
              </div>
              {/* left side  */}
              <div className="absolute top-1/2 left-[200px] z-15 -translate-1/2 max-lg:hidden xl:left-[280px] xl:col-span-4 2xl:left-[320px]">
                {/* <div className="lg:h-53 lg:w-80 xl:h-66 xl:w-100 2xl:h-80 2xl:w-120"></div> */}

                <div className="relative lg:h-53 lg:w-80 xl:h-66 xl:w-100 2xl:h-80 2xl:w-120">
                  {/* حباب بزرگ */}
                  <div className="animate-bubble absolute h-full w-full rounded-tl-[70%] rounded-tr-[40%] rounded-br-[60%] rounded-bl-[50%] bg-gray-300 opacity-50"></div>

                  {/* حباب متوسط */}
                  <div className="animate-bubble animation-delay-2000 absolute rounded-tl-[80%] rounded-tr-[20%] rounded-br-[50%] rounded-bl-[70%] bg-gray-200 opacity-60 lg:h-40 lg:w-60 xl:h-50 xl:w-80 2xl:h-60 2xl:w-100"></div>

                  {/* حباب کوچک */}
                  <div className="animate-bubble animation-delay-4000 absolute rounded-tl-[90%] rounded-tr-[60%] rounded-br-[80%] rounded-bl-[40%] bg-gray-400 opacity-40 lg:h-32 lg:w-48 xl:h-40 xl:w-60 2xl:h-48 2xl:w-80"></div>
                </div>
              </div>
            </div>
          </div>
          {/* end of content */}
        </div>
      </div>
    </div>
  );
};

export default SellerAuthSkeleton;
