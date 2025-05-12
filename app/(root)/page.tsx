function Page() {
  return (
    <div className="grid h-[120vh] grid-cols-12 grid-rows-14 gap-4 max-lg:grid-cols-1 max-lg:grid-rows-7">
      <div className="col-span-4 row-span-4 rounded-md bg-gradient-to-r from-[#ADCDFC] to-[#CBACFE] max-lg:col-span-full dark:bg-gradient-to-tr dark:from-[#92FFC0] dark:to-[#0064FF]">
        1
      </div>
      <div className="bg-card col-span-4 col-start-5 row-span-4 rounded-md max-lg:col-span-full max-lg:col-start-1">
        2
      </div>
      <div className="bg-card col-span-4 col-start-9 row-span-9 row-start-1 rounded-md max-lg:col-span-full max-lg:col-start-1">
        4
      </div>
      <div className="bg-card col-span-8 row-span-5 row-start-5 rounded-md max-lg:col-span-full">
        5
      </div>
      <div className="bg-card col-span-9 row-span-5 row-start-10 rounded-md max-lg:col-span-full">
        6
      </div>
      <div className="bg-card col-span-3 col-start-10 row-span-5 row-start-10 rounded-md max-lg:col-span-full max-lg:col-start-1">
        7
      </div>
    </div>
  );
}

export default Page;
