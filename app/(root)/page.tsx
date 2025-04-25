function Page() {
  return (
    <div className="grid h-[120vh] grid-cols-12 grid-rows-14 gap-4">
      <div className="col-span-4 row-span-4 rounded-md bg-gradient-to-r from-[#ADCDFC] to-[#CBACFE] dark:bg-gradient-to-tr dark:from-[#92FFC0] dark:to-[#0064FF]">
        1
      </div>
      <div className="bg-card col-span-4 col-start-5 row-span-2 rounded-md">
        2
      </div>
      <div className="bg-card col-span-4 col-start-5 row-span-2 row-start-3 rounded-md">
        3
      </div>
      <div className="bg-card col-span-4 col-start-9 row-span-9 row-start-1 rounded-md">
        4
      </div>
      <div className="bg-card col-span-8 row-span-5 row-start-5 rounded-md">
        5
      </div>
      <div className="bg-card col-span-9 row-span-5 row-start-10 rounded-md">
        6
      </div>
      <div className="bg-card col-span-3 col-start-10 row-span-5 row-start-10 rounded-md">
        7
      </div>
    </div>
  );
}

export default Page;
