import heroImage from "../../assets/images/Hero.jpg";
// kalau nanti namanya sudah hero.jpg tinggal ganti di sini

function Hero() {
  return (
    <section
      className="relative h-[450px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Tulisan */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-white text-6xl font-bold text-center">
          Mau masak apa
          <br />
          <span className="text-green-400">
            hari ini?
          </span>
        </h1>
      </div>
    </section>
  );
}

export default Hero;