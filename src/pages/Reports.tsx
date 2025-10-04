import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Filter } from "lucide-react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

const productivityData = [
  { professional: "Dr. João", consultas: 45 },
  { professional: "Dra. Ana", consultas: 38 },
  { professional: "Dr. Pedro", consultas: 42 },
  { professional: "Dra. Maria", consultas: 35 },
];

const revenueData = [
  { month: "Jan", receita: 35000 },
  { month: "Fev", receita: 42000 },
  { month: "Mar", receita: 38000 },
  { month: "Abr", receita: 45000 },
  { month: "Mai", receita: 52000 },
  { month: "Jun", receita: 48000 },
];

const cancellationData = [
  { week: "Sem 1", cancelamentos: 3 },
  { week: "Sem 2", cancelamentos: 5 },
  { week: "Sem 3", cancelamentos: 2 },
  { week: "Sem 4", cancelamentos: 4 },
];

export default function Reports() {
  const [period, setPeriod] = useState("month");
  const [professional, setProfessional] = useState("all");
  const [reportType, setReportType] = useState("productivity");

  const handleExport = (format: "csv" | "pdf") => {
    toast.success(`Relatório exportado em ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground mt-1">
          Análises e estatísticas do sistema
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Profissional</Label>
              <Select value={professional} onValueChange={setProfessional}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="dr-joao">Dr. João Santos</SelectItem>
                  <SelectItem value="dra-ana">Dra. Ana Costa</SelectItem>
                  <SelectItem value="dr-pedro">Dr. Pedro Lima</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Relatório</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productivity">Produtividade</SelectItem>
                  <SelectItem value="revenue">Receitas</SelectItem>
                  <SelectItem value="cancellations">Cancelamentos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Exportar</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleExport("csv")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleExport("pdf")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts based on report type */}
      <div className="grid gap-6">
        {reportType === "productivity" && (
          <Card>
            <CardHeader>
              <CardTitle>Produtividade por Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productivityData}>
                  <XAxis dataKey="professional" stroke="#6B7280" />
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
        )}

        {reportType === "revenue" && (
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="receita"
                    stroke="#1E3A8A"
                    strokeWidth={3}
                    dot={{ fill: "#1E3A8A", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {reportType === "cancellations" && (
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Cancelamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={cancellationData}>
                  <XAxis dataKey="week" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="cancelamentos" fill="#EF4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Total de Consultas</p>
              <p className="text-3xl font-bold text-primary">324</p>
            </div>
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
              <p className="text-3xl font-bold text-success">R$ 260.000</p>
            </div>
            <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-sm text-muted-foreground mb-1">Taxa de Cancelamento</p>
              <p className="text-3xl font-bold text-destructive">4.3%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
