import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Spain guide, built the same way as
 * dk-sources.ts / at-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = the Ministerio de Inclusión, Seguridad
 * Social y Migraciones' own Migraciones portal (inclusion.gob.es — the
 * authority behind the student long-stay authorisation, work access and
 * the post-study job-seeking authorisation) and the Ministerio de Asuntos
 * Exteriores, Unión Europea y Cooperación's own exteriores.gob.es (visa
 * application at a consulate, the Embassy of Spain in Bangladesh); medium
 * = AECID's own aecid.es/aecid.gob.es (scholarships) and university
 * admissions/fee pages. Spain is an EU/Schengen member, so this guide is
 * built from Spain's own national rules (which still apply fully to
 * Bangladeshi, non-EU/EEA applicants) — nothing is borrowed from another
 * EU country's guide (Denmark's, Austria's, Hungary's, Switzerland's, the
 * Netherlands', Ireland's, France's, Slovenia's, the Czech Republic's or
 * Lithuania's). Spain's 2023 "Ley de Startups" reforms and the new
 * Reglamento de Extranjería (Real Decreto 1155/2024) significantly
 * liberalised work rights and post-study options for international
 * students; this guide reads the CURRENT, post-reform rules directly from
 * inclusion.gob.es, not older pre-2023 figures that still circulate on
 * secondary sites.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const ES_READ = '2026-10-18';

// Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones (inclusion.gob.es)
export const ES_MIGRACIONES_ESTANCIA = gov('Migraciones (Ministerio de Inclusión) – Hoja 1: Autorización de estancia de larga duración para estudios superiores', 'https://www.inclusion.gob.es/web/migraciones/w/estancia-por-estudios');
export const ES_MIGRACIONES_EMPLEO = gov('Migraciones (Ministerio de Inclusión) – Hoja 4 bis: Acceso al empleo de titulares de autorización de estancia por estudios', 'https://www.inclusion.gob.es/web/migraciones/w/hoja-4-bis-acceso-al-empleo-de-las-personas-titulares-de-una-autorizacion-de-estancia-de-larga-duracion-por-estudios-movilidad-de-alumnos-servicios-de-voluntariado-o-actividades-formativas');
export const ES_MIGRACIONES_MODIFICACIONES = gov('Migraciones (Ministerio de Inclusión) – Hoja 58: Modificaciones desde autorizaciones de estancia por estudios (incl. búsqueda de empleo)', 'https://www.inclusion.gob.es/web/migraciones/w/58.-modificaciones-desde-autorizaciones-de-estancia-por-estudios-superiores-ensenanza-secundaria-actividades-formativas-o-formacion-sanitaria-especializada');
export const ES_MIGRACIONES_IPREM = gov('Embajada/Consulado de España (exteriores.gob.es) – Tabla oficial del IPREM', 'https://www.exteriores.gob.es/Consulados/losangeles/en/ServiciosConsulares/Documents/IPREM.pdf');

// Ministerio de Asuntos Exteriores, Unión Europea y Cooperación (exteriores.gob.es)
export const ES_EXTERIORES_VISADO_ESTUDIOS = gov('Exteriores.gob.es – Study visa', 'https://www.exteriores.gob.es/Consulados/losangeles/en/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx');
export const ES_EMBAJADA_DHAKA = gov('Embassy of Spain in Bangladesh (Dhaka) – Location and contact', 'https://www.exteriores.gob.es/Embajadas/dhaka/en/Paginas/index.aspx');

// AECID — Agencia Española de Cooperación Internacional para el Desarrollo
export const ES_AECID_BECAS_LATAM_AFRICA_ASIA = sch('AECID – Becas para ciudadanos de países de América Latina, África y Asia (Convocatoria 2026/2027)', 'https://www.aecid.es/becas-para-ciudadanos-de-paises-de-america-latina-africa-y-asia');
export const ES_AECID_BECAS_LECTORADOS = sch('AECID – Becas y Lectorados (overview page)', 'https://www.aecid.es/becas-lectorados');

// Universidad Complutense de Madrid (ucm.es)
export const ES_UCM_FEES = uni('UCM – Tuition fees / Precios públicos', 'https://www.ucm.es/informacion/tuition-fees-precios-publicos');
export const ES_UCM_APPLICATION = uni('UCM – The Application (international students)', 'https://www.ucm.es/english/the-application');

// Universitat de Barcelona (ub.edu)
export const ES_UB_PREUS = uni('Universitat de Barcelona – Preu de la matrícula', 'https://www.ub.edu/acad/matricula/preus.html');
export const ES_UB_INTERNATIONAL = uni('University of Barcelona – International students', 'https://web.ub.edu/en/web/estudiants/international-students');

// Universitat Autònoma de Barcelona (uab.cat)
export const ES_UAB_PRICES = uni('UAB – Prices (university master’s degrees)', 'https://www.uab.cat/sites/ContentServer/studies/graduate/university-master-s-degrees/prices-1345666814947.html');
export const ES_UAB_ADMISSION = uni('UAB – Admission process (master’s degrees)', 'https://www.uab.cat/sites/ContentServer/studies/graduate/master-s-degrees-and-graduate-diplomas-continuing-education-/admission-process-1345674013054.html');

// Universidad Autónoma de Madrid (uam.es)
export const ES_UAM_PRECIOS = uni('UAM – Precios públicos (grado)', 'https://www.uam.es/uam/estudios/precios-publicos');
export const ES_UAM_STUDY_ABROAD = uni('UAM – Study abroad at UAM', 'https://www.uam.es/uam/en/studyabroad');

// IE University (ie.edu)
export const ES_IEU_ADMISSION_PROCESS = uni('IE University – Admission Process', 'https://www.ie.edu/university/admission/admission-process/');
export const ES_IEU_ENTRY_REQUIREMENTS = uni('IE University – Entry Requirements', 'https://www.ie.edu/university/admission/access-to-university/');
export const ES_IEU_BIR_FEES = uni('IE University – Bachelor in International Relations: Admissions & Fees', 'https://www.ie.edu/university/studies/academic-programs/bachelor-international-relations/admissions-fees/');
export const ES_IEU_MIR_FEES = uni('IE University – Master in International Relations: Admissions and Fees', 'https://www.ie.edu/school-politics-economics-global-affairs/programs/master-in-international-relations/admissions-and-fees/');

// QS World University Rankings 2027 (topuniversities.com)
export const ES_UCM_QS = uni('QS World University Rankings 2027 – Complutense University of Madrid (topuniversities.com)', 'https://www.topuniversities.com/universities/complutense-university-madrid');
export const ES_UB_QS = uni('QS World University Rankings 2027 – Universitat de Barcelona (topuniversities.com)', 'https://www.topuniversities.com/universities/university-of-barcelona');
export const ES_UAB_QS = uni('QS World University Rankings 2027 – Universitat Autònoma de Barcelona (topuniversities.com)', 'https://www.topuniversities.com/universities/universitat-autonoma-de-barcelona');
export const ES_UAM_QS = uni('QS World University Rankings 2027 – Universidad Autónoma de Madrid (topuniversities.com)', 'https://www.topuniversities.com/universities/universidad-autonoma-de-madrid');
export const ES_IEU_QS = uni('QS World University Rankings 2027 – IE University (topuniversities.com)', 'https://www.topuniversities.com/universities/ie-university');
