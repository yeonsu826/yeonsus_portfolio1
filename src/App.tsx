import About from './components/About'
import Approach from './components/Approach'
import Contact from './components/Contact'
import Credentials from './components/Credentials'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Skills from './components/Skills'
import VideoLog from './components/VideoLog'
import Works from './components/Works'
import { useReveal } from './hooks/useReveal'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useReveal()

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Skills />
        <Approach />
        <Works />
        <VideoLog />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
