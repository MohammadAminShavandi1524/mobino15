"use client";

import Skeleton from "../Skleton";

//* option 1   bg-gradient-to-br from-purple-500 via-indigo-500 to-sky-500
//* option 2   bg-gradient-to-br from-[#8e2de2] via-[#4a00e0] to-[#00c6ff]
//* option 3   bg-gradient-to-br from-[#ff6a00] via-[#ee0979] to-[#8e2de2]
//* option 4   bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]
//? option 5   bg-gradient-to-br  to-[#1a2a6c] via-[#5d54a4] from-[#9f7aea]

const UserAuthSkeleton = ({}) => {
  return (
    <div className="s:bg-gradient-to-br s:from-[#9f7aea] s:via-[#5d54a4] s:to-[#1a2a6c] max-s:flex max-s:justify-center relative min-h-screen w-full px-8 py-10">
      <section className="s:absolute s:top-1/2 s:left-1/2 s:-translate-x-1/2 s:-translate-y-1/2 s:rounded-2xl s:shadow-2xl s:p-8 max-s:w-full s:w-[min(92vw,420px)] flex flex-col items-center bg-white">
        <div className="s:mt-4 s:mb-8 my-10 flex w-full flex-col items-center gap-y-8">
          <div className="flex items-center gap-x-1">
            <Skeleton className="h-[44px] w-[44px]" />
            <Skeleton className="h-[44px] w-[92px]" />
          </div>
          <div className="flex items-center gap-x-8">
            <Skeleton className="h-[28px] w-[50px]" />
            <Skeleton className="h-[28px] w-[50px]" />
          </div>

          {/* form */}
          <div className="flex w-full flex-col gap-y-4">
            <Skeleton className="mr-2 h-[18px] w-[30px]" />
            <Skeleton className="h-[48px] w-full" />
            <Skeleton className="mr-2 h-[18px] w-[30px]" />
            <Skeleton className="h-[48px] w-full" />
          </div>
          <Skeleton className="mt-4 h-[48px] w-full" />
        </div>
      </section>
    </div>
  );
};

export default UserAuthSkeleton;
