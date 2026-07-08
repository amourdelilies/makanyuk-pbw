import portfolioImage from "../../assets/images/Profile/portfolio.jpg";

export default function PortfolioCard() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <div className="relative">

        <img
          src={portfolioImage}
          alt="Portfolio"
          className="h-56 w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35"></div>

        <div className="absolute bottom-5 left-5">

          <p className="text-xs uppercase tracking-widest text-white/70">
            Featured Asset
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            My Culinary Portfolio
          </h2>

        </div>

      </div>

    </div>
  );
}