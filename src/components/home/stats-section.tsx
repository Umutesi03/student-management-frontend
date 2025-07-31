export function StatsSection() {
  const stats = [
    { label: "Active Students", value: "10,000+" },
    { label: "Educational Institutions", value: "500+" },
    { label: "Countries Served", value: "25+" },
    { label: "Success Rate", value: "99.9%" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
