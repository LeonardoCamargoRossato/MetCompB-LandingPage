export type ContentItem = {
  slug: string
  title: string
  directory: string
  description: string
  topics: string[]
  methods: string[]
  icon: 'histogram' | 'book' | 'check' | 'network' | 'sigma' | 'target' | 'spring' | 'dice' | 'wave'
  githubUrl: string
  accent: string
}

const base = 'https://github.com/LeonardoCamargoRossato/MetCompB/tree/main/'

export const contents: ContentItem[] = [
  { slug:'binomial-poisson', title:'Distribuições Binomial × Poisson', directory:'Distribuicao_Binomial_x_Poisson', description:'Estudo comparativo de distribuições discretas, experimentos de Bernoulli e aproximações probabilísticas.', topics:['Binomial','Poisson','Bernoulli','Probabilidade'], methods:['Python','Jupyter','Distribuições'], icon:'histogram', githubUrl:base+'Distribuicao_Binomial_x_Poisson', accent:'λ, n, p' },
  { slug:'exam1-review', title:'Revisão da Prova 1', directory:'Exam1-Review-MetCompB', description:'Material consolidado de revisão dos métodos e problemas centrais da primeira avaliação.', topics:['Revisão','EDOs','Integração'], methods:['Jupyter','Python'], icon:'book', githubUrl:base+'Exam1-Review-MetCompB', accent:'P1' },
  { slug:'exam1-solutions', title:'Soluções / Material da Prova 1', directory:'Exam1-Solutions', description:'Coleção de apoio às soluções, explicações e materiais ligados à primeira prova.', topics:['Prova 1','Soluções','Exercícios'], methods:['Documentação','Vídeo'], icon:'check', githubUrl:base+'Exam1-Solutions', accent:'✓' },
  { slug:'epidemics', title:'Modelando Epidemias — SIR, SIRS e SEIR', directory:'Modelando_Epidemias__Modelos_SIR_SIRS_e_SEIR', description:'Modelos compartimentais, taxas de transição e simulação temporal de epidemias.', topics:['SIR','SIRS','SEIR','Compartimentos'], methods:['EDOs','Python','Simulação'], icon:'network', githubUrl:base+'Modelando_Epidemias__Modelos_SIR_SIRS_e_SEIR', accent:'S→I→R' },
  { slug:'exam1-resolution', title:'Resolução Prova 1', directory:'Resolucao_Prova1', description:'Resolução computacional da primeira avaliação, com foco em equações diferenciais e métodos numéricos.', topics:['Prova 1','EDOs','Sistemas'], methods:['Jupyter','Python'], icon:'sigma', githubUrl:base+'Resolucao_Prova1', accent:'dy/dt' },
  { slug:'exam2-resolution', title:'Resolução Prova 2', directory:'Resolucao_Prova2', description:'Resolução computacional da segunda avaliação com tópicos probabilísticos, aleatórios e numéricos.', topics:['Prova 2','Probabilidade','Simulação'], methods:['Jupyter','Python'], icon:'check', githubUrl:base+'Resolucao_Prova2', accent:'P2' },
  { slug:'projectile', title:'Trabalho 1 — Lançamento de Projétil', directory:'Resolucao_Trabalho1__LancamentoProjetil', description:'Modelagem do movimento, integração numérica e trajetória de um projétil pelo Método de Euler.', topics:['Projétil','Movimento','Trajetória'], methods:['Euler','EDOs','Python'], icon:'target', githubUrl:base+'Resolucao_Trabalho1__LancamentoProjetil', accent:'y(x)' },
  { slug:'mass-spring', title:'Trabalho 2 — Sistema Massa-Mola', directory:'Resolucao_Trabalho2__SistemaMassaMola', description:'Oscilador harmônico e comparação entre Euler, Leap-Frog, Verlet, RK2 e RK4.', topics:['Oscilador','Massa-mola','Erro numérico'], methods:['Euler','Verlet','RK2','RK4'], icon:'spring', githubUrl:base+'Resolucao_Trabalho2__SistemaMassaMola', accent:'x¨+ω²x=0' },
  { slug:'random-simulation', title:'Trabalho 3 — Aleatórios, Jogos e Gás', directory:'Resolucao_Trabalho3__NumAleatorios_+_Jogos_+_SimulacaoGas', description:'Números pseudoaleatórios, Monte Carlo, processos estocásticos e simulação computacional de gás.', topics:['Aleatórios','Monte Carlo','Jogos','Gás'], methods:['Simulação','Python','Estocástica'], icon:'dice', githubUrl:base+'Resolucao_Trabalho3__NumAleatorios_%2B_Jogos_%2B_SimulacaoGas', accent:'rand()' },
  { slug:'ode-review', title:'Revisão Prova 1 — Resolvendo EDOs', directory:'Revisão_Prova1__ResolvendoEDOs', description:'Resolução numérica de EDOs, redução de ordem, sistemas e aplicações em Física.', topics:['EDOs','Redução de ordem','Sistemas'], methods:['Integração','Python','Jupyter'], icon:'wave', githubUrl:base+'Revis%C3%A3o_Prova1__ResolvendoEDOs', accent:'∫ f(t)dt' },
]
