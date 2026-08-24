import { Account, MailMessage, PromoMessage, NewsletterItem, TrainingItem, AutoRule } from '../types';

export const INITIAL_ACCOUNTS: Account[] = [
  { email: 'lucie.marchand@gmail.com', name: 'Lucie Marchand', initials: 'LM', avatarBg: '#0B57D0', avatarFg: '#FFFFFF', isPrimary: true },
  { email: 'l.marchand@atelier-nord.fr', name: 'Atelier Nord — pro', initials: 'AN', avatarBg: '#5B2FA8', avatarFg: '#FFFFFF' },
  { email: 'contact@lucie-photo.fr', name: 'Lucie Photo', initials: 'LP', avatarBg: '#B3502F', avatarFg: '#FFFFFF' }
];

export const INITIAL_MAILS: MailMessage[] = [
  {
    id: 'm1',
    from: 'Karim Belhadj',
    email: 'karim.belhadj@atelier-nord.fr',
    initials: 'KB',
    time: '09:12',
    full: "Aujourd'hui à 09:12",
    unread: true,
    subject: 'Devis atelier — validation avant vendredi',
    snippet: "Je t'envoie la version corrigée du devis, il ne manque plus que ton accord sur le poste transport.",
    body: [
      "Bonjour Lucie,",
      "Je t'envoie la version corrigée du devis. Il ne manque plus que ton accord sur le poste transport : j'ai retenu l'option en deux livraisons, ce qui nous fait gagner une semaine sur le montage.",
      "Si c'est bon pour toi, je lance la commande vendredi matin.",
      "Karim"
    ]
  },
  {
    id: 'm2',
    from: 'Sophie Renard',
    email: 's.renard@clinique-vauban.fr',
    initials: 'SR',
    time: '08:47',
    full: "Aujourd'hui à 08:47",
    unread: true,
    subject: 'Compte rendu de la réunion de lundi',
    snippet: 'Voici les trois décisions actées lundi, ainsi que les points reportés à la prochaine séance.',
    body: [
      "Bonjour Lucie,",
      "Voici le compte rendu de lundi. Trois décisions ont été actées : le passage du planning en trois créneaux, la reprise du budget formation au 1er septembre, et la nomination d'un référent qualité par service.",
      "Deux points sont reportés : la refonte du livret d'accueil et la question des astreintes d'été. Je propose qu'on les traite en visio la semaine prochaine, plutôt le mardi après-midi.",
      "Dis-moi ce qui t'arrange et je bloque le créneau.",
      "Bien à toi,\nSophie"
    ]
  },
  {
    id: 'm3',
    from: 'Thomas Nguyen',
    email: 'thomas@studio-lisiere.com',
    initials: 'TN',
    time: 'hier',
    full: 'Hier à 18:30',
    unread: false,
    subject: 'Re: photos de la façade',
    snippet: "Les fichiers sont en ligne. J'ai gardé les deux cadrages dont tu parlais, plus un plan large.",
    body: [
      "Salut,",
      "Les fichiers sont en ligne. J'ai gardé les deux cadrages dont tu parlais, plus un plan large qui rend bien en fin de journée.",
      "Dis-moi si tu veux une retouche sur la lumière du hall.",
      "Thomas"
    ]
  },
  {
    id: 'm4',
    from: 'Maman',
    email: 'helene.marchand@orange.fr',
    initials: 'HM',
    time: 'hier',
    full: 'Hier à 12:04',
    unread: false,
    subject: 'Week-end du 22',
    snippet: 'On arrive samedi en début d’après-midi. Ton père veut passer par le marché avant.',
    body: [
      "Ma Lucie,",
      "On arrive samedi en début d'après-midi. Ton père veut passer par le marché avant, donc compte plutôt 15 h.",
      "Tu as besoin qu'on apporte quelque chose ?",
      "Bisous, Maman"
    ]
  },
  {
    id: 'm5',
    from: 'Élodie Fabre',
    email: 'e.fabre@mairie-annecy.fr',
    initials: 'EF',
    time: 'lun.',
    full: 'Lundi à 10:22',
    unread: false,
    subject: 'Dossier de subvention — pièce manquante',
    snippet: 'Il nous manque l’attestation URSSAF de moins de trois mois pour clore le dossier.',
    body: [
      "Madame Marchand,",
      "Il nous manque l'attestation URSSAF de moins de trois mois pour clore votre dossier de subvention.",
      "Vous pouvez la déposer directement en réponse à ce message. Le comité se réunit le 3 septembre.",
      "Cordialement,\nÉlodie Fabre"
    ]
  },
  {
    id: 'm6',
    from: 'Julien Costa',
    email: 'j.costa@freelance.dev',
    initials: 'JC',
    time: 'lun.',
    full: 'Lundi à 08:15',
    unread: false,
    subject: 'Disponibilités septembre',
    snippet: 'Je me libère à partir du 8. Deux jours par semaine me semblent réalistes pour démarrer.',
    body: [
      "Bonjour Lucie,",
      "Je me libère à partir du 8 septembre. Deux jours par semaine me semblent réalistes pour démarrer, avec une montée en charge en octobre si le rythme convient.",
      "Je te propose un point de cadrage le 9 au matin.",
      "Julien"
    ]
  }
];

export const INITIAL_PROMOS: PromoMessage[] = [
  {
    id: 'p1',
    name: 'Offres Tech Flash',
    email: 'promo@offres-tech.fr',
    time: '10:04',
    subject: '-70 % ce week-end seulement, dernières heures',
    snippet: 'Le compte à rebours est lancé sur plus de 400 références, stocks limités.',
    body: [
      "Le compte à rebours est lancé.",
      "Plus de 400 références à -70 % jusqu'à dimanche minuit : casques, écrans, périphériques et accessoires. Les stocks partent vite et ne seront pas réapprovisionnés.",
      "Livraison offerte dès 39 € d'achat."
    ]
  },
  {
    id: 'p2',
    name: 'Maison & Déco',
    email: 'news@maison-deco.fr',
    time: '09:38',
    subject: 'Votre panier vous attend toujours',
    snippet: 'Vous avez laissé trois articles en attente. Ils restent réservés 48 heures.',
    body: [
      "Vous avez laissé trois articles dans votre panier.",
      "Nous les gardons de côté pendant 48 heures : une lampe d'appoint en laiton, un tapis tissé 160 × 230 et deux coussins en lin lavé.",
      "Passé ce délai, ils repartiront en vente libre."
    ]
  },
  {
    id: 'p3',
    name: 'VoyagePlus',
    email: 'deals@voyageplus.com',
    time: 'hier',
    subject: '5 destinations à moins de 99 € au départ de Lyon',
    snippet: 'Séville, Porto, Naples, Cracovie et Édimbourg, aller-retour, cet automne.',
    body: [
      "Cinq villes, cinq tarifs sous la barre des 99 €.",
      "Séville, Porto, Naples, Cracovie et Édimbourg, en aller-retour au départ de Lyon, sur une sélection de dates entre octobre et décembre.",
      "Bagage cabine inclus, modification gratuite jusqu'à sept jours avant le départ."
    ]
  },
  {
    id: 'p4',
    name: 'Sportissimo',
    email: 'club@sportissimo.fr',
    time: 'hier',
    subject: 'Nouvelle collection running : accès prioritaire',
    snippet: 'En tant que membre du club, vous y accédez 24 heures avant tout le monde.',
    body: [
      "La collection automne est en ligne.",
      "En tant que membre du club, vous y accédez 24 heures avant l'ouverture publique : nouvelles semelles amorties, coupe-vent déperlant et la gamme de textiles thermorégulants.",
      "Retours gratuits sous 60 jours."
    ]
  },
  {
    id: 'p5',
    name: 'Banque Néo',
    email: 'offres@banque-neo.fr',
    time: 'lun.',
    subject: 'Parrainez un proche, gagnez 80 €',
    snippet: '40 € pour vous, 40 € pour lui, dès la première carte commandée.',
    body: [
      "Votre prime de parrainage passe à 80 €.",
      "40 € vous sont versés, 40 € pour votre filleul, dès que sa carte est commandée et son premier paiement effectué.",
      "Offre valable jusqu'au 30 septembre, dans la limite de cinq parrainages."
    ]
  },
  {
    id: 'p6',
    name: 'Électro Discount',
    email: 'promos@electro-discount.fr',
    time: 'lun.',
    subject: 'Le lave-linge que vous regardiez est en solde',
    snippet: 'Remise immédiate de 120 € appliquée au panier jusqu’à demain soir.',
    body: [
      "Bonne nouvelle pour votre projet d'équipement.",
      "Le modèle hublot 9 kg que vous aviez consulté passe à 379 € au lieu de 499 €, avec reprise gratuite de votre ancien appareil.",
      "Garantie 5 ans pièces et main d'œuvre incluse."
    ]
  }
];

export const INITIAL_NEWS: NewsletterItem[] = [
  {
    id: 'n1',
    name: 'TLDR AI',
    email: 'dan@tldr.tech',
    initials: 'TL',
    time: '08:00',
    tags: ['#IA', '#Tech'],
    logoBg: '#D3E3FD',
    logoFg: '#0842A0',
    summary: "Meta publie Llama 3.3 en version ouverte, Google intègre un nouveau moteur de recherche multimodale, et l'Union européenne précise les règles de transparence pour les modèles fondateurs."
  },
  {
    id: 'n2',
    name: 'Les Échos Matin',
    email: 'matin@lesechos.fr',
    initials: 'LE',
    time: '07:30',
    tags: ['#Économie'],
    logoBg: '#E9DCFB',
    logoFg: '#5B2FA8',
    summary: "Rebond surprise de la croissance en zone euro au deuxième trimestre, stabilisation des taux de la BCE, et tour de table historique pour une pépite française du stockage d'énergie."
  },
  {
    id: 'n3',
    name: 'Sidebar IO',
    email: 'hello@sidebar.io',
    initials: 'SB',
    time: 'hier',
    tags: ['#Design'],
    logoBg: '#FDE3DC',
    logoFg: '#B3502F',
    summary: 'Cinq ressources design sélectionnées : un guide complet du design tokens 2026, un retour d’expérience sur la refonte de Figma, et un comparatif des frameworks CSS modernes.'
  },
  {
    id: 'n4',
    name: 'Le Fil Climat',
    email: 'fil@climat-news.fr',
    initials: 'FC',
    time: 'hier',
    tags: ['#Climat'],
    logoBg: '#D7EDDC',
    logoFg: '#1C5C39',
    summary: "Bilan de la vague de chaleur d'août, nouveaux seuils d'alerte préfectorale, et un dossier sur le rafraîchissement passif des écoles primaires."
  }
];

export const INITIAL_TRAININGS: TrainingItem[] = [
  {
    id: 'f1',
    org: 'OpenClassrooms',
    logo: 'OC',
    logoBg: '#D3E3FD',
    logoFg: '#0842A0',
    rail: '#0B57D0',
    kind: 'Webinaire',
    dayName: 'jeu.',
    dayNum: '21',
    monthName: 'août',
    soon: true,
    title: 'Webinaire : bien structurer un projet React',
    when: '18 h 00 → 19 h 30',
    automated: false
  },
  {
    id: 'f2',
    org: 'Coursera',
    logo: 'CO',
    logoBg: '#E9DCFB',
    logoFg: '#5B2FA8',
    rail: '#5B2FA8',
    kind: 'Échéance',
    dayName: 'dim.',
    dayNum: '24',
    monthName: 'août',
    soon: true,
    title: 'Devoir 3 à rendre — Data Analysis with Python',
    when: 'avant 23 h 59',
    automated: false
  },
  {
    id: 'f3',
    org: 'Udemy',
    logo: 'UD',
    logoBg: '#FDE3DC',
    logoFg: '#B3502F',
    rail: '#B3502F',
    kind: 'Certificat',
    dayName: 'mar.',
    dayNum: '30',
    monthName: 'sept.',
    title: 'Votre certificat UX Research est prêt à télécharger',
    when: "valable jusqu'au 30 sept.",
    automated: true
  },
  {
    id: 'f4',
    org: 'CNAM',
    logo: 'CN',
    logoBg: '#D7EDDC',
    logoFg: '#1C5C39',
    rail: '#1C5C39',
    kind: 'Inscription',
    dayName: 'ven.',
    dayNum: '05',
    monthName: 'sept.',
    title: 'Inscription aux unités d’enseignement du semestre',
    when: 'clôture à 17 h 00',
    automated: false
  }
];

export const INITIAL_RULES: AutoRule[] = [
  { id: 'rule_01', email: 'promo@offres-tech.fr', nom: 'Offres Tech Flash', cat: 'publicite', action: 'supprimer_toujours', active: true, date: '13/08/2026' },
  { id: 'rule_02', email: 'dan@tldr.tech', nom: 'TLDR AI Digest', cat: 'newsletter', action: 'generer_resume_et_archiver', active: true, date: '12/08/2026' },
  { id: 'rule_03', email: 'notification@openclassrooms.com', nom: 'OpenClassrooms', cat: 'formation', action: 'archiver_automatique', day: 'vendredi', hour: '18:00', active: true, date: '13/08/2026' },
  { id: 'rule_04', email: 'deals@voyageplus.com', nom: 'VoyagePlus', cat: 'publicite', action: 'supprimer_toujours', active: false, date: '09/08/2026' },
  { id: 'rule_05', email: 'matin@lesechos.fr', nom: 'Les Échos Matin', cat: 'newsletter', action: 'generer_resume_et_archiver', active: true, date: '07/08/2026' }
];

export const AI_SUMMARIES_MOCK: Record<string, string[]> = {
  m1: [
    'Karim envoie la version corrigée du devis atelier.',
    'Attente de ton accord sur le poste transport (option deux livraisons retenue).',
    'Commande lancée vendredi matin si validé.'
  ],
  m2: [
    '3 décisions actées en réunion : 3 créneaux de planning, reprise budget formation au 1er sept., référent qualité par service.',
    '2 points reportés : livret d’accueil et astreintes d’été.',
    'Sophie propose une visio mardi après-midi et attend ta confirmation.'
  ],
  m3: [
    'Les photos de façade sont en ligne, avec les deux cadrages demandés et un plan large.',
    'Thomas propose une retouche sur la lumière du hall si besoin.'
  ],
  m4: [
    'Tes parents arrivent samedi vers 15 h, après un passage au marché.',
    'Ta mère demande s’il faut apporter quelque chose.'
  ],
  m5: [
    'La mairie attend une attestation URSSAF de moins de trois mois.',
    'À déposer en réponse à ce message.',
    'Le comité se réunit le 3 septembre.'
  ],
  m6: [
    'Julien est disponible à partir du 8 septembre, deux jours par semaine.',
    'Montée en charge possible en octobre.',
    'Il propose un point de cadrage le 9 au matin.'
  ]
};
