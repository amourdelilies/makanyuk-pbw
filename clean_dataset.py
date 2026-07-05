import pandas as pd
import json
import re

# 1. Muat dataset mentah (sesuaikan jika file aslimu .csv atau .json)
# Jika file aslinya CSV: df = pd.read_csv('resep_mentah.csv')
df = pd.read_json('Indonesian_Food_Recipes')

# 2. Menghilangkan kolom yang tidak diperlukan 
# Masukkan nama kolom yang MAU DIPERTAHANKAN saja di sini
kolom_yang_dibutuhkan = ['title', 'ingredients', 'steps', 'category', 'calories']
df = df[kolom_yang_dibutuhkan]

# 3. Case Folding (Mengubah teks menjadi lowercase agar pencarian teknik masak akurat)
df['title'] = df['title'].str.lower()
df['category'] = df['category'].str.lower().fillna('umum')

# 4. Preprocessing kolom "ingredients" dan "steps" (Mengubah "item1 - item2" menjadi list)
def transform_to_list(text):
    if pd.isna(text):
        return []
    # Memisahkan string berdasarkan tanda hubung ganda (dengan atau tanpa spasi di sekitarnya)
    items = re.split(r'\s*-\s*', str(text))
    # Bersihkan ruang kosong di ujung teks dan hilangkan elemen kosong
    return [item.strip() for item in items if item.strip()]

df['ingredients'] = df['ingredients'].apply(transform_to_list)
df['steps'] = df['steps'].apply(transform_to_list)

# 5. Menambahkan Kolom Estimasi Waktu Berdasarkan Kata Kunci di "steps"
kamus_teknik = {
    'presto': 30,
    'ungkep': 25,
    'bakar': 20,
    'panggang': 20,
    'oven': 20,
    'rebus': 15,
    'kukus': 15,
    'didihkan': 15,
    'goreng': 10,
    'tumis': 5,
    'oseng': 5,
    'sangrai': 5
}

def hitung_estimasi_waktu(steps_list):
    total_waktu = 0
    # Gabungkan semua langkah menjadi satu teks string kecil untuk pencarian kata kunci
    gabungan_langkah = " ".join(steps_list).lower()
    
    # Cek setiap teknik masak yang ada di kamus
    for teknik, waktu in kamus_teknik.items():
        if teknik in gabungan_langkah:
            total_waktu += waktu
            
    # Jika tidak ada kata kunci yang cocok, berikan waktu default (misal 15 menit)
    return total_waktu if total_waktu > 0 else 15

df['time'] = df['steps'].apply(hitung_estimasi_waktu)

# 6. Ekspor hasil akhir menjadi JSON bersih yang siap dibaca oleh React Frontend
# Simpan langsung ke folder data frontend kamu
output_path = 'frontend/src/data/recipes.json'
df.to_json(output_path, orient='records', indent=4, force_ascii=False)

print(f"Data cleaning selesai! File disimpan di {output_path}")