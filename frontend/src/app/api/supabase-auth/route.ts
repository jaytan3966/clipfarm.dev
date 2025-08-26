import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request){
    const userInfo = await req.json();
    const {data, error} = await supabase
    .from('profiles')
    .insert(userInfo);
    if (error){
        console.error('Supabase error: ', error);
        return Response.json({error: error.message}, {status:400})
    }
    return Response.json(data);
}