import { Injectable, signal, inject } from '@angular/core';
import { SupabaseService } from '../shared/supabase-service';

export interface Product {
  id: number;
  nombre: string;
  created_at: string; // o Date si lo conviertes
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly tableName = 'productos';
  private supabaseService = inject(SupabaseService);
  private supabase = this.supabaseService.supabaseClient;

  async getAllProducts() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) {
      throw error;
    }

    return data as Product[];
  }
}
