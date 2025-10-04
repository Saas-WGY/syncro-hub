import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Calendar as CalendarIcon, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  patient: string;
  professional: string;
  specialty: string;
  date: Date;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patient: "Maria Silva",
    professional: "Dr. João Santos",
    specialty: "Cardiologia",
    date: new Date(2025, 0, 15),
    time: "09:00",
    status: "scheduled",
  },
  {
    id: "2",
    patient: "Carlos Oliveira",
    professional: "Dra. Ana Costa",
    specialty: "Dermatologia",
    date: new Date(2025, 0, 15),
    time: "10:30",
    status: "scheduled",
  },
  {
    id: "3",
    patient: "Ana Paula",
    professional: "Dr. Pedro Lima",
    specialty: "Ortopedia",
    date: new Date(2025, 0, 16),
    time: "14:00",
    status: "scheduled",
  },
];

const professionals = [
  { name: "Dr. João Santos", specialty: "Cardiologia" },
  { name: "Dra. Ana Costa", specialty: "Dermatologia" },
  { name: "Dr. Pedro Lima", specialty: "Ortopedia" },
];

const patients = ["Maria Silva", "Carlos Oliveira", "Ana Paula", "José Santos"];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    professional: "",
    time: "",
  });

  const appointmentsOnSelectedDate = appointments.filter(
    (apt) =>
      selectedDate &&
      apt.date.toDateString() === selectedDate.toDateString()
  );

  const handleAddAppointment = () => {
    if (!newAppointment.patient || !newAppointment.professional || !newAppointment.time || !selectedDate) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Check for conflicts
    const hasConflict = appointments.some(
      (apt) =>
        apt.date.toDateString() === selectedDate.toDateString() &&
        apt.time === newAppointment.time &&
        apt.professional === newAppointment.professional
    );

    if (hasConflict) {
      toast.error("Já existe um agendamento neste horário para este profissional");
      return;
    }

    const professional = professionals.find(p => p.name === newAppointment.professional);
    const appointment: Appointment = {
      id: String(appointments.length + 1),
      patient: newAppointment.patient,
      professional: newAppointment.professional,
      specialty: professional?.specialty || "",
      date: selectedDate,
      time: newAppointment.time,
      status: "scheduled",
    };

    setAppointments([...appointments, appointment]);
    setIsAddDialogOpen(false);
    setNewAppointment({ patient: "", professional: "", time: "" });
    toast.success("Agendamento criado com sucesso!");
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    );
    toast.success("Agendamento cancelado");
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    const variants = {
      scheduled: { label: "Agendado", variant: "default" as const },
      completed: { label: "Concluído", variant: "success" as const },
      cancelled: { label: "Cancelado", variant: "secondary" as const },
    };
    return variants[status];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as consultas e procedimentos
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Agendamento</DialogTitle>
              <DialogDescription>
                Preencha os dados do agendamento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Data Selecionada</Label>
                <div className="text-sm font-medium">
                  {selectedDate?.toLocaleDateString("pt-BR")}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient">Paciente *</Label>
                <Select
                  value={newAppointment.patient}
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, patient: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient} value={patient}>
                        {patient}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="professional">Profissional *</Label>
                <Select
                  value={newAppointment.professional}
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, professional: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionals.map((prof) => (
                      <SelectItem key={prof.name} value={prof.name}>
                        {prof.name} - {prof.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário *</Label>
                <Select
                  value={newAppointment.time}
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, time: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddAppointment}>Agendar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Agendamentos - {selectedDate?.toLocaleDateString("pt-BR")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsOnSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum agendamento para esta data</p>
              </div>
            ) : (
              <div className="space-y-3">
                {appointmentsOnSelectedDate.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 border border-border rounded-lg space-y-2 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.patient}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.professional} • {appointment.specialty}
                        </div>
                      </div>
                      <Badge variant={getStatusBadge(appointment.status).variant}>
                        {getStatusBadge(appointment.status).label}
                      </Badge>
                    </div>
                    {appointment.status === "scheduled" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
