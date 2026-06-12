import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

const TESTIMONIALS = [
  {
    name: "Roberto Mazzini",
    location: "São Paulo, Brasil",
    text: "Já investi em imóveis antes, mas nunca com tanta clareza nos números. O Fernando me mostrou o fluxo de caixa, a valorização projetada e o momento certo de entrar. Entrei no pré-lançamento e em poucos meses o imóvel já estava acima do preço de tabela.",
    rating: 5,
  },
  {
    name: "Paulo Ferreira",
    location: "Lisboa, Portugal",
    text: "Mesmo estando em Portugal, me senti extremamente seguro investindo em Porto Belo. O Fernando foi muito técnico, explicou o Masterplan da cidade, o crescimento da região e principalmente os números do investimento. Não foi uma venda, foi uma consultoria.",
    rating: 5,
  },
  {
    name: "Thomas Bradley",
    location: "Orlando, EUA",
    text: "Estava buscando um investimento imobiliário seguro no Brasil, e o Fernando entregou exatamente isso. Números claros, estratégia sólida e acompanhamento constante.",
    rating: 5,
  },
  {
    name: "André Cavalcante",
    location: "Belo Horizonte, Brasil",
    text: "O que me fez fechar negócio foi a transparência. O Fernando mostrou riscos, cenários e projeções reais. Hoje já tenho valorização mesmo antes da entrega do imóvel.",
    rating: 5,
  },
  {
    name: "Marcos Silveira",
    location: "Madrid, Espanha",
    text: "Excelente acompanhamento do início ao fim. O investimento foi muito bem explicado e estruturado. Recomendo a qualquer investidor que queira entrar no mercado brasileiro.",
    rating: 5,
  },
  {
    name: "Lucas Teixeira",
    location: "Buenos Aires, Argentina",
    text: "Estava buscando investir no litoral brasileiro com segurança. Recebi dados concretos sobre valorização, turismo e liquidez. Hoje vejo que entrei no início de um ciclo muito promissor.",
    rating: 5,
  },
  {
    name: "Henrique Brandão",
    location: "Curitiba, Brasil",
    text: "Não comprei apenas um imóvel, comprei estratégia. O timing foi decisivo e o Fernando sabia exatamente quando e onde entrar.",
    rating: 5,
  },
  {
    name: "James O'Brien",
    location: "Toronto, Canadá",
    text: "Investimento de longo prazo feito do jeito certo. Transparente, profissional e estratégico. Raramente vejo esse nível de comprometimento no mercado imobiliário.",
    rating: 5,
  },
  {
    name: "Miguel Fonseca",
    location: "Porto, Portugal",
    text: "Tudo muito claro, técnico e objetivo. Excelente opção para quem quer investir no Brasil com segurança e rentabilidade.",
    rating: 5,
  },
  {
    name: "Gabriel Monteiro",
    location: "Santiago, Chile",
    text: "O diferencial foi a visão de futuro. Entendi exatamente por que Porto Belo está crescendo e por que era o momento certo de investir.",
    rating: 5,
  },
  {
    name: "Rodrigo Barbosa",
    location: "Campinas, Brasil",
    text: "Minha decisão foi mudar de vida. Recebi orientação completa sobre bairros, crescimento e padrão construtivo. Uma escolha muito consciente e bem embasada.",
    rating: 5,
  },
  {
    name: "Camila Andrade",
    location: "Florianópolis, Brasil",
    text: "Segurança, clareza e cuidado em cada detalhe. Me senti tranquila do início ao fim. O Fernando realmente entende o que o investidor precisa.",
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D4AF37">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ name, location, text, rating }) {
  return (
    <div className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 h-[260px]">
      <StarRating count={rating} />
      <p className="text-sm leading-relaxed text-text-2 flex-1 overflow-hidden line-clamp-4">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/[0.07]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 border border-gold/30 flex items-center justify-center text-gold font-semibold text-sm flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink leading-none mb-0.5">{name}</p>
          <p className="text-[11px] text-text-3">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await getGsap();
      ctx = gsap.context(() => {
        gsap.from(".testimonials-head > *", {
          y: 24, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="reveal-section section-alt-b py-[clamp(80px,10vw,140px)] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="testimonials-head text-center mb-14">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
            Depoimentos
          </p>
          <h2
            className="font-display font-semibold leading-[1.12] tracking-tight text-ink mb-4"
            style={{ fontSize: "clamp(32px,4.4vw,52px)" }}
          >
            O que dizem os investidores.
          </h2>
          <p className="text-base leading-relaxed text-text-2 max-w-[600px] mx-auto">
            Resultados reais de quem confiou na consultoria especializada para investir no litoral catarinense.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={i >= 3 && !expanded ? "hidden sm:block" : ""}
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>

        {/* Ver mais / Ver menos — só aparece no mobile */}
        <div className="sm:hidden text-center mt-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold border border-gold/40 rounded-xl px-6 py-3 hover:bg-gold/5 transition-colors"
          >
            {expanded ? "Ver menos" : `Ver mais depoimentos (${TESTIMONIALS.length - 3})`}
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Rating summary */}
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] mt-12">
        <div className="flex flex-wrap items-center justify-center gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-2xl font-bold text-ink">4.9/5</p>
            <p className="text-xs text-text-3 mt-0.5">Avaliação média</p>
          </div>
          <div className="w-px h-12 bg-ink/10 hidden sm:block" />
          <div>
            <p className="text-2xl font-bold text-ink">+120</p>
            <p className="text-xs text-text-3 mt-0.5">Investidores atendidos</p>
          </div>
          <div className="w-px h-12 bg-ink/10 hidden sm:block" />
          <div>
            <p className="text-2xl font-bold text-ink">12</p>
            <p className="text-xs text-text-3 mt-0.5">Países atendidos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
