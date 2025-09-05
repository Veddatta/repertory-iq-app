exports.handler = async function(event) {
  const { symptom } = JSON.parse(event.body);
  const apiKey = process.env.GEMINI_API_KEY; // This gets the secret key from Netlify

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  
  // This is the corrected, full prompt
  const prompt = `You are an expert in homeopathic repertory. Your task is to convert a patient's symptom described in simple English into a formal Kentian-style homeopathic rubric. The rubric should be structured with hyphens, like 'MIND - ANXIETY - health, about'. Provide only the rubric itself as the answer. Symptom: "${symptom}"`;

  try {
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
