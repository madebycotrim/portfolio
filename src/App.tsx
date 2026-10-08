import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from './lib/gsap';
import { ConcreteGridBg } from './components/ConcreteGridBg/ConcreteGridBg';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ProjectsBento } from './components/ProjectsBento/ProjectsBento';
import { ExperienceTimeline } from './components/ExperienceTimeline/ExperienceTimeline';
import { AboutSkills } from './components/AboutSkills/AboutSkills';
import { Contact } from './components/Contact/Contact';
import { DossierModal } from './components/DossierModal/DossierModal';

export default function App() {
  const [dossieAberto, setDossieAberto] = useState(false);
  useLenis();

  useEffect(() => {
    // Webfonts alteram métricas de texto: recalcula os triggers após o carregamento.
    let ativo = true;
    document.fonts.ready
      .then(() => {
        if (ativo) ScrollTrigger.refresh();
      })
      .catch((erro: unknown) => {
        // Fontes de fallback continuam funcionais; os triggers usam as medidas atuais.
        console.warn('[App] Falha ao aguardar webfonts; ScrollTrigger não recalculado.', erro);
      });
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <>
      <ConcreteGridBg />
      <Header aoAbrirDossie={() => setDossieAberto(true)} />
      <main>
        <Hero />
        <ProjectsBento />
        <ExperienceTimeline />
        <AboutSkills />
      </main>
      <Contact aoAbrirDossie={() => setDossieAberto(true)} />

      <AnimatePresence>
        {dossieAberto && (
          <DossierModal aberto={dossieAberto} aoFechar={() => setDossieAberto(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
