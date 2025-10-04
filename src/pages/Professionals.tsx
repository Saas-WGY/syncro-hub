import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  crm: string;
  status: "active" | "inactive";
}

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Dr. João Santos",
    specialty: "Cardiologia",
    email: "joao.santos@clinic.com",
    phone: "(11) 99999-8888",
    crm: "CRM 12345-SP",
    status: "active",
  },
  {
    id: "2",
    name: "Dra. Ana Costa",
    specialty: "Dermatologia",
    email: "ana.costa@clinic.com",
    phone: "(11) 98888-7777",
    crm: "CRM 67890-SP",
    status: "active",
  },
  {
    id: "3",
    name: "Dr. Pedro Lima",
    specialty: "Ortopedia",
    email: "pedro.lima@clinic.com",
    phone: "(11) 97777-6666",
    crm: "CRM 54321-SP",
    status: "inactive",
  },
];

const specialties = [
  "Cardiologia",
  "Dermatologia",
  "Ortopedia",
  "Pediatria",
  "Ginecologia",
  "Neurologia",
  "Psiquiatria",
  "Oftalmologia",
];

export default function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProfessional, setNewProfessional] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    crm: "",
  });

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesSearch =
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.crm.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      filterSpecialty === "all" || prof.specialty === filterSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  const handleAddProfessional = () => {
    if (!newProfessional.name || !newProfessional.specialty || !newProfessional.crm) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const professional: Professional = {
      id: String(professionals.length + 1),
      ...newProfessional,
      status: "active",
    };

    setProfessionals([...professionals, professional]);
    setIsAddDialogOpen(false);
    setNewProfessional({ name: "", specialty: "", email: "", phone: "", crm: "" });
    toast.success("Profissional cadastrado com sucesso!");
  };

  const handleDeleteProfessional = (id: string) => {
    setProfessionals(professionals.filter((p) => p.id !== id));
    toast.success("Profissional removido com sucesso!");
  };

  const toggleStatus = (id: string) => {
    setProfessionals(
      professionals.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
    toast.success("Status atualizado com sucesso!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profissionais</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o cadastro de profissionais de saúde
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Profissional
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Profissional</DialogTitle>
              <DialogDescription>
                Preencha os dados do profissional de saúde
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="prof-name">Nome Completo *</Label>
                <Input
                  id="prof-name"
                  placeholder="Nome do profissional"
                  value={newProfessional.name}
                  onChange={(e) =>
                    setNewProfessional({ ...newProfessional, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialização *</Label>
                <Select
                  value={newProfessional.specialty}
                  onValueChange={(value) =>
                    setNewProfessional({ ...newProfessional, specialty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a especialização" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prof-email">Email</Label>
                <Input
                  id="prof-email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={newProfessional.email}
                  onChange={(e) =>
                    setNewProfessional({ ...newProfessional, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prof-phone">Telefone</Label>
                <Input
                  id="prof-phone"
                  placeholder="(11) 98765-4321"
                  value={newProfessional.phone}
                  onChange={(e) =>
                    setNewProfessional({ ...newProfessional, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm">CRM *</Label>
                <Input
                  id="crm"
                  placeholder="CRM 12345-SP"
                  value={newProfessional.crm}
                  onChange={(e) =>
                    setNewProfessional({ ...newProfessional, crm: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddProfessional}>Cadastrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, especialização ou CRM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Especialização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Especialização</TableHead>
                <TableHead>CRM</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfessionals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum profissional encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredProfessionals.map((professional) => (
                  <TableRow key={professional.id}>
                    <TableCell className="font-medium">{professional.name}</TableCell>
                    <TableCell>{professional.specialty}</TableCell>
                    <TableCell>{professional.crm}</TableCell>
                    <TableCell>{professional.email}</TableCell>
                    <TableCell>{professional.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={professional.status === "active" ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleStatus(professional.id)}
                      >
                        {professional.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProfessional(professional.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
