import { DashboardCard } from '@/components/dashboard/dashboard-card';

function Page() {
  return (
    <div className="grid grid-cols-12 grid-rows-14 gap-4 h-[120vh] mt-16 ml-67">
      <DashboardCard
        colSpan={4}
        rowSpan={4}
        gradientFrom="#ADCDFC"
        gradientTo="#CBACFE"
      >
        1
      </DashboardCard>
      <DashboardCard colSpan={4} colStart={5} rowSpan={2}>
        2
      </DashboardCard>
      <DashboardCard colSpan={4} colStart={5} rowStart={3} rowSpan={2}>
        3
      </DashboardCard>
      <DashboardCard colSpan={4} colStart={9} rowStart={1} rowSpan={9}>
        4
      </DashboardCard>
      <DashboardCard colSpan={8} rowStart={5} rowSpan={5}>
        5
      </DashboardCard>
      <DashboardCard colSpan={9} rowStart={10} rowSpan={5}>
        6
      </DashboardCard>
      <DashboardCard colSpan={3} colStart={10} rowStart={10} rowSpan={5}>
        7
      </DashboardCard>
    </div>
  );
}

export default Page;
