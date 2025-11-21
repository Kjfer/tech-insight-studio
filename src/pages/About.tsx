import { Target, Eye, History, Heart, Users, Award, Lightbulb, Shield, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useAboutUs, useValues, useTeamMembers } from "@/hooks/useSupabaseData";

const About = () => {
  const { aboutUs, loading: aboutLoading } = useAboutUs();
  const { values, loading: valuesLoading } = useValues();
  const { teamMembers, loading: teamLoading } = useTeamMembers();

  // Icon mapping for dynamic icon rendering
  const iconMap: Record<string, any> = {
    Heart,
    Users,
    Award,
    Target,
    Eye,
    History,
    Lightbulb,
    Shield,
    Sparkles,
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mission & Vision */}
            <div className="max-w-4xl mx-auto mb-20">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16">
                Sobre <span className="text-primary">Nosotros</span>
              </h1>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="hover-lift">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                      <Target className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-2xl">Nuestra Misión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {aboutLoading ? (
                      <Skeleton className="h-20 w-full" />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {aboutUs?.mission || "Empoderar a las organizaciones con soluciones tecnológicas innovadoras."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                      <Eye className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-2xl">Nuestra Visión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {aboutLoading ? (
                      <Skeleton className="h-20 w-full" />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {aboutUs?.vision || "Ser el referente en asesoría tecnológica y desarrollo de herramientas analíticas."}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* History */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <History className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Nuestra Historia</CardTitle>
                </CardHeader>
                <CardContent>
                  {aboutLoading ? (
                    <Skeleton className="h-24 w-full" />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {aboutUs?.history || "Nuestra historia de crecimiento y compromiso con la excelencia."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <div className="mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Nuestros <span className="text-primary">Valores</span>
              </h2>
              {valuesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i} className="text-center">
                      <CardHeader>
                        <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-4" />
                        <Skeleton className="h-6 w-24 mx-auto" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-12 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value) => {
                    const IconComponent = iconMap[value.icon] || Heart;
                    return (
                      <Card key={value.id} className="hover-lift text-center">
                        <CardHeader>
                          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="text-white" size={28} />
                          </div>
                          <CardTitle className="text-lg">{value.title}</CardTitle>
                        </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3 break-words">{value.description}</p>
                      </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Team */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Nuestro <span className="text-primary">Equipo</span>
              </h2>
              {teamLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i} className="text-center">
                      <CardHeader>
                        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                        <Skeleton className="h-6 w-32 mx-auto" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-16 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className="hover-lift text-center">
                      <CardHeader>
                        <Avatar className="w-24 h-24 mx-auto mb-4">
                          <AvatarImage src={member.image_url || undefined} alt={member.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-3xl font-bold text-white">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-primary font-medium">{member.role}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-4 break-words">{member.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
