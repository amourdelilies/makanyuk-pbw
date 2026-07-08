import { useState } from 'react';

export default function useGemini() {
  const [messages, setMessages] = useState([
    { text: 'Halo! Aku YukBot, asisten masak pintarmu dari MakanYuk!. Ada bahan apa aja di kulkasmu hari ini? Biar aku bantu cari resepnya!', isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userQuery) => {
    if (!userQuery.trim() || isTyping) return;

    // 1. Tampilkan pesan user ke layar
    setMessages(prev => [...prev, { text: userQuery, isBot: false }]);
    setIsTyping(true);

    try {
      // 2. Ambil token dari env
      const apiKey = import.meta.env.VITE_HF_API_KEY;

      // Kita pakai model Meta Llama 3 yang pinter dan gratis lewat server Hugging Face
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nKamu adalah YukBot, asisten masak pintar yang ramah dari aplikasi MakanYuk!. Tugasmu memberikan rekomendasi resep masakan khas Indonesia, tips dapur, dan panduan memasak. Jawablah dengan singkat, solutif, ceria, dan gunakan bahasa Indonesia yang santai.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${userQuery}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
            parameters: {
              max_new_tokens: 250,
              temperature: 0.7,
            }
          }),
        }
      );

      const data = await response.json();
      
      // Mengambil teks balasan dari struktur data Hugging Face
      let responseText = data[0]?.generated_text || "";
      
      // Bersihkan sisa format prompt jika ada
      if (responseText.includes("assistant\n\n")) {
        responseText = responseText.split("assistant\n\n").pop();
      }

      // 3. Masukkan jawaban ke layar
      setMessages(prev => [...prev, { text: responseText || "Wah, YukBot agak bingung nih. Bisa coba tanyakan lagi?", isBot: true }]);
    } catch (error) {
      console.error("Hugging Face API Error:", error);
      setMessages(prev => [...prev, { text: 'Aduh, koneksi YukBot ke dapur pusat lagi terputus nih. Boleh coba tanya lagi sebentar?', isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping };
}