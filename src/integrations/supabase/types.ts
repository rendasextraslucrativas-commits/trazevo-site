export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      benefits: {
        Row: {
          created_at: string
          description: string | null
          icon: string
          id: string
          is_visible: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_visible?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_visible?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string | null
          content: string
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          content?: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          content?: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_visible: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      lead_activities: {
        Row: {
          content: string | null
          created_at: string
          id: string
          lead_id: string
          type: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          lead_id: string
          type?: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          lead_id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_stages: {
        Row: {
          color: string
          created_at: string
          id: string
          is_visible: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          budget: number | null
          campaign: string | null
          city: string | null
          company: string | null
          consent: boolean
          created_at: string
          email: string | null
          id: string
          is_demo: boolean
          name: string
          next_contact_at: string | null
          niche: string | null
          notes: string | null
          owner_id: string | null
          plan_id: string | null
          priority: Database["public"]["Enums"]["lead_priority"]
          service: string | null
          source: string | null
          stage_id: string | null
          state: string | null
          tags: string[]
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          budget?: number | null
          campaign?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          email?: string | null
          id?: string
          is_demo?: boolean
          name: string
          next_contact_at?: string | null
          niche?: string | null
          notes?: string | null
          owner_id?: string | null
          plan_id?: string | null
          priority?: Database["public"]["Enums"]["lead_priority"]
          service?: string | null
          source?: string | null
          stage_id?: string | null
          state?: string | null
          tags?: string[]
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          budget?: number | null
          campaign?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          email?: string | null
          id?: string
          is_demo?: boolean
          name?: string
          next_contact_at?: string | null
          niche?: string | null
          notes?: string | null
          owner_id?: string | null
          plan_id?: string | null
          priority?: Database["public"]["Enums"]["lead_priority"]
          service?: string | null
          source?: string | null
          stage_id?: string | null
          state?: string | null
          tags?: string[]
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "lead_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_features: {
        Row: {
          created_at: string
          id: string
          label: string
          plan_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          plan_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          plan_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "plan_features_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          cta_label: string
          cta_url: string | null
          description: string | null
          id: string
          is_highlighted: boolean
          is_visible: boolean
          name: string
          price: number | null
          price_prefix: string | null
          promo_price: number | null
          revisions: string | null
          show_price: boolean
          sort_order: number
          support_period: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_label?: string
          cta_url?: string | null
          description?: string | null
          id?: string
          is_highlighted?: boolean
          is_visible?: boolean
          name: string
          price?: number | null
          price_prefix?: string | null
          promo_price?: number | null
          revisions?: string | null
          show_price?: boolean
          sort_order?: number
          support_period?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_label?: string
          cta_url?: string | null
          description?: string | null
          id?: string
          is_highlighted?: boolean
          is_visible?: boolean
          name?: string
          price?: number | null
          price_prefix?: string | null
          promo_price?: number | null
          revisions?: string | null
          show_price?: boolean
          sort_order?: number
          support_period?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          challenge: string | null
          cover_url: string | null
          created_at: string
          gallery: string[]
          id: string
          is_demo: boolean
          is_published: boolean
          niche: string
          result: string | null
          slug: string
          solution: string | null
          sort_order: number
          summary: string | null
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          challenge?: string | null
          cover_url?: string | null
          created_at?: string
          gallery?: string[]
          id?: string
          is_demo?: boolean
          is_published?: boolean
          niche: string
          result?: string | null
          slug: string
          solution?: string | null
          sort_order?: number
          summary?: string | null
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          challenge?: string | null
          cover_url?: string | null
          created_at?: string
          gallery?: string[]
          id?: string
          is_demo?: boolean
          is_published?: boolean
          niche?: string
          result?: string | null
          slug?: string
          solution?: string | null
          sort_order?: number
          summary?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          created_at: string
          description: string | null
          icon: string
          id: string
          is_visible: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_visible?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          is_visible?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_sections: {
        Row: {
          body: string | null
          created_at: string
          cta_label: string | null
          cta_url: string | null
          id: string
          is_visible: boolean
          slug: string
          sort_order: number
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          is_visible?: boolean
          slug: string
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          is_visible?: boolean
          slug?: string
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          accent_color: string
          address: string | null
          agency_name: string
          cookie_policy: string | null
          created_at: string
          currency: string
          domain: string | null
          email: string | null
          facebook_url: string | null
          favicon_url: string | null
          font_family: string
          footer_description: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          locale: string
          logo_url: string | null
          meta_description: string | null
          meta_title: string | null
          primary_color: string
          privacy_policy: string | null
          slogan: string | null
          terms_of_use: string | null
          timezone: string
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          accent_color?: string
          address?: string | null
          agency_name?: string
          cookie_policy?: string | null
          created_at?: string
          currency?: string
          domain?: string | null
          email?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          font_family?: string
          footer_description?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          locale?: string
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          primary_color?: string
          privacy_policy?: string | null
          slogan?: string | null
          terms_of_use?: string | null
          timezone?: string
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          accent_color?: string
          address?: string | null
          agency_name?: string
          cookie_policy?: string | null
          created_at?: string
          currency?: string
          domain?: string | null
          email?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          font_family?: string
          footer_description?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          locale?: string
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          primary_color?: string
          privacy_policy?: string | null
          slogan?: string | null
          terms_of_use?: string | null
          timezone?: string
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          features: string[]
          id: string
          is_published: boolean
          name: string
          niche: string
          preview_url: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          features?: string[]
          id?: string
          is_published?: boolean
          name: string
          niche: string
          preview_url?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          features?: string[]
          id?: string
          is_published?: boolean
          name?: string
          niche?: string
          preview_url?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          author_role: string | null
          avatar_url: string | null
          company: string | null
          created_at: string
          id: string
          is_demo: boolean
          is_visible: boolean
          quote: string
          rating: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          author_name: string
          author_role?: string | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          is_visible?: boolean
          quote: string
          rating?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          author_name?: string
          author_role?: string | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          is_visible?: boolean
          quote?: string
          rating?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_content: { Args: { _user_id: string }; Returns: boolean }
      can_manage_crm: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "comercial" | "editor" | "operacional"
      lead_priority: "baixa" | "media" | "alta"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "comercial", "editor", "operacional"],
      lead_priority: ["baixa", "media", "alta"],
    },
  },
} as const
