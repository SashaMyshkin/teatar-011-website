export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      awards: {
        Row: {
          award_uid: number
          id: number
          name: string
          script_id: number
        }
        Insert: {
          award_uid: number
          id?: number
          name: string
          script_id: number
        }
        Update: {
          award_uid?: number
          id?: number
          name?: string
          script_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "awards_award_uid_fkey"
            columns: ["award_uid"]
            isOneToOne: false
            referencedRelation: "awards_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "awards_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      awards_festivals_members: {
        Row: {
          award_uid: number
          festival_year_id: number
          id: number
          member_uid: number
        }
        Insert: {
          award_uid: number
          festival_year_id: number
          id?: number
          member_uid: number
        }
        Update: {
          award_uid?: number
          festival_year_id?: number
          id?: number
          member_uid?: number
        }
        Relationships: [
          {
            foreignKeyName: "awards_festivals_members_award_uid_fkey"
            columns: ["award_uid"]
            isOneToOne: false
            referencedRelation: "awards_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_festivals_members_festival_year_id_fkey"
            columns: ["festival_year_id"]
            isOneToOne: false
            referencedRelation: "festivals_year"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_festivals_members_member_uid_fkey"
            columns: ["member_uid"]
            isOneToOne: false
            referencedRelation: "members_uid"
            referencedColumns: ["id"]
          },
        ]
      }
      awards_uid: {
        Row: {
          id: number
          importance: number | null
        }
        Insert: {
          id?: number
          importance?: number | null
        }
        Update: {
          id?: number
          importance?: number | null
        }
        Relationships: []
      }
      festivals: {
        Row: {
          festival_uid: number
          id: number
          name: string
          place: string | null
          script_id: number
        }
        Insert: {
          festival_uid: number
          id?: number
          name: string
          place?: string | null
          script_id: number
        }
        Update: {
          festival_uid?: number
          id?: number
          name?: string
          place?: string | null
          script_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "festivals_festival_uid_fkey"
            columns: ["festival_uid"]
            isOneToOne: false
            referencedRelation: "festivals_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festivals_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festivals_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "festivals_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      festivals_uid: {
        Row: {
          id: number
          importance: number | null
        }
        Insert: {
          id?: number
          importance?: number | null
        }
        Update: {
          id?: number
          importance?: number | null
        }
        Relationships: []
      }
      festivals_year: {
        Row: {
          end_date: string | null
          festival_uid: number
          id: number
          performance_uid: number
          start_date: string | null
          year: number
        }
        Insert: {
          end_date?: string | null
          festival_uid: number
          id?: number
          performance_uid: number
          start_date?: string | null
          year: number
        }
        Update: {
          end_date?: string | null
          festival_uid?: number
          id?: number
          performance_uid?: number
          start_date?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "festivals_year_festival_uid_fkey"
            columns: ["festival_uid"]
            isOneToOne: false
            referencedRelation: "festivals_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festivals_year_performance_uid_fkey"
            columns: ["performance_uid"]
            isOneToOne: false
            referencedRelation: "performances_uid"
            referencedColumns: ["id"]
          },
        ]
      }
      media_entity_types: {
        Row: {
          aspect_ratio: number
          description: string
          id: number
          max_width: number
          type: string
        }
        Insert: {
          aspect_ratio?: number
          description: string
          id?: number
          max_width: number
          type: string
        }
        Update: {
          aspect_ratio?: number
          description?: string
          id?: number
          max_width?: number
          type?: string
        }
        Relationships: []
      }
      media_images: {
        Row: {
          height: number
          id: number
          pathname: string
          size: number
          supabase_id: string | null
          width: number
        }
        Insert: {
          height: number
          id?: number
          pathname: string
          size: number
          supabase_id?: string | null
          width: number
        }
        Update: {
          height?: number
          id?: number
          pathname?: string
          size?: number
          supabase_id?: string | null
          width?: number
        }
        Relationships: []
      }
      media_images_alt: {
        Row: {
          alt: string | null
          id: number
          image_id: number
          script_id: number
        }
        Insert: {
          alt?: string | null
          id?: number
          image_id: number
          script_id: number
        }
        Update: {
          alt?: string | null
          id?: number
          image_id?: number
          script_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "images_alt_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "media_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_alt_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_alt_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "images_alt_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      media_images_relations: {
        Row: {
          entity_id: number
          entity_type_id: number
          id: number
          image_id: number
          order: number
        }
        Insert: {
          entity_id: number
          entity_type_id: number
          id?: number
          image_id: number
          order?: number
        }
        Update: {
          entity_id?: number
          entity_type_id?: number
          id?: number
          image_id?: number
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "images_relations_entity_type_id_fkey"
            columns: ["entity_type_id"]
            isOneToOne: false
            referencedRelation: "media_entity_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_relations_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "media_images"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          id: number
          member_uid: number
          motto: string | null
          name: string | null
          script_id: number
          surname: string | null
        }
        Insert: {
          id?: number
          member_uid: number
          motto?: string | null
          name?: string | null
          script_id: number
          surname?: string | null
        }
        Update: {
          id?: number
          member_uid?: number
          motto?: string | null
          name?: string | null
          script_id?: number
          surname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_member_uid_fkey"
            columns: ["member_uid"]
            isOneToOne: false
            referencedRelation: "members_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "members_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      members_biographies: {
        Row: {
          id: number
          member_uid: number
          order_number: number
          paragraph: string
          script_id: number
        }
        Insert: {
          id?: number
          member_uid: number
          order_number?: number
          paragraph: string
          script_id: number
        }
        Update: {
          id?: number
          member_uid?: number
          order_number?: number
          paragraph?: string
          script_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "members_biographies_member_uid_fkey"
            columns: ["member_uid"]
            isOneToOne: false
            referencedRelation: "members_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_biographies_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_biographies_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "members_biographies_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      members_membership_status: {
        Row: {
          id: number
          membership_status_uid: number
          script_id: number
          status_name: string
        }
        Insert: {
          id?: number
          membership_status_uid: number
          script_id: number
          status_name: string
        }
        Update: {
          id?: number
          membership_status_uid?: number
          script_id?: number
          status_name?: string
        }
        Relationships: []
      }
      members_membership_status_uid: {
        Row: {
          code: string | null
          description: string
          id: number
          importance: number
        }
        Insert: {
          code?: string | null
          description: string
          id?: number
          importance?: number
        }
        Update: {
          code?: string | null
          description?: string
          id?: number
          importance?: number
        }
        Relationships: []
      }
      members_uid: {
        Row: {
          date_of_birth: string | null
          date_of_joining: string
          date_of_leaving: string | null
          email: string | null
          id: number
          identifier: string
          is_public: number
          membership_status_uid: number
        }
        Insert: {
          date_of_birth?: string | null
          date_of_joining: string
          date_of_leaving?: string | null
          email?: string | null
          id?: number
          identifier: string
          is_public?: number
          membership_status_uid: number
        }
        Update: {
          date_of_birth?: string | null
          date_of_joining?: string
          date_of_leaving?: string | null
          email?: string | null
          id?: number
          identifier?: string
          is_public?: number
          membership_status_uid?: number
        }
        Relationships: [
          {
            foreignKeyName: "members_uid_membership_status_uid_fkey"
            columns: ["membership_status_uid"]
            isOneToOne: false
            referencedRelation: "members_membership_status_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_uid_membership_status_uid_fkey"
            columns: ["membership_status_uid"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["uid"]
          },
        ]
      }
      metadata: {
        Row: {
          description: string
          id: number
          keywords: string
          metadata_uid: number
          og_description: string
          og_image_alt: string | null
          og_title: string
          script_id: number
          title: string
        }
        Insert: {
          description: string
          id?: number
          keywords: string
          metadata_uid: number
          og_description: string
          og_image_alt?: string | null
          og_title: string
          script_id: number
          title: string
        }
        Update: {
          description?: string
          id?: number
          keywords?: string
          metadata_uid?: number
          og_description?: string
          og_image_alt?: string | null
          og_title?: string
          script_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "metadata_metadata_uid_fkey"
            columns: ["metadata_uid"]
            isOneToOne: false
            referencedRelation: "metadata_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "metadata_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "metadata_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "metadata_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      metadata_entity_types: {
        Row: {
          description: string
          id: number
          type: string
        }
        Insert: {
          description: string
          id?: number
          type: string
        }
        Update: {
          description?: string
          id?: number
          type?: string
        }
        Relationships: []
      }
      metadata_uid: {
        Row: {
          entity_id: number
          entity_type_id: number
          id: number
          og_image: string
          og_type: string
          og_url: string
        }
        Insert: {
          entity_id: number
          entity_type_id: number
          id?: number
          og_image: string
          og_type: string
          og_url: string
        }
        Update: {
          entity_id?: number
          entity_type_id?: number
          id?: number
          og_image?: string
          og_type?: string
          og_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "metadata_uid_entity_type_id_fkey"
            columns: ["entity_type_id"]
            isOneToOne: false
            referencedRelation: "metadata_entity_types"
            referencedColumns: ["id"]
          },
        ]
      }
      performances: {
        Row: {
          id: number
          performance_uid: number
          script_id: number
          slogan: string
          title: string
        }
        Insert: {
          id?: number
          performance_uid: number
          script_id: number
          slogan: string
          title: string
        }
        Update: {
          id?: number
          performance_uid?: number
          script_id?: number
          slogan?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "performances_performance_uid_fkey"
            columns: ["performance_uid"]
            isOneToOne: false
            referencedRelation: "performances_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "performances_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      performances_about: {
        Row: {
          id: number
          order_number: number | null
          paragraph: string
          performance_uid: number
          script_id: number
        }
        Insert: {
          id?: number
          order_number?: number | null
          paragraph: string
          performance_uid: number
          script_id: number
        }
        Update: {
          id?: number
          order_number?: number | null
          paragraph?: string
          performance_uid?: number
          script_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "performances_about_performance_uid_fkey"
            columns: ["performance_uid"]
            isOneToOne: false
            referencedRelation: "performances_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_about_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_about_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "performances_about_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      performances_roles: {
        Row: {
          id: number
          performance_role_uid: number
          role_name: string
          script_id: number
        }
        Insert: {
          id?: number
          performance_role_uid: number
          role_name: string
          script_id: number
        }
        Update: {
          id?: number
          performance_role_uid?: number
          role_name?: string
          script_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "performances_roles_performance_role_uid_fkey"
            columns: ["performance_role_uid"]
            isOneToOne: false
            referencedRelation: "performances_roles_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_roles_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_roles_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "performances_roles_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      performances_roles_members: {
        Row: {
          id: number
          member_uid: number
          performance_role_uid: number
        }
        Insert: {
          id?: number
          member_uid: number
          performance_role_uid: number
        }
        Update: {
          id?: number
          member_uid?: number
          performance_role_uid?: number
        }
        Relationships: [
          {
            foreignKeyName: "performances_roles_members_member_uid_fkey"
            columns: ["member_uid"]
            isOneToOne: false
            referencedRelation: "members_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_roles_members_performance_role_uid_fkey"
            columns: ["performance_role_uid"]
            isOneToOne: false
            referencedRelation: "performances_roles_uid"
            referencedColumns: ["id"]
          },
        ]
      }
      performances_roles_uid: {
        Row: {
          description: string
          id: number
          importance: number
          performance_uid: number
        }
        Insert: {
          description: string
          id?: number
          importance: number
          performance_uid: number
        }
        Update: {
          description?: string
          id?: number
          importance?: number
          performance_uid?: number
        }
        Relationships: [
          {
            foreignKeyName: "performances_roles_uid_performance_uid_fkey"
            columns: ["performance_uid"]
            isOneToOne: false
            referencedRelation: "performances_uid"
            referencedColumns: ["id"]
          },
        ]
      }
      performances_types: {
        Row: {
          id: number
          performance_type_uid: number
          script_id: number
          type_name: string
        }
        Insert: {
          id?: number
          performance_type_uid: number
          script_id: number
          type_name: string
        }
        Update: {
          id?: number
          performance_type_uid?: number
          script_id?: number
          type_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "performances_types_performance_type_uid_fkey"
            columns: ["performance_type_uid"]
            isOneToOne: false
            referencedRelation: "performances_types_uid"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_types_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_types_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "performances_types_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      performances_types_uid: {
        Row: {
          code: string | null
          description: string | null
          id: number
        }
        Insert: {
          code?: string | null
          description?: string | null
          id?: number
        }
        Update: {
          code?: string | null
          description?: string | null
          id?: number
        }
        Relationships: []
      }
      performances_uid: {
        Row: {
          date_of_premiere: string
          id: number
          identifier: string
          is_public: number
          performance_type_uid: number
        }
        Insert: {
          date_of_premiere: string
          id?: number
          identifier: string
          is_public: number
          performance_type_uid: number
        }
        Update: {
          date_of_premiere?: string
          id?: number
          identifier?: string
          is_public?: number
          performance_type_uid?: number
        }
        Relationships: [
          {
            foreignKeyName: "performances_uid_performance_type_uid_fkey"
            columns: ["performance_type_uid"]
            isOneToOne: false
            referencedRelation: "performances_types_uid"
            referencedColumns: ["id"]
          },
        ]
      }
      scripts: {
        Row: {
          default: number
          description: string
          id: number
          name: string
          status_id: number
        }
        Insert: {
          default?: number
          description: string
          id?: number
          name: string
          status_id: number
        }
        Update: {
          default?: number
          description?: string
          id?: number
          name?: string
          status_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "scripts_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "scripts_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      scripts_statuses: {
        Row: {
          id: number
          status: string | null
        }
        Insert: {
          id?: number
          status?: string | null
        }
        Update: {
          id?: number
          status?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          is_admin: boolean
        }
        Insert: {
          id: string
          is_admin?: boolean
        }
        Update: {
          id?: string
          is_admin?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      v_images: {
        Row: {
          alt: string | null
          entity_id: number | null
          height: number | null
          pathname: string | null
          script_id: number | null
          type: string | null
          width: number | null
        }
        Relationships: [
          {
            foreignKeyName: "images_alt_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_alt_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_members"
            referencedColumns: ["script_id"]
          },
          {
            foreignKeyName: "images_alt_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "v_membership_statuses"
            referencedColumns: ["script_id"]
          },
        ]
      }
      v_members: {
        Row: {
          date_of_birth: string | null
          date_of_joining: string | null
          date_of_leaving: string | null
          email: string | null
          identifier: string | null
          is_public: number | null
          member_uid: number | null
          membership_status: string | null
          membership_status_uid: number | null
          motto: string | null
          name: string | null
          script: string | null
          script_id: number | null
          surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_member_uid_fkey"
            columns: ["member_uid"]
            isOneToOne: false
            referencedRelation: "members_uid"
            referencedColumns: ["id"]
          },
        ]
      }
      v_membership_statuses: {
        Row: {
          code: string | null
          script: string | null
          script_id: number | null
          status: string | null
          uid: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
