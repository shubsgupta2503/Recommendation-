export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stores: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          image_url: string | null
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          image_url?: string | null
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          image_url?: string | null
          category?: string
          created_at?: string
        }
      }
      prices: {
        Row: {
          id: string
          product_id: string
          store_id: string
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          store_id: string
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          store_id?: string
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}