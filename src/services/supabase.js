import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const URL='https://dxzsbtqmuuoerfgtlucc.supabase.co';
const KEY='sb_publishable_3wSkiYRKH7t_JWxCYmYunw_cUNpHnVU';
export const supabase=createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
export async function currentUser(){const {data}=await supabase.auth.getUser();return data.user||null}
const digits=v=>String(v||'').replace(/\D/g,'');
export async function signUp(email,password,fullName='',phone=''){const p=digits(phone);if(!p)throw new Error('Informe seu celular/WhatsApp.');const loginEmail=`${p}@phone.state-services.invalid`;return supabase.auth.signUp({email:loginEmail,password,options:{data:{full_name:fullName,phone:p,contact_email:String(email||'').trim()||null}}})}
export async function signIn(identifier,password){const value=String(identifier||'').trim();const {data,error}=await supabase.rpc('resolve_customer_login',{p_identifier:value});if(error)throw error;const loginEmail=data||value;return supabase.auth.signInWithPassword({email:loginEmail,password})}
export async function signOut(){return supabase.auth.signOut()}
export async function resetPassword(email){return supabase.auth.resetPasswordForEmail(email,{redirectTo:location.origin})}
