import { ReactNode } from "react";

interface DashboardTemplateProps {
  header: ReactNode
  dataTable: ReactNode
}

function DashboardTemplate ({ header, dataTable }: DashboardTemplateProps) {
  return (
    <main className="px-6 md:px-12 pt-24 pb-8">
      {header}
      <div className="mt-8">
        {dataTable}
      </div>
    </main>
  )
}

export default DashboardTemplate;