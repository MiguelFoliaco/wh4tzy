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
      ai_settings: {
        Row: {
          bot_id: string
          id: string
          max_tokens: number | null
          model: string | null
          provider: Database["public"]["Enums"]["ai_provider"]
          system_prompt: string | null
          temperature: number | null
        }
        Insert: {
          bot_id: string
          id?: string
          max_tokens?: number | null
          model?: string | null
          provider?: Database["public"]["Enums"]["ai_provider"]
          system_prompt?: string | null
          temperature?: number | null
        }
        Update: {
          bot_id?: string
          id?: string
          max_tokens?: number | null
          model?: string | null
          provider?: Database["public"]["Enums"]["ai_provider"]
          system_prompt?: string | null
          temperature?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_settings_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: true
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_documents: {
        Row: {
          bot_id: string
          content: string | null
          created_at: string | null
          id: string
          source: string | null
          title: string | null
        }
        Insert: {
          bot_id: string
          content?: string | null
          created_at?: string | null
          id?: string
          source?: string | null
          title?: string | null
        }
        Update: {
          bot_id?: string
          content?: string | null
          created_at?: string | null
          id?: string
          source?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_documents_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_flows: {
        Row: {
          bot_id: string
          created_at: string | null
          id: string
          is_default: boolean | null
          name: string
        }
        Insert: {
          bot_id: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name: string
        }
        Update: {
          bot_id?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_flows_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_variables: {
        Row: {
          bot_id: string
          id: string
          key: string
          value: string | null
        }
        Insert: {
          bot_id: string
          id?: string
          key: string
          value?: string | null
        }
        Update: {
          bot_id?: string
          id?: string
          key?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_variables_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bots: {
        Row: {
          auth_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          type: Database["public"]["Enums"]["bot_type"]
          updated_at: string | null
          user_id: string
          welcome_message: string | null
          whatsapp_account_id: string | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          type?: Database["public"]["Enums"]["bot_type"]
          updated_at?: string | null
          user_id: string
          welcome_message?: string | null
          whatsapp_account_id?: string | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["bot_type"]
          updated_at?: string | null
          user_id?: string
          welcome_message?: string | null
          whatsapp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bots_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          name: string | null
          phone_number: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          phone_number: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          phone_number?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          bot_id: string | null
          closed_at: string | null
          contact_id: string | null
          id: string
          started_at: string | null
          status: string | null
        }
        Insert: {
          bot_id?: string | null
          closed_at?: string | null
          contact_id?: string | null
          id?: string
          started_at?: string | null
          status?: string | null
        }
        Update: {
          bot_id?: string | null
          closed_at?: string | null
          contact_id?: string | null
          id?: string
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_connections: {
        Row: {
          id: string
          next_node_id: string | null
          node_id: string
          option_label: string
          option_value: string | null
        }
        Insert: {
          id?: string
          next_node_id?: string | null
          node_id: string
          option_label: string
          option_value?: string | null
        }
        Update: {
          id?: string
          next_node_id?: string | null
          node_id?: string
          option_label?: string
          option_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_connections_next_node_id_fkey"
            columns: ["next_node_id"]
            isOneToOne: false
            referencedRelation: "flow_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_connections_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "flow_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_nodes: {
        Row: {
          created_at: string | null
          flow_id: string
          id: string
          message: string
          node_key: string
          node_type: Database["public"]["Enums"]["node_type"] | null
        }
        Insert: {
          created_at?: string | null
          flow_id: string
          id?: string
          message: string
          node_key: string
          node_type?: Database["public"]["Enums"]["node_type"] | null
        }
        Update: {
          created_at?: string | null
          flow_id?: string
          id?: string
          message?: string
          node_key?: string
          node_type?: Database["public"]["Enums"]["node_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_nodes_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "bot_flows"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string | null
          direction: string
          id: string
          message_type: string | null
          provider_message_id: string | null
          sender: string | null
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string | null
          direction: string
          id?: string
          message_type?: string | null
          provider_message_id?: string | null
          sender?: string | null
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string | null
          direction?: string
          id?: string
          message_type?: string | null
          provider_message_id?: string | null
          sender?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          lastname: string | null
          name: string | null
          phone_number: string | null
          refarral_code: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          auth_id: string
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id?: string
          lastname?: string | null
          name?: string | null
          phone_number?: string | null
          refarral_code?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          auth_id?: string
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          lastname?: string | null
          name?: string | null
          phone_number?: string | null
          refarral_code?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      whatsapp_accounts: {
        Row: {
          access_token: string | null
          api_key: string | null
          api_secret: string | null
          auth_id: string | null
          bussine_account_id: string | null
          client_id: string | null
          created_at: string | null
          id: string
          name: string
          phone_number: string | null
          phone_number_id: string | null
          provider: string
          refresh_token: string | null
          status: Database["public"]["Enums"]["status_type"] | null
          updated_at: string | null
          user_id: string
          webhook_secret: string | null
        }
        Insert: {
          access_token?: string | null
          api_key?: string | null
          api_secret?: string | null
          auth_id?: string | null
          bussine_account_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          phone_number?: string | null
          phone_number_id?: string | null
          provider: string
          refresh_token?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
          user_id: string
          webhook_secret?: string | null
        }
        Update: {
          access_token?: string | null
          api_key?: string | null
          api_secret?: string | null
          auth_id?: string | null
          bussine_account_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          phone_number?: string | null
          phone_number_id?: string | null
          provider?: string
          refresh_token?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          updated_at?: string | null
          user_id?: string
          webhook_secret?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ai_provider: "openai" | "gemini" | "anthropic" | "deepseek"
      bot_type: "menu" | "ai" | "hybrid"
      node_type: "message" | "menu" | "input" | "api"
      status_type: "connected" | "disconnected" | "pending"
      token_type: "deepl" | "openia"
      user_role: "owner" | "admin" | "editor" | "viewer"
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
      ai_provider: ["openai", "gemini", "anthropic", "deepseek"],
      bot_type: ["menu", "ai", "hybrid"],
      node_type: ["message", "menu", "input", "api"],
      status_type: ["connected", "disconnected", "pending"],
      token_type: ["deepl", "openia"],
      user_role: ["owner", "admin", "editor", "viewer"],
    },
  },
} as const
