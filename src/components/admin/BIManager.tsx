import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Video, HelpCircle, Sparkles } from "lucide-react";
import ImageUpload from "./ImageUpload";

const BIManager = () => {
  const { toast } = useToast();
  const [hero, setHero] = useState<any>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const [video, setVideo] = useState<any>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [editingItem, setEditingItem] = useState<any>(null);

  const [heroForm, setHeroForm] = useState({ title: "", description: "", image_url: "" });
  const [featureForm, setFeatureForm] = useState({ category: "", title: "", description: "", image_url: "", order_index: 0 });
  const [videoForm, setVideoForm] = useState({ video_url: "", title: "", description: "" });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", order_index: 0 });

  const FEATURE_CATEGORIES = [
    "Integración de datos",
    "Big data",
    "Servicios de procesamiento",
    "Entrada de insights",
    "Gobernanza y seguridad"
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const { data: heroData } = await supabase.from('bi_hero').select('*').maybeSingle();
    const { data: featuresData } = await supabase.from('bi_features').select('*').order('order_index');
    const { data: videoData } = await supabase.from('bi_video').select('*').maybeSingle();
    const { data: faqsData } = await supabase.from('bi_faqs').select('*').order('order_index');

    setHero(heroData);
    setFeatures(featuresData || []);
    setVideo(videoData);
    setFaqs(faqsData || []);

    if (heroData) {
      setHeroForm(heroData);
    }
    if (videoData) {
      setVideoForm(videoData);
    }
  };

  const resetForms = () => {
    setEditingItem(null);
    setFeatureForm({ category: "", title: "", description: "", image_url: "", order_index: 0 });
    setFaqForm({ question: "", answer: "", order_index: 0 });
  };

  // Hero handlers
  const handleSaveHero = async () => {
    if (!heroForm.title || !heroForm.description || !heroForm.image_url) {
      toast({ title: "Error", description: "Completa todos los campos", variant: "destructive" });
      return;
    }

    const { error } = hero
      ? await supabase.from('bi_hero').update(heroForm).eq('id', hero.id)
      : await supabase.from('bi_hero').insert([heroForm]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Hero guardado correctamente" });
      fetchAllData();
    }
  };

  // Features handlers
  const handleSaveFeature = async () => {
    if (!featureForm.category || !featureForm.title || !featureForm.description || !featureForm.image_url) {
      toast({ title: "Error", description: "Completa todos los campos", variant: "destructive" });
      return;
    }

    const { error } = editingItem
      ? await supabase.from('bi_features').update(featureForm).eq('id', editingItem.id)
      : await supabase.from('bi_features').insert([featureForm]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Característica guardada correctamente" });
      setOpenSheet(false);
      resetForms();
      fetchAllData();
    }
  };

  const handleEditFeature = (feature: any) => {
    setEditingItem(feature);
    setFeatureForm(feature);
    setOpenSheet(true);
  };

  const handleDeleteFeature = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta característica?")) return;
    
    const { error } = await supabase.from('bi_features').delete().eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Característica eliminada" });
      fetchAllData();
    }
  };

  // Video handlers
  const handleSaveVideo = async () => {
    if (!videoForm.video_url || !videoForm.title || !videoForm.description) {
      toast({ title: "Error", description: "Completa todos los campos", variant: "destructive" });
      return;
    }

    const { error } = video
      ? await supabase.from('bi_video').update(videoForm).eq('id', video.id)
      : await supabase.from('bi_video').insert([videoForm]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Video guardado correctamente" });
      fetchAllData();
    }
  };

  // FAQ handlers
  const handleSaveFAQ = async () => {
    if (!faqForm.question || !faqForm.answer) {
      toast({ title: "Error", description: "Completa todos los campos", variant: "destructive" });
      return;
    }

    const { error } = editingItem
      ? await supabase.from('bi_faqs').update(faqForm).eq('id', editingItem.id)
      : await supabase.from('bi_faqs').insert([faqForm]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "FAQ guardado correctamente" });
      setOpenSheet(false);
      resetForms();
      fetchAllData();
    }
  };

  const handleEditFAQ = (faq: any) => {
    setEditingItem(faq);
    setFaqForm(faq);
    setOpenSheet(true);
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta pregunta?")) return;
    
    const { error } = await supabase.from('bi_faqs').delete().eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "FAQ eliminado" });
      fetchAllData();
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="features">Características</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        {/* Hero Tab */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Banner Principal</CardTitle>
              <CardDescription>Edita el banner hero de la página</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input 
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  maxLength={200}
                />
              </div>
              <div>
                <Label>Descripción</Label>
                <Textarea 
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  maxLength={400}
                />
              </div>
              <ImageUpload
                currentImageUrl={heroForm.image_url}
                onImageUploaded={(url) => setHeroForm({ ...heroForm, image_url: url })}
                onImageDeleted={() => setHeroForm({ ...heroForm, image_url: "" })}
              />
              <Button onClick={handleSaveHero}>Guardar Hero</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Características de la Plataforma</h3>
              <p className="text-sm text-muted-foreground">Total: {features.length}</p>
            </div>
            <Sheet open={openSheet} onOpenChange={(open) => { setOpenSheet(open); if (!open) resetForms(); }}>
              <SheetTrigger asChild>
                <Button onClick={() => setActiveTab("features")}>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Característica
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{editingItem ? "Editar" : "Agregar"} Característica</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Categoría</Label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={featureForm.category}
                      onChange={(e) => setFeatureForm({ ...featureForm, category: e.target.value })}
                    >
                      <option value="">Seleccionar categoría</option>
                      {FEATURE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input 
                      value={featureForm.title}
                      onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Textarea 
                      value={featureForm.description}
                      onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                      maxLength={400}
                    />
                  </div>
                  <div>
                    <Label>Orden</Label>
                    <Input 
                      type="number"
                      value={featureForm.order_index}
                      onChange={(e) => setFeatureForm({ ...featureForm, order_index: parseInt(e.target.value) })}
                    />
                  </div>
                  <ImageUpload
                    currentImageUrl={featureForm.image_url}
                    onImageUploaded={(url) => setFeatureForm({ ...featureForm, image_url: url })}
                    onImageDeleted={() => setFeatureForm({ ...featureForm, image_url: "" })}
                  />
                  <Button onClick={handleSaveFeature} className="w-full">Guardar</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">{feature.category}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditFeature(feature)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteFeature(feature.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video de Demostración</CardTitle>
              <CardDescription>Agrega un video de YouTube</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>URL del Video (YouTube Embed)</Label>
                <Input 
                  value={videoForm.video_url}
                  onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                />
              </div>
              <div>
                <Label>Título</Label>
                <Input 
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  maxLength={200}
                />
              </div>
              <div>
                <Label>Descripción</Label>
                <Textarea 
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  maxLength={400}
                />
              </div>
              <Button onClick={handleSaveVideo}>Guardar Video</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Preguntas Frecuentes</h3>
              <p className="text-sm text-muted-foreground">Total: {faqs.length}</p>
            </div>
            <Sheet open={openSheet && activeTab === "faqs"} onOpenChange={(open) => { setOpenSheet(open); if (!open) resetForms(); }}>
              <SheetTrigger asChild>
                <Button onClick={() => setActiveTab("faqs")}>
                  <Plus className="mr-2 h-4 w-4" /> Agregar FAQ
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{editingItem ? "Editar" : "Agregar"} FAQ</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Pregunta</Label>
                    <Input 
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      maxLength={300}
                    />
                  </div>
                  <div>
                    <Label>Respuesta</Label>
                    <Textarea 
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      maxLength={800}
                    />
                  </div>
                  <div>
                    <Label>Orden</Label>
                    <Input 
                      type="number"
                      value={faqForm.order_index}
                      onChange={(e) => setFaqForm({ ...faqForm, order_index: parseInt(e.target.value) })}
                    />
                  </div>
                  <Button onClick={handleSaveFAQ} className="w-full">Guardar</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{faq.question}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{faq.answer}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditFAQ(faq)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteFAQ(faq.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BIManager;
