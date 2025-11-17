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
