import { Target, Eye, History, Heart, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Dedicados a la excelencia en cada proyecto que emprendemos",
    },
    {
      icon: Users,
      title: "Colaboración",
      description: "Trabajamos en estrecha colaboración con nuestros clientes",
    },
    {
      icon: Award,
      title: "Calidad",
      description: "Estándares superiores en todos nuestros entregables",
    },
    {
      icon: Target,
      title: "Resultados",
      description: "Enfocados en generar impacto medible y sostenible",
    },
  ];

  const team = [
    {
      name: "Carlos Rodríguez",
      role: "CEO & Fundador",
      description: "Experto en transformación digital con más de 15 años de experiencia en consultoría tecnológica",
    },
    {
      name: "María González",
      role: "Directora de Tecnología",
      description: "Especialista en desarrollo de soluciones analíticas y business intelligence",
    },
    {
      name: "Juan Martínez",
      role: "Lead Developer",
      description: "Ingeniero de software con expertise en Python, automatización y machine learning",
    },
    {
      name: "Ana Silva",
      role: "Data Analyst Senior",
      description: "Experta en Excel avanzado, Power BI y análisis de datos financieros",
    },
  ];

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
                    <p className="text-muted-foreground leading-relaxed">
                      Empoderar a las organizaciones con soluciones tecnológicas innovadoras y accesibles, 
                      transformando datos en conocimiento accionable que impulse la toma de decisiones estratégicas 
                      y el crecimiento sostenible del negocio.
                    </p>
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
                    <p className="text-muted-foreground leading-relaxed">
                      Ser el referente latinoamericano en asesoría tecnológica y desarrollo de herramientas 
                      analíticas, reconocidos por nuestra capacidad de simplificar lo complejo y entregar 
                      soluciones que generan valor tangible en cada implementación.
                    </p>
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
                  <p className="text-muted-foreground leading-relaxed">
                    Desde 2010, DatoDirecto ha evolucionado de un pequeño equipo de consultores a una 
                    empresa líder en soluciones tecnológicas. Comenzamos ayudando a PyMEs con análisis de 
                    datos básicos y hoy servimos a organizaciones de todos los tamaños con herramientas 
                    sofisticadas de Excel, Python y Power BI. Hemos completado más de 500 proyectos exitosos 
                    y desarrollado plantillas especializadas que han optimizado procesos en múltiples industrias.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <div className="mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Nuestros <span className="text-primary">Valores</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="hover-lift text-center">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                        <value.icon className="text-white" size={28} />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Nuestro <span className="text-primary">Equipo</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <Card key={index} className="hover-lift text-center">
                    <CardHeader>
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
