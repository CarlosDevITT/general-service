import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const URL='https://dxzsbtqmuuoerfgtlucc.supabase.co';
const KEY='sb_publishable_3wSkiYRKH7t_JWxCYmYunw_cUNpHnVU';
export const supabase=createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
export async function currentUser(){const {data}=await supabase.auth.getUser();return data.user||null}
export async function signUp(email,password,fullName='',phone=''){return supabase.auth.signUp({email,password,options:{data:{full_name:fullName,phone:phone||null},emailRedirectTo:location.origin}})}
export async function signIn(email,password){return supabase.auth.signInWithPassword({email,password})}
export async function signOut(){return supabase.auth.signOut()}
export async function resetPassword(email){return supabase.auth.resetPasswordForEmail(email,{redirectTo:location.origin})}
