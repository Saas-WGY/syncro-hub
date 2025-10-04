import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, UserCog, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell } from "recharts";

const stats = [
  {
    title: "Pacientes Ativos",
    value: "324",
    icon: Users,
    change: "+12%",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Consultas Agendadas",
    value: "48",
    icon: Calendar,
    change: "+8%",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Profissionais Disponíveis",
    value: "12",
    icon: UserCog,
    change: "+2",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Receita Mensal",
    value: "R$ 42.5k",
    icon: TrendingUp,
    change: "+18%",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const monthlyAppointments = [
  { month: "Jan", consultas: 120 },
  { month: "Fev", consultas: 145 },
  { month: "Mar", consultas: 180 },
  { month: "Abr", consultas: 165 },
  { month: "Mai", consultas: 195 },
  { month: "Jun", consultas: 210 },
];

const appointmentTypes = [
  { name: "Consulta", value: 45, color: "#1E3A8A" },
  { name: "Retorno", value: 30, color: "#3B82F6" },
  { name: "Exames", value: 15, color: "#22C55E" },
  { name: "Procedimentos", value: 10, color: "#6B7280" },
];

const upcomingAppointments = [
  { id: 1, patient: "Maria Silva", professional: "Dr. João Santos", time: "09:00", specialty: "Cardiologia" },
  { id: 2, patient: "Carlos Oliveira", professional: "Dra. Ana Costa", time: "10:30", specialty: "Dermatologia" },
  { id: 3, patient: "Ana Paula", professional: "Dr. Pedro Lima", time: "14:00", specialty: "Ortopedia" },
  { id: 4, patient: "José Santos", professional: "Dra. Maria Souza", time: "15:30", specialty: "Pediatria" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do sistema de gestão médica
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success mt-1">
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atendimentos Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyAppointments}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="consultas" fill="#1E3A8A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.professional} • {appointment.specialty}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{appointment.time}</p>
                  <p className="text-sm text-muted-foreground">Hoje</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
