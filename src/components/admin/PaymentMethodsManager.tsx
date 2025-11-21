import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  account_info: string;
  icon: string;
  is_active: boolean;
  order_index: number;
}

const iconOptions = [
  "CreditCard",
  "Wallet",
  "Banknote",
  "Building",
  "Smartphone"
];

export const PaymentMethodsManager = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    account_info: "",
    icon: "CreditCard",
    is_active: true,
    order_index: 0,
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    const { data, error } = await supabase
      .from("payment_methods")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Error al cargar métodos de pago");
      return;
    }

    setPaymentMethods(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("payment_methods")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast.error("Error al actualizar método de pago");
        return;
      }

      toast.success("Método de pago actualizado");
    } else {
      const { error } = await supabase
        .from("payment_methods")
        .insert([formData]);

      if (error) {
        toast.error("Error al crear método de pago");
        return;
      }

      toast.success("Método de pago creado");
    }

    resetForm();
    fetchPaymentMethods();
    setIsOpen(false);
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingId(method.id);
    setFormData({
      name: method.name,
      description: method.description,
      account_info: method.account_info,
      icon: method.icon,
      is_active: method.is_active,
      order_index: method.order_index,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("payment_methods")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error al eliminar método de pago");
      return;
    }

    toast.success("Método de pago eliminado");
    fetchPaymentMethods();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      account_info: "",
      icon: "CreditCard",
      is_active: true,
      order_index: 0,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Métodos de Pago</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Método
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editingId ? "Editar Método de Pago" : "Nuevo Método de Pago"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Cuenta BCP"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción del método"
                  required
                />
              </div>
              <div>
                <Label htmlFor="account_info">Información de Cuenta</Label>
                <Textarea
                  id="account_info"
                  value={formData.account_info}
                  onChange={(e) => setFormData({ ...formData, account_info: e.target.value })}
                  placeholder="Ej: Cuenta: 123-456-789 | Titular: Juan Pérez"
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Ícono</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="order_index">Orden</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Activo</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Actualizar" : "Crear"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{method.name}</h3>
                    {!method.is_active && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">Inactivo</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{method.account_info}</p>
                  <p className="text-xs text-muted-foreground mt-2">Ícono: {method.icon} | Orden: {method.order_index}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(method)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar método de pago?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(method.id)}>
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
