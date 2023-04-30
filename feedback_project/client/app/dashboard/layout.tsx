export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {  
    return (
      <main className="grow">
        <p>Layout</p>
        {children}
  
      </main>
    )
  }
  