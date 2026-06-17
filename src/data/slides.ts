export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Feature {
  icon: string
  label: string
}

export interface EppItem {
  icon: string
  label: string
}

export interface MuellesItem {
  icon: string
  name: string
}

export interface Cta {
  label: string
  href: string
}

export interface Slide {
  tag: string
  title: string
  titleAccent: string
  titleEnd: string
  text: string
  ctas?: Cta[]
  about?: string
  features?: Feature[]
  timeline?: string[]
  stats?: Stat[]
  services?: string[]
  checklist?: string[]
  eppItems?: EppItem[]
  extincionItems?: string[]
  paisajismoItems?: string[]
  obrasItems?: string[]
  muellesItems?: MuellesItem[]
  actividades?: string[]
}

export const images = [
  'https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?w=1600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1577199001468-44c049e7603f?w=1600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1614127938540-a1139bee1841?w=1600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1628147529780-36964fbb8d54?w=1600&h=1000&fit=crop',
]

export const slides: Slide[] = [
  {
    tag: 'NM Soluciones Integrales',
    title: 'SOLUCIONES EN',
    titleAccent: 'PREVENCIÓN DE RIESGOS',
    titleEnd: 'LABORALES',
    text: 'Asesoría experta, capacitación certificada, venta de equipamiento y servicios de construcción para entornos laborales seguros y productivos.',
    ctas: [
      { label: 'CONOCER MÁS', href: '/about' },
      { label: 'CONTACTAR', href: '/contact' },
    ],
    about:
      'Somos tu socio estratégico en la creación de entornos laborales seguros. Nuestro giro principal es la prevención de riesgos laborales, abarcando desde la asesoría hasta la ejecución de obras.',
  },
  {
    tag: 'Prevención de Riesgos',
    title: 'CAPACITACIÓN Y',
    titleAccent: 'GESTIÓN PREVENTIVA',
    titleEnd: '',
    text: 'Protegemos lo más importante: tu equipo. Con más de 12 años de experiencia en prevención de riesgos laborales, implementamos sistemas de gestión y realizamos visitas técnicas para evaluar y mitigar riesgos.',
    features: [
      { icon: 'bi-shield-check', label: 'Asesoría y Gestión' },
      { icon: 'bi-people-fill', label: 'Venta de Equipamiento' },
      { icon: 'bi-gear-wide-connected', label: 'Servicios y Capacitación' },
    ],
    timeline: ['Contacto', 'Diagnóstico', 'Propuesta', 'Ejecución'],
    checklist: [
      'Capacitación',
      'Consultoría',
      'Inspección técnica',
      'Informes técnicos',
      'Protocolos Minsal',
      'Matriz de riesgos',
      'Procedimientos de trabajo seguro',
      'Política de seguridad y salud en el trabajo',
      'Programa de gestión preventiva',
      'Charlas de 5 minutos',
      'Gestiones con mutualidades',
      'Excepción o rebajas de multas por fiscalización',
    ],
  },
  {
    tag: 'Equipamiento',
    title: 'EPP Y EQUIPOS',
    titleAccent: 'CERTIFICADOS',
    titleEnd: '',
    text: 'Proveemos elementos de protección personal y equipos de extinción certificados para toda industria.',
    stats: [
      { value: 150, suffix: '+', label: 'Proyectos' },
      { value: 5000, suffix: '+', label: 'Capacitados' },
      { value: 12, suffix: '+', label: 'Años Exp.' },
      { value: 100, suffix: '%', label: 'Certificado' },
    ],
    services: [
      'Prevención de Riesgos',
      'Paisajismo y Construcción',
      'Venta de Equipos',
      'Muelles Flotantes',
    ],
    eppItems: [
      { icon: 'bi-hand-index-thumb', label: 'Guantes' },
      { icon: 'bi-person-bounding-box', label: 'Cascos' },
      { icon: 'bi-bootstrap', label: 'Calzado de seguridad' },
      { icon: 'bi-ear', label: 'Protección auditiva' },
      { icon: 'bi-eye', label: 'Protección ocular' },
      { icon: 'bi-lungs', label: 'Protección respiratoria' },
      { icon: 'bi-shield-shaded', label: 'Protección colectiva' },
      { icon: 'bi-ladder', label: 'Protección para trabajos en altura' },
    ],
    extincionItems: ['Extintores y similares'],
  },
  {
    tag: 'Infraestructura',
    title: 'PAISAJISMO, OBRAS',
    titleAccent: 'Y MUELLES FLOTANTES',
    titleEnd: '',
    text: 'Soluciones robustas para entornos exigentes con los más altos estándares de calidad y seguridad.',
    about:
      'Somos tu socio estratégico en la creación de entornos laborales seguros. Desde la asesoría hasta la ejecución de obras, cubrimos cada aspecto de la prevención de riesgos.',
    paisajismoItems: [
      'Recuperación de áreas verdes',
      'Construcción de áreas verdes',
      'Mantención de áreas verdes',
    ],
    obrasItems: [
      'Mejoras y construcciones',
      'Mantención de áreas comunes',
      'Instalaciones eléctricas',
      'Hormigón de radier',
      'Galpones y estructuras metálicas',
    ],
    muellesItems: [
      { icon: 'bi-water', name: 'Ez Dock' },
      { icon: 'bi-box-seam', name: 'Pcm Dock' },
      { icon: 'bi-tools', name: 'Ready Dock' },
    ],
    actividades: [
      'Venta de elementos de protección personal',
      'Asesoría en prevención de riesgos',
      'Visitas técnicas',
      'Capacitación',
      'Implementación de sistema de gestión según DS 44',
      'Armado y desarme de muelle',
      'Construcción y obras menores',
      'Paisajista y mantención de áreas verdes',
      'Venta de equipos de extinción del fuego',
    ],
  },
]
