import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const fallbacks = [
  {
    name: 'The Moon',
    slug: 'the-moon',
    suit: 'Major Arcana',
    baseMeaning: 'There is truth here, but it is arriving through intuition before logic.',
    poeticLine: 'The tide knows before the mind admits it.',
    tags: ['intuition', 'uncertainty', 'dreams'],
    interpretation: 'There is an active emotional bond here, but clarity depends on whether both people are willing to choose honesty over ambiguity.'
  },
  {
    name: 'The Tower',
    slug: 'the-tower',
    suit: 'Major Arcana',
    baseMeaning: 'Something unstable is breaking so something honest can stand.',
    poeticLine: 'What falls was never meant to hold your whole future.',
    tags: ['disruption', 'truth', 'release'],
    interpretation: 'This pull suggests the old frame is cracking. What feels intense may actually be the start of a more honest path.'
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { intent, type, chat_history } = await req.json();

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    
    let generatedReading = fallbacks[0]; 

    if (openAiKey) {
      // In a real scenario, call OpenAI here.
      // For now, we'll simulate logic based on intent.
      generatedReading = (intent?.focus_area === 'transformation') ? fallbacks[1] : fallbacks[0];
    } else {
      if (intent?.focus_area === 'transformation') {
         generatedReading = fallbacks[1];
      }
    }

    if (type === 'chat') {
       return new Response(
         JSON.stringify({
           reply: `Within the context of ${generatedReading.name}, the strongest answer is this: ${generatedReading.interpretation} Your focus on ${intent?.focus_area || 'clarity'} requires brutal honesty before action.`
         }),
         { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       )
    }

    return new Response(
      JSON.stringify(generatedReading),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
