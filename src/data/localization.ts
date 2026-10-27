import type { ContentItem } from './contents'
import type { Video } from './videos'
import type { Language } from '../context/Preferences'

type TextPair = { title: string; description: string; summary?: string }

const contentEn: Record<string, TextPair> = {
  'binomial-poisson': { title: 'Binomial × Poisson Distributions', description: 'Comparative study of discrete distributions, Bernoulli experiments and probabilistic approximations.' },
  'exam1-review': { title: 'Exam 1 Review', description: 'Consolidated review material covering the central methods and problems from the first exam.' },
  'exam1-solutions': { title: 'Exam 1 Solutions / Supporting Material', description: 'Supporting solutions, explanations and study materials related to the first exam.' },
  epidemics: { title: 'Epidemic Modeling — SIR, SIRS and SEIR', description: 'Compartment models, transition rates and time-based epidemic simulation.' },
  'exam1-resolution': { title: 'Exam 1 Resolution', description: 'Computational resolution of the first exam, focused on differential equations and numerical methods.' },
  'exam2-resolution': { title: 'Exam 2 Resolution', description: 'Computational resolution of the second exam with probability, random numbers and numerical simulation.' },
  projectile: { title: 'Assignment 1 — Projectile Motion', description: 'Motion modeling, numerical integration and projectile trajectory using the Euler method.' },
  'mass-spring': { title: 'Assignment 2 — Mass-Spring System', description: 'Harmonic oscillator and comparison between Euler, Leap-Frog, Verlet, RK2 and RK4.' },
  'random-simulation': { title: 'Assignment 3 — Random Numbers, Games and Gas', description: 'Pseudo-random numbers, Monte Carlo methods, stochastic processes and computational gas simulation.' },
  'ode-review': { title: 'Exam 1 Review — Solving ODEs', description: 'Numerical solution of ODEs, order reduction, systems and applications in Physics.' },
}

const videoEn: Record<string, TextPair> = {
  J9d1iPYj3KU: { title: 'Assignment 2 Resolution — Comparing Verlet, RK2 and RK4 Errors in the Mass-Spring System', summary: 'Comparison of numerical integration methods applied to the mass-spring oscillator.', description: 'Explores precision, stability and numerical error by comparing integration methods in the mass-spring system.' },
  '-KPa8fjyLnA': { title: 'Assignment 3 Resolution — Random Numbers, Games and Gas Simulation', summary: 'Applications of random numbers in estimates, games and computational simulations.', description: 'From randomness in stochastic processes to computational simulations of particles and gas.' },
  '0zPrdzjYgbQ': { title: 'Exam 2 Resolution — Inverse-Function Distributions and Random Decay', summary: 'Sampling, inverse-function transformation and random processes.', description: 'Distribution generation techniques and decay simulations based on random numbers.' },
  ecDjRUxfV3o: { title: 'Exam 1 Resolution — Higher-Order Differential Equations', summary: 'Computational solution of higher-order differential equations.', description: 'Transforms higher-order problems into systems that can be solved numerically.' },
  sLxfgroZiWM: { title: 'Numerically Solving Higher-Order Differential Equations in Python', summary: 'Building and solving ODE systems in Python.', description: 'Practical implementation of order reduction and numerical integration methods with Python.' },
  '1U0hKaoTxnQ': { title: '1D Mass-Spring System — Euler, Leap-Frog and Runge-Kutta', summary: 'Modeling harmonic motion and comparing integration methods.', description: 'From the physical model to numerical curves produced by Euler, Leap-Frog and Runge-Kutta.' },
  q9bhqxM14JI: { title: 'Epidemic Modeling — SIR, SIRS and SEIR Models', summary: 'Introduction and implementation of compartmental epidemic models.', description: 'Mathematical and computational structure of SIR, SIRS and SEIR models over time.' },
  'SC4d-72oTys': { title: 'Interactive Charts with Plotly and Widgets in Python', summary: 'Interactive visualizations for exploring model results and parameters.', description: 'Uses Plotly and widgets to turn numerical results into interactive visual exploration.' },
  'IWg9q-F6WUk': { title: 'Projectile Motion Using the Euler Method — Assignment 1', summary: 'Numerical modeling of a projectile trajectory using Euler integration.', description: 'Motion formulation and step-by-step construction of the numerical trajectory solution.' },
}

export const videoContentMap: Record<string, string[]> = {
  J9d1iPYj3KU: ['mass-spring'],
  '-KPa8fjyLnA': ['random-simulation'],
  '0zPrdzjYgbQ': ['exam2-resolution'],
  ecDjRUxfV3o: ['exam1-resolution', 'exam1-solutions'],
  sLxfgroZiWM: ['ode-review', 'exam1-review'],
  '1U0hKaoTxnQ': ['mass-spring'],
  q9bhqxM14JI: ['epidemics'],
  'SC4d-72oTys': ['random-simulation'],
  'IWg9q-F6WUk': ['projectile'],
}

export function contentVideoIds(slug: string) {
  return Object.entries(videoContentMap).filter(([, slugs]) => slugs.includes(slug)).map(([id]) => id)
}

export function contentText(item: ContentItem, language: Language) {
  if (language === 'pt') return { title: item.title, description: item.description }
  return contentEn[item.slug] ?? { title: item.title, description: item.description }
}

export function videoText(video: Video, language: Language) {
  if (language === 'pt') return { title: video.title, description: video.description, summary: video.summary }
  return videoEn[video.id] ?? { title: video.title, description: video.description, summary: video.summary }
}
