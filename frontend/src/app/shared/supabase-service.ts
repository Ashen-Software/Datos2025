import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }
}