import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Lock, 
  Briefcase, 
  ChevronDown, 
  ArrowRight,
  Search,
  Award,
  BarChart,
  Calculator,
  Zap,
  Layers,
  Gem,
  Scale,
  Workflow,
  Brain,
  Clock,
  CheckCircle,
  Key,
  HelpCircle,
  Globe
} from 'lucide-react';

// --- CUSTOM HOOKS ---

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal(0.5);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return (
    <span ref={ref} className="font-serif tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Filozofie', href: '#filozofie' },
    { name: 'Služby', href: '#sluzby' },
    { name: 'NACENIT DOMÉNU', href: '#oceneni', icon: <Zap size={14} className="mr-1.5 text-blue-400" /> },
    { name: 'Domény', href: '#domeny' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex justify-between items-center">
        {/* LOGO */}
        <div 
          className="text-xl md:text-2xl font-serif text-white tracking-widest uppercase cursor-pointer group transition-all duration-500 ease-in-out" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <span className="inline-block transition-all duration-500 group-hover:font-black group-hover:tracking-[0.15em]">
            Asseton
          </span>
          <span className="text-blue-500">.</span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex space-x-8 text-sm uppercase tracking-widest text-white/70">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-blue-400 transition-colors flex items-center">
              {link.icon && link.icon}
              {link.name}
            </a>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <a href="#kontakt" className="hidden md:inline-flex items-center justify-center px-4 lg:px-6 py-2 border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 uppercase tracking-wider text-xs font-semibold">
          Konzultace Zdarma
        </a>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-3 bg-[#0a0a0a]/98 backdrop-blur-md border-t border-white/5">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="block py-3 text-sm uppercase tracking-widest text-white/70 hover:text-blue-400 transition-colors border-b border-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center">
                {link.icon && link.icon}
                {link.name}
              </span>
            </a>
          ))}
          <a 
            href="#kontakt" 
            className="block text-center py-3 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 uppercase tracking-wider text-xs font-semibold mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Konzultace Zdarma
          </a>
        </div>
      </div>
    </nav>
  );
};

const FadeInSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ValuationForm = () => {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleValuationSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mjgplbdq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          domain: domain,
          email: email,
          _subject: `Požadavek na ocenění domény: ${domain}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setDomain('');
        setEmail('');
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 md:p-8 lg:p-12 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Calculator size={80} className="text-blue-500 md:w-[120px] md:h-[120px]" />
      </div>
      
      <form onSubmit={handleValuationSubmit} className="relative z-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-blue-400 font-semibold">Název domény *</label>
            <input 
              type="text" 
              name="domain"
              required
              placeholder="např. reality.cz"
              className="w-full bg-black/40 border border-white/10 text-white px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-blue-400 font-semibold">Váš e-mail *</label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="vás@email.cz"
              className="w-full bg-black/40 border border-white/10 text-white px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={!domain || !email || status === 'submitting'}
          className={`w-full py-4 md:py-5 font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-3
            ${(!domain || !email || status === 'submitting') 
              ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5' 
              : 'bg-blue-600 text-white hover:bg-blue-500 border border-blue-600'}`}
        >
          <Zap size={18} />
          <span className="text-xs md:text-sm">
            {status === 'submitting' ? 'Odesílám...' : 'Zjistit tržní cenu zdarma'}
          </span>
        </button>

        {status === 'success' && (
          <div className="bg-blue-500/10 border border-blue-500/50 text-blue-400 px-4 py-3 text-center text-sm">
            ✅ Požadavek odeslán! Ozveme se vám do 48 hodin.
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 text-center text-sm">
            ❌ Chyba při odesílání. Zkuste to prosím znovu nebo nás kontaktujte přímo na asseton.invest@outlook.com
          </div>
        )}
        
        <p className="text-center text-[10px] text-white/30 uppercase tracking-widest">
          Analýza probíhá manuálně s využitím tržních dat Namebio a interních benchmarků.
        </p>
      </form>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    intent: 'buy',
    name: '',
    email: '',
    domain: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const intentLabels = {
      buy: "Zájem o anonymní akvizici",
      sell_end: "Prodej domény (Koncový zákazník)",
      sell_portfolio: "Nabídka odkupu do portfolia"
    };

    try {
      const response = await fetch('https://formspree.io/f/xaqlvwgw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          intent: intentLabels[formData.intent],
          name: formData.name,
          email: formData.email,
          domain: formData.domain || 'Nespecifikováno',
          message: formData.message,
          _subject: `${intentLabels[formData.intent]} - ${formData.name}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          intent: 'buy',
          name: '',
          email: '',
          domain: '',
          message: ''
        });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 mb-16 text-left max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold uppercase tracking-widest text-black/80">Váš záměr</label>
        <select 
          required
          className="w-full bg-black/5 border border-black/20 text-black px-4 py-3 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-colors"
          value={formData.intent}
          onChange={(e) => setFormData({...formData, intent: e.target.value})}
          disabled={status === 'submitting'}
        >
          <option value="buy">Chci anonymně zajistit a koupit prémiovou doménu</option>
          <option value="sell_end">Chci prodat svou doménu koncovému zákazníkovi (nejvyšší marže)</option>
          <option value="sell_portfolio">Chci prodat svou doménu přímo do portfolia ASSETON (nejrychlejší výplata)</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-widest text-black/80">Jméno / Společnost</label>
          <input 
            type="text" 
            required
            className="w-full bg-black/5 border border-black/20 text-black px-4 py-3 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-colors placeholder:text-black/40"
            placeholder="Jan Novák"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            disabled={status === 'submitting'}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-widest text-black/80">E-mail</label>
          <input 
            type="email" 
            required
            className="w-full bg-black/5 border border-black/20 text-black px-4 py-3 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-colors placeholder:text-black/40"
            placeholder="jan@firma.cz"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            disabled={status === 'submitting'}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold uppercase tracking-widest text-black/80">Zájmová / Nabízená Doména (volitelné)</label>
        <input 
          type="text" 
          className="w-full bg-black/5 border border-black/20 text-black px-4 py-3 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-colors placeholder:text-black/40"
          placeholder="např. reality.cz"
          value={formData.domain}
          onChange={(e) => setFormData({...formData, domain: e.target.value})}
          disabled={status === 'submitting'}
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold uppercase tracking-widest text-black/80">Zpráva</label>
        <textarea 
          required 
          rows="4"
          className="w-full bg-black/5 border border-black/20 text-black px-4 py-3 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-colors placeholder:text-black/40 resize-none"
          placeholder="Dobrý den, chci s vámi probrat..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          disabled={status === 'submitting'}
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full px-8 py-4 md:py-5 bg-blue-600 text-white font-semibold uppercase tracking-widest hover:bg-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Odesílám...' : 'Odeslat nezávaznou poptávku'}
      </button>

      {status === 'success' && (
        <div className="bg-blue-500/10 border border-blue-500/50 text-blue-700 px-4 py-3 text-center text-sm font-medium font-serif italic">
          ✅ Poptávka odeslána! Ozveme se vám do 24 hodin.
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 text-center text-sm font-medium">
          ❌ Chyba při odesílání. Kontaktujte nás prosím přímo: asseton.invest@outlook.com
        </div>
      )}
    </form>
  );
};

// --- MAIN APP ---
export default function App() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "Co pro vás může ASSETON udělat?",
      a: "V ASSETON fungujeme jako Váš strategický partner a vyjednavač ve světě digitálních aktiv. Naše role zahrnuje:\n\n• Vyhledávání koncových zákazníků: Pro klienty, kteří chtějí prodat svou doménu, aktivně vyhledáváme relevantní kupce z naší sítě, abychom dosáhli co nejvyšší marže při zachování plné anonymity prodejce.\n• Vlastní portfolio & výkup: Neustále vykupujeme zajímavé prémiové domény do vlastního investičního portfolia a zároveň nabízíme k přímému prodeji domény, které již vlastníme.\n• Anonymní akvizici: Pokud máte zájem o doménu, kterou již někdo vlastní, zajistíme, aby vaše identita zůstala skryta, čímž předcházíme umělému navýšení ceny.\n• Expertní vyjednávání: Díky znalosti trhu a cenových benchmarků dokážeme pro nákup i prodej vyjednat ty nejlepší možné podmínky."
    },
    {
      q: "Proč investovat do prémiové .cz domény?",
      a: "Prémiová doména definující kategorii vám dává okamžitou autoritu, monopol na klíčové slovo v mysli zákazníka a drasticky snižuje dlouhodobé náklady na marketing. Je to digitální realita s nejvyšší možnou likviditou na lokálním trhu."
    },
    {
      q: "Je ASSETON diskrétním brokerem doménových jmen?",
      a: "Naprostá důvěrnost je základním kamenem našich služeb. Veškeré konzultace i samotné obchodní případy podléhají přísnému utajení. Vaše identita zůstává pro protistranu skryta po celou dobu vyjednávání. Pro maximální právní jistotu uzavíráme s klienty dohody o mlčenlivosti (NDA)."
    },
    {
      q: "Jak probíhá transakce a jak je zajištěna bezpečnost peněz?",
      a: "Náš proces eliminuje veškerá rizika pro obě strany. Pro CZK transakce využíváme Advokátní úschovu u renomované kanceláře na speciálním chráněném účtu. Pro mezinárodní obchody v USD/EUR využíváme globální standard Escrow.com. Po složení prostředků a smluvním zajištění dojde k transferu domény (předání AUTH-ID) a po ověření převodu jsou finance bezpečně vyplaceny prodávajícímu."
    }
  ];

  const portfolioDomains = [
    { name: "sos.cz", type: "ULTRA PREMIUM", category: "Krizové služby & Bezpečnost", price: "Na dotaz", accent: "rgba(59, 130, 246, 0.15)" },
    { name: "kralzdravi.cz", type: "PREMIUM", category: "Zdraví & E-commerce", price: "450 000 Kč", accent: "rgba(255, 255, 255, 0.05)" },
    { name: "nejkupony.cz", type: "HIGH TRAFFIC", category: "Slevy & Affiliate", price: "350 000 Kč", accent: "rgba(59, 130, 246, 0.1)" },
    { name: "autavyhodne.cz", type: "PREMIUM", category: "Automotive & Prodej", price: "280 000 Kč", accent: "rgba(255, 255, 255, 0.05)" },
    { name: "svetlasky.cz", type: "BRAND", category: "Lifestyle & Seznamka", price: "180 000 Kč", accent: "rgba(255, 105, 180, 0.05)" },
    { name: "geoplany.cz", type: "NICHE", category: "Geodézie & Reality", price: "150 000 Kč", accent: "rgba(34, 197, 94, 0.05)" },
    { name: "armysvet.cz", type: "BRAND", category: "Outdoor & Military", price: "120 000 Kč", accent: "rgba(255, 255, 255, 0.05)" },
    { name: "jirexo.cz", type: "BRANDABLE", category: "Univerzální Corporate", price: "45 000 Kč", accent: "rgba(59, 130, 246, 0.05)" },
    { name: "elobey.cz", type: "BRANDABLE", category: "Univerzální Corporate", price: "45 000 Kč", accent: "rgba(59, 130, 246, 0.05)" },
  ];

  return (
    <div className="min-h-screen bg-[#06080a] text-white/90 selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-blue-600 opacity-[0.06] rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeInSection delay={100}>
            <div className="inline-flex items-center space-x-2 border border-blue-500/20 rounded-full px-3 md:px-4 py-1.5 mb-6 md:mb-8 bg-blue-500/5 backdrop-blur-sm">
              <Globe className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-blue-200/80">#1 Broker Prémiových .cz Domén</span>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={300}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-tight mb-6 md:mb-8 text-white">
              Domény jako <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 italic font-medium tracking-tight">digitální realita.</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={500}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
              Neexistuje druhá šance na první dojem. Získejte absolutní monopol ve svém oboru a ovládněte digitální prostor dříve než vaše konkurence.
            </p>
          </FadeInSection>

          <FadeInSection delay={700}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <a href="#kontakt" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-blue-600 text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300 flex items-center justify-center group shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500">
                KOUPIT DOMÉNU
              </a>
              <a href="#kontakt" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border-2 border-slate-700 text-slate-300 font-bold uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-400">
                PRODAT DOMÉNU
              </a>
            </div>
          </FadeInSection>
        </div>
      </header>

      {/* STATS */}
      <div className="border-y border-white/5 bg-blue-900/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 text-center">
            {[
              { label: "Diskrétnost", value: 100, suffix: "%", icon: <Lock className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-2 text-blue-400" /> },
              { label: "Monitoring Trhu", value: 24, suffix: "/7", icon: <Clock className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-2 text-blue-400" /> },
              { label: "Rychlost Ocenění", value: 48, suffix: "h", icon: <Zap className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-2 text-blue-400" /> },
              { label: "Průměrná Úspora", value: 35, suffix: "%", icon: <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mx-auto mb-2 text-blue-400" /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                {stat.icon}
                <div className="text-3xl md:text-4xl lg:text-5xl text-white mb-2 font-serif">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILOZOFIE */}
      <section id="filozofie" className="py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeInSection>
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mb-6" />
              <h2 className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-6 font-semibold">Filozofie</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-8 text-white">
                Kdo vlastní doménu,<br />vlastní celou kategorii.
              </h3>
              <div className="space-y-6 text-base md:text-lg text-slate-400 font-light leading-relaxed">
                <p>
                  Doména již dávno není pouhá technická adresa. Je to nejvzácnější digitální nemovitost v moderní ekonomice. Na nejlukrativnější adrese může stát pouze jeden obchod. 
                </p>
                <p>
                  Většina společností pálí miliony v marketingových rozpočtech, aby se asociovaly s klíčovým slovem. Majitel prémiové domény to slovo rovnou vlastní. Definuje trh, určuje pravidla a získává okamžitou důvěru klienta.
                </p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={200} className="relative h-full min-h-[300px] md:min-h-[400px] border border-blue-500/10 bg-[#0d1117] p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-[0_0_50px_rgba(59,130,246,0.05)]">
               <Shield className="w-12 h-12 md:w-16 md:h-16 text-blue-500 mb-8 opacity-80" />
               <h4 className="text-xl md:text-2xl font-serif mb-4 text-white">Ochrana Brandu & Monopol</h4>
               <p className="text-slate-400 font-light italic">Zajišťujeme domény pro lídry na trhu. Chráníme je před konkurencí a budujeme nedobytné digitální pevnosti.</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* SLUŽBY */}
      <section id="sluzby" className="py-16 md:py-24 lg:py-32 bg-[#090c10] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <FadeInSection className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <Gem className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mx-auto mb-6" />
            <h2 className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-6 font-semibold">Expertíza</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-white">Exkluzivní Služby</h3>
            <p className="text-slate-400 font-light text-base md:text-lg">Poskytujeme kompletní servis od úvodní analýzy přes anonymní vyjednávání až po bezpečný převod a escow.</p>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Search className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />,
                title: "Stealth Akvizice",
                desc: "Diskrétní nákup obsazených a zdánlivě neprodejných domén. Vystupujeme jako broker, chráníme vaši identitu a minimalizujeme výkupní cenu."
              },
              {
                icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />,
                title: "Prodej Portfolií",
                desc: "Zastupování majitelů premium domén. Vyhledáváme strategické kupce napříč trhem a maximalizujeme návratnost vaší investice při exitu."
              },
              {
                icon: <BarChart className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />,
                title: "Ocenění & Strategie",
                desc: "Přesné nacenění doménových aktiv pro účely fúzí, akvizic (M&A) nebo auditů. Tvorba dlouhodobé doménové strategie pro korporace."
              }
            ].map((service, idx) => (
              <FadeInSection key={idx} delay={idx * 150}>
                <div className="group h-full bg-[#0d1117] border border-white/5 p-8 md:p-10 hover:border-blue-500/30 transition-all duration-500">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 origin-left text-blue-500">{service.icon}</div>
                  <h4 className="text-lg md:text-xl font-serif mb-4 text-white group-hover:text-blue-400 transition-colors">{service.title}</h4>
                  <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base group-hover:text-slate-400 transition-colors">{service.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* NACENĚNÍ DOMÉNY */}
      <section id="oceneni" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeInSection>
              <Scale className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mb-6" />
              <h2 className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-6 font-semibold">Expertní ocenění</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 text-white">Zjistěte reálnou tržní hodnotu vaší domény</h3>
              <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed mb-8">
                Nacenění domény je klíčovým krokem pro prodejce i kupce. Automatické generátory často selhávají, protože nezohledňují lokální trh (.cz), aktuální trendy v AI nebo historická data z privátních prodejů.
              </p>
            </FadeInSection>

            <FadeInSection delay={200}>
              <ValuationForm />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* PORTFOLIO DOMÉN - SLIDER */}
      <section id="domeny" className="py-16 md:py-24 lg:py-32 bg-[#090c10] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-16 text-center">
          <FadeInSection>
            <Layers className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mx-auto mb-6" />
            <h2 className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-6 font-semibold">Portfolio</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-white">Aktuálně dostupné prémiové domény</h3>
          </FadeInSection>
        </div>

        <div className="relative">
          <div className="animate-marquee py-4">
            {[...portfolioDomains, ...portfolioDomains].map((domain, idx) => (
              <div 
                key={idx}
                className="bg-[#0d1117] border border-white/5 hover:border-blue-500/40 transition-all duration-500 flex flex-col w-[280px] sm:w-[320px] md:w-[350px] mx-3 md:mx-4 p-6 md:p-8 rounded-sm relative overflow-hidden shrink-0 group shadow-lg"
                style={{ boxShadow: `inset 0 0 30px ${domain.accent}` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-blue-500"></div>
                <div className="mb-4">
                  <span className={`text-[9px] font-semibold uppercase tracking-widest px-2 py-1 border rounded-full ${domain.type === 'ULTRA PREMIUM' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-white/10 text-white/50 bg-white/5'}`}>
                    {domain.type}
                  </span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-1 tracking-wide group-hover:text-blue-400 transition-colors">{domain.name}</h4>
                <p className="text-slate-500 text-xs font-light mb-6 uppercase tracking-wider">{domain.category}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cena</div>
                    <div className="text-lg md:text-xl font-serif font-semibold text-white">{domain.price}</div>
                  </div>
                  <a 
                    href={`mailto:asseton.invest@outlook.com?subject=Zájem o doménu ${domain.name}`} 
                    className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors flex items-center"
                  >
                    PROJEVIT ZÁJEM <ArrowRight size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#090c10] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#090c10] to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <FadeInSection className="text-center mb-12 md:mb-16">
             <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mx-auto mb-6" />
             <h2 className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-4 font-semibold">FAQ</h2>
             <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white">Často kladené otázky</h3>
          </FadeInSection>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FadeInSection key={idx} delay={idx * 100}>
                <div className="border border-white/5 bg-[#0d1117] transition-all hover:border-blue-500/20">
                  <button 
                    className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex justify-between items-center focus:outline-none"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span className="font-serif text-base md:text-lg pr-8 text-slate-200">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform duration-300 flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`px-6 md:px-8 overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === idx ? 'max-h-[800px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-slate-400 font-light leading-relaxed whitespace-pre-line text-sm md:text-base italic">{faq.a}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / KONTAKT */}
      <section id="kontakt" className="py-16 md:py-24 lg:py-32 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <FadeInSection>
            <Briefcase className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-8 text-white" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-8 text-white">Připraveni ovládnout trh?</h2>
            <p className="text-blue-100 text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto opacity-90">
              Zastupujeme pouze seriózní kupce a prodávající. Pokud chápete hodnotu prémiové domény, spojte se s námi.
            </p>
            
            <ContactForm />
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:asseton.invest@outlook.com" className="px-8 md:px-10 py-4 md:py-5 bg-white text-blue-700 font-bold uppercase tracking-widest hover:bg-[#06080a] hover:text-white transition-colors duration-300 text-xs md:text-sm shadow-xl">
                asseton.invest@outlook.com
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#06080a] py-8 md:py-12 border-t border-white/5 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif text-lg md:text-xl text-white tracking-widest uppercase">
            Asseton<span className="text-blue-500">.</span>
          </div>
          <div className="text-xs md:text-sm font-medium">
            &copy; {new Date().getFullYear()} ASSETON. Všechna práva vyhrazena. Profesionální Brokerage Služby.
          </div>
          <div className="flex space-x-6 uppercase tracking-widest text-xs font-bold">
            <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-400 transition-colors">X / Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}