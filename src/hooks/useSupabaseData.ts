import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useHeroSlides() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("order_index");
      
      if (!error && data) {
        setSlides(data);
      }
      setLoading(false);
    };

    fetchSlides();
  }, []);

  return { slides, loading };
}

export function useServices(showInHomeOnly = false) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      let query = supabase.from("services").select("*");
      
      if (showInHomeOnly) {
        query = query.eq("show_in_home", true);
      }
      
      const { data, error } = await query.order("created_at");
      
      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, [showInHomeOnly]);

  return { services, loading };
}

export function useTemplates(featuredOnly = false) {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      let query = supabase
        .from("templates")
        .select(`
          *,
          category:template_categories(id, name, icon),
          keywords:template_keywords(keyword:keywords(id, name))
        `);
      
      if (featuredOnly) {
        query = query.eq("is_featured", true);
      }
      
      const { data, error } = await query.order("created_at");
      
      if (!error && data) {
        setTemplates(data);
      }
      setLoading(false);
    };

    fetchTemplates();
  }, [featuredOnly]);

  return { templates, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("template_categories")
        .select("*")
        .order("name");
      
      if (!error && data) {
        setCategories(data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}

export function useClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at");
      
      if (!error && data) {
        setClients(data);
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  return { clients, loading };
}

export function useAboutUs() {
  const [aboutUs, setAboutUs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUs = async () => {
      const { data, error } = await supabase
        .from("about_us")
        .select("*")
        .single();
      
      if (!error && data) {
        setAboutUs(data);
      }
      setLoading(false);
    };

    fetchAboutUs();
  }, []);

  return { aboutUs, loading };
}

export function useValues() {
  const [values, setValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValues = async () => {
      const { data, error } = await supabase
        .from("values")
        .select("*")
        .order("created_at");
      
      if (!error && data) {
        setValues(data);
      }
      setLoading(false);
    };

    fetchValues();
  }, []);

  return { values, loading };
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("created_at");
      
      if (!error && data) {
        setTeamMembers(data);
      }
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  return { teamMembers, loading };
}

export function useSocialLinks() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("order_index");
      
      if (!error && data) {
        setSocialLinks(data);
      }
      setLoading(false);
    };

    fetchSocialLinks();
  }, []);

  return { socialLinks, loading };
}

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const { data, error } = await supabase
        .from("payment_methods")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      
      if (!error && data) {
        setPaymentMethods(data);
      }
      setLoading(false);
    };

    fetchPaymentMethods();
  }, []);

  return { paymentMethods, loading };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("order_index");
      
      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading };
}

export function useBIHero() {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase
        .from("bi_hero")
        .select("*")
        .maybeSingle();
      
      if (!error && data) {
        setHero(data);
      }
      setLoading(false);
    };

    fetchHero();
  }, []);

  return { hero, loading };
}

export function useBIFeatures() {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      const { data, error } = await supabase
        .from("bi_features")
        .select("*")
        .order("order_index");
      
      if (!error && data) {
        setFeatures(data);
      }
      setLoading(false);
    };

    fetchFeatures();
  }, []);

  return { features, loading };
}

export function useBIVideo() {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data, error } = await supabase
        .from("bi_video")
        .select("*")
        .maybeSingle();
      
      if (!error && data) {
        setVideo(data);
      }
      setLoading(false);
    };

    fetchVideo();
  }, []);

  return { video, loading };
}

export function useBIFAQs() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      const { data, error } = await supabase
        .from("bi_faqs")
        .select("*")
        .order("order_index");
      
      if (!error && data) {
        setFaqs(data);
      }
      setLoading(false);
    };

    fetchFAQs();
  }, []);

  return { faqs, loading };
}

