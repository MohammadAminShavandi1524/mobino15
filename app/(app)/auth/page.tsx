import Logo from "@/components/mycomponents/Logo";

const AuthPage = () => {
  return (
    <div className="flex w-full h-screen bg-white">
      {/* content part  */}
      <section className="w-1/4 h-full flex flex-col items-center px-12">
        {/* logo */}
        <Logo />
      </section>
      {/* empty part */}
      <section className=" flex-1 h-full bg-[#253a56]"></section>
    </div>
  );
};
export default AuthPage;
